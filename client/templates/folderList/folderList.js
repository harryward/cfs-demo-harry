Template.folderList.helpers({
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
    'stripHTML':function (string){
        if (string) {
            s = string.replace(/(<([^>]+)>)/ig, '');
            return s;
        }
        return string;
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
    'folderList':function(){
        return Session.get('folderList');
    },
    'thisFolder':function(){
        //console.log(this._source.ticketId)
        return Folders.findOne({'_id':this._source.ticketId});
        //return this._source.ticketId
    },
    'rawfolderList':function(){
        return EJSON.stringify(
            Session.get('folderList'), {'indent':true } );
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
/*    'click .fileTypeFilter':function(event,template){
        _.each(Folders.find().fetch(),function(e){
            _.each(e.files,function(file){
                Meteor.subscribe('singleDoc', file);
            })
        });
        Session.set('showFiles', !Session.get('showFiles') );
    }, */
    'click .showfiles' : function(event, template){
        var classname = ".files-"+this._source.ticketId;
        console.log('click .showfiles this', EJSON.stringify(this) );
        console.log('click .showfiles classname', classname );
        $('.options').addClass('hide');
        $(classname).removeClass('hide');

    },
    'keyup #q':function(ev,template){
        //console.log("keyup.which: "+ev.which);
        //after a space has been typed, send a query every other keystroke
        if (ev.which > 31 && ev.which < 123) {
            if (Session.get('autoSendSearch') && Session.get('keyUpSearch')) {
                submitSearch($('#q').val());
                Session.set('keyUpSearch', false);
            } else if (ev.which === 32) {
                Session.set('autoSendSearch', true);
                Session.set('keyUpSearch', false);
            } else if (Session.get('autoSendSearch')) {
                Session.set('keyUpSearch', true);
            }
        }
    },
    'click .list-cancel' : function(event, template){
        //var tagname = event.target.className;
        var classname = ".files-"+this._source.ticketId;
        //console.log('click .list-cancel this', EJSON.stringify(this) );
        //console.log('click .list-cancel tagname', tagname );
        $(classname).addClass('hide');

    },
    'click .editFolder': function (event, template) {
        // event.preventDefault();
        console.log('make this button go to a route that lets you edit the files, title and summary');
        FlowRouter.go('/edit/folder/'+this._id);
    },
    'click .searchItem':function(event,template){
        //event.preventDefault();
        Session.set('folderList',false);
        Session.set('searchQuery',false);
        Session.set('searchField',false);
        console.log('click .searchItem');
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
    Deps.autorun(function(){
        Meteor.subscribe('folderSearch') //this is default home page load or empty folder search
    })
    Deps.autorun(function(){
        Meteor.subscribe('folders') //this is default home page load or empty folder search
    })

});

Template.folderList.onRendered(function () {
    //Session.set('folderList', false);
});

Template.folderList.onDestroyed(function () {
    //delete Session.keys['searchQuery'];
    //delete Session.keys['searchField'];
    //add your statement here
});

