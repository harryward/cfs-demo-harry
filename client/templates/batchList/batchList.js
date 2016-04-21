Template.batchList.helpers({
    'showFiles':function(){
        return Session.get('showFiles')
    },
    'tickets': function () {
        //var sort = (Session.get('searchQuery') && Session.get('searchQuery') != "") ?
        //{} : {'sort':{'date': -1}};
        return Tickets.find({}, {'sort':{'date': -1}}).fetch();
    },
    'rounder':function(theNum){
        return numeral(theNum).format('00.00')
    },
    'user':function(){
        var userData = Meteor.users.findOne(this.user);
        if(userData){
        return userData
        }else{
            return false
        }
    },
    'thisFile':function(){
        return Docs.findOne(this.toString())
    },
    'extension':function(){
        return Docs.findOne(this.toString()).getExtension()
    },
    'theFileLink': function () {
        if (Docs.findOne(this.toString())) {
            return Docs.findOne(this.toString()).url()
        }
    },
    'theFileMeta': function () {
        if (Docs.findOne(this.toString())) {
            return Docs.findOne(this.toString())
        }
    },
    'advancedResults':function(){
        // MIKE TO MAKE THE ENTIRE QUERY BE A SESSION VARIABLE
      return Tickets.find({},{
                'sort': {
                    'date': -1
                }}
        ).fetch()
    },
    'date': function () {
        return moment(this.date).fromNow();
    },
    'formatDate': function(date) {
        return moment(date).format("MMM D YYYY");
    },
    'searchQuery': function () {
        if(Session.get('searchQuery') && Session.get('searchQuery') != ""){
            return Session.get('searchQuery')
        }else{
            return false
        }
    },
    'rawFilter': function(){
        return EJSON.stringify( Session.get('docSearchQuery'), {'indent':true } );
    },
    'rawTickets': function(){
        return EJSON.stringify(
            Tickets.find({}).fetch(), {'indent':true } );
    },
    'elasticResults':function(){
        return Session.get('elasticResp')
    },
    'thisBatch':function(){
        //console.log(this._source.ticketId)
        return Tickets.findOne({'_id':this._source.ticketId});
        //return this._source.ticketId
    },
    'rawElastic':function(){
        return EJSON.stringify(
            Session.get('elasticResp'), {'indent':true } );
    },
    'rawProjection': function(){
        return EJSON.stringify( Session.get('queryArgs'), {'indent':true } );
    },
    'rawForm': function(){
        return EJSON.stringify( Session.get('formBuilderObj'), {'indent':true } );
    },
    'isLast': function () {
        if (this._id === Session.get('lastTicket')) {
            return true
        }
    }
});

Template.batchList.events({
    'click .fileTypeFilter':function(event,template){
        _.each(Tickets.find().fetch(),function(e){
            _.each(e.files,function(file){
                Meteor.subscribe('singleDoc', file);
            })
        });
        Session.set('showFiles', !Session.get('showFiles') );
    },
    'click .editMe': function (event, template) {
        // event.preventDefault();
        // alert('make this button go to a route that lets you edit the files, title and summary')
    },

    'click .removeMe': function (event, template) {
        event.preventDefault();
        if (confirm('are you sure? this cannot be reversed')) {
            Tickets.remove(this._id)
        }
    },
    'click .pagination li': function (event, template) {
        event.preventDefault();
        var pagNum = $(event.target).text();

        Session.set('skip', pagNum * 10)
        Session.set('page', pagNum)
        $('.batchList-container').scrollTop(0)
    },

});

function stripHTML(string){
    s = string.replace(/(<([^>]+)>)/ig, '');
    return s;
}
Template.registerHelper('stripHTML', stripHTML)

Template.batchList.onCreated(function () {
    //add your statement here
    Session.set('showFiles');
});

Template.batchList.onRendered(function () {
    //add your statement here
});

Template.batchList.onDestroyed(function () {
    //add your statement here
    //Session.set('showFiles' ,{});
    //Session.set('queryArgs' ,{});
    delete Session.keys['showFiles']
    delete Session.keys['queryArgs']
    //
});

