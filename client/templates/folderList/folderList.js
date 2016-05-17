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
    },
    'folderList':function(){
        //return Template.instance().folderList.get();
        return Session.get('folderList');
    },
    'pagination': function() {
        return Session.get('pagination');
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
    'click .actions' : function(event, template){
        event.preventDefault();
        var id = this._source.ticketId;
        var d = Session.get('mobileContextData');
        if ( d ) {
            //console.log('click .showfiles this', EJSON.stringify(this) );
            //console.log('click .showfiles classname', classname);
            //$('.options').addClass('hide');
            //$(classname).removeClass('hide');
            Session.set('mobileContextData', this);
            //Session.set('mobileContextTpl', 'folderActions');
            //Session.set('showMobileContext', true);
            //$('.modal-trigger').openModal();
            $('#folderActions').openModal();
        } else {
            var classname = ".files-" + this._source.ticketId;
            //console.log('click .showfiles this', EJSON.stringify(this) );
            console.log('click .showfiles classname', classname);
            //$('.options').addClass('hide');
            //$(classname).removeClass('hide');
            Session.set('mobileContextData', this);
            //Session.set('mobileContextTpl', 'folderActions');
            //Session.set('showMobileContext', true);
            //$('.modal-trigger').openModal();
            $('#folderActions').openModal();
        }
    },
    'click .editFolder': function (event, template) {
        event.preventDefault();
        var d = Session.get('mobileContextData');
        //console.log('editFolder', d._source.ticketId);
        //$('.modal-trigger').closeModal();
        Session.set('mobileContextData', false);
        $('#folderActions').closeModal();
        FlowRouter.go('/edit/folder/'+d._source.ticketId);
    },
    'click .viewFolder': function (event, template) {
        event.preventDefault();
        var d = Session.get('mobileContextData');
        //console.log('editFolder', d._source.ticketId);
        //$('.modal-trigger').closeModal();
        $('#folderActions').closeModal();
        Session.set('mobileContextData', false);
        FlowRouter.go('/folder/'+d._source.ticketId);
    },
    'click .list-cancel' : function(event, template){
        //var tagname = event.target.className;
        var classname = ".files-"+this._source.ticketId;
        //console.log('click .list-cancel this', EJSON.stringify(this) );
        //console.log('click .list-cancel tagname', tagname );
        Session.set('mobileContextData', false);
        $(classname).addClass('hide');

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
    'click .paginationd li': function (event, template) {
        event.preventDefault();
        var pagNum = $(event.target).text();

        Session.set('skip', pagNum * 10)
        Session.set('page', pagNum)
        $('.folderList-container').scrollTop(0)
    },
});

Template.folderList.onCreated(function () {
    var self = this;
    Deps.autorun(function(){

        Meteor.subscribe('folderSearch') //this populates the folder search data
        //Meteor.subscribe('folders')
/*      ///cool example with a callback ///http://dweldon.silvrback.com/common-mistakes
        Meteor.subscribe('posts', function() {
            console.log(Posts.find().count());
        });
        */
    })
    Session.set('mobileContextData', false)
});

Template.folderList.onRendered(function () {
    $('.modal-trigger').leanModal();

    //Session.set('folderList', false);
    /*
    Meteor.call('totalFolders',function(err,resp){
        Session.set('totalFolders',resp)
    })
    */
    /*
    var page_args = {total_item_ct:22, page_item_limit:RESULTS_PAGE_LIMIT, requested_page_num:1};
    Meteor.call('makePagination', page_args, function(err,resp){
        Session.set('totalFolders',resp)
    })
    */
});

Template.folderList.onDestroyed(function () {
    //delete Session.keys['searchQuery'];
    //delete Session.keys['searchField'];
    //add your statement here
});

