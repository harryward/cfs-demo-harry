Template.folderList.helpers({
    'showFiles':function(){
        return Session.get('showFiles')
    },
    'folders': function () {
        //var sort = (Session.get('searchQuery') && Session.get('searchQuery') != "") ?
        //{} : {'sort':{'date': -1}};
        return Folders.find({}, {'sort':{'date': -1}}).fetch();
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
        return Folders.find({},{
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
        return EJSON.stringify( Session.get('folderSearchQuery'), {'indent':true } );
    },
    'rawFolders': function(){
        return EJSON.stringify(
            Folders.find({}).fetch(), {'indent':true } );
    },
    'elasticResults':function(){
        return Session.get('elasticResp')
    },
    'thisFolder':function(){
        //console.log(this._source.ticketId)
        return Folders.findOne({'_id':this._source.ticketId});
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

Template.folderList.events({
    'click .fileTypeFilter':function(event,template){
        _.each(Folders.find().fetch(),function(e){
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
            Folders.remove(this._id)
        }
    },
    'click .pagination li': function (event, template) {
        event.preventDefault();
        var pagNum = $(event.target).text();

        Session.set('skip', pagNum * 10)
        Session.set('page', pagNum)
        $('.folderList-container').scrollTop(0)
    },
});


Template.folderList.onCreated(function () {
    Session.set('showFiles');///????
    Session.set('elasticResp', false);
    var aArgs = {};
    aArgs[ Session.get('searchField') ] = Session.get('searchQuery');
    Meteor.call('ticketQuery', aArgs, function (err, resp) {
        Session.set('elasticResp', resp);
        console.log(resp)
    });

});

function stripHTML(string){
    if (string) {
        s = string.replace(/(<([^>]+)>)/ig, '');
        return s;
    }
    return string;
}
Template.registerHelper('stripHTML', stripHTML)

Template.folderList.onRendered(function () {
    Session.set('elasticResp', false);
});

Template.folderList.onDestroyed(function () {
    //delete Session.keys['searchQuery'];
    //delete Session.keys['searchField'];
    //add your statement here
});

