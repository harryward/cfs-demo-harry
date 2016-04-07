Template.uploadForm.helpers({
    'files':function(){
        return Session.get('files')
    },
    'thisFile':function(){
        return Docs.findOne(this.toString())
    },
    'uploadProg':function(){
        return Docs.findOne(this.toString()).uploadProgress()
    },
    'isDone':function(){
        return Docs.findOne(this.toString()).isUploaded()
    },
    'categories':function(){
        return [{'n':'Calls'},{'n':'Case Study'},{'n':'Documentation'},{'n':'Marketing'},{'n':'Sales Material'},{'n':'Training'}];
    }

});
// test d

Template.uploadForm.events({
    'click .popFile':function(event,template){
        var self = this.toString();
        var fileArray = [];
        if(Session.get('files').length > 1){
            _.each(Session.get('files'),function(fileId){
                if(fileId === self){

                }else{
                    fileArray.push(fileId);
                    Session.set('files',fileArray || [])
                }
            })
        }else{
            Session.set('files',[])
        }
    },
    'click .uploadButton':function(event,template){
        $('.myFileInput').click();
    },
    'change .myFileInput': function(event, template) {
        var files = event.target.files
        for (var i = 0, ln = files.length; i < ln; i++) {
            if(files.length){
                var newFile = new FS.File(files[i]);
                newFile.metadata = {foo:"bar"}
                Docs.insert(newFile, function (err, fileObj) {
                    console.log('fileObj',fileObj);
                    var fileArray = Session.get('files') || [];
                    var fileTypeArray = Session.get('fileTypes') || [];
                    fileArray.push(fileObj._id);
                    fileTypeArray.push( fileObj.getExtension().toLocaleLowerCase() );
                    Session.set('fileTypes',fileTypeArray);

                    queryArrayObj.update({'_id':Meteor.user()._id},{
                        $addToSet:{
                            'queryTags':fileObj.getExtension()
                        }
                    })

                    $(event.target).val('');
                    Session.set('files',fileArray);

                    Session.set('docId',fileObj._id);
                    Meteor.subscribe('singleDoc',fileObj._id);
                    // Inserted new doc with ID fileObj._id, and kicked off the data upload using HTTP
                });

            }
        }
    },
    'click .addSummary':function(event,template){
        event.preventDefault();
        var self = this;
        var thisDoc = Docs.findOne(this.toString())
        var theSummary = prompt('File Summary...',thisDoc.metadata.summary || '');
        if(theSummary){
            Docs.update({'_id':self.toString()},{
                $set:{
                    'metadata.summary':theSummary
                }})
        }
    },
    'click .addTitle':function(event,template){
        event.preventDefault();
        var self = this;
        var thisDoc = Docs.findOne(this.toString())
        var theTitle = prompt('File Title...',thisDoc.metadata.title || '');
        if(theTitle){
        Docs.update({'_id':self.toString()},{
            $set:{
            'metadata.title':theTitle
        }})
        }
    },
    'submit .ticketCreator':function(event,template){
        event.preventDefault();
        ticketObj = {};
        formObj = $(event.target).serializeArray();
        _.each(formObj,function(e,i){
            if(e.name){
                ticketObj[e.name] = e.value;
            }
        });
        ticketObj.date = new Date();
        ticketObj.summary = $('.summernote').val();
        ticketObj.files = Session.get('files');
        ticketObj.fileTypes = Session.get('fileTypes');
        ticketObj.tagString = ticketObj.tags;
        ticketObj.tags = ticketObj.tags.split(',');
        console.log('ticket object',ticketObj);
        ticketObj.user = Meteor.user()._id;
        ticketObj.userObj = Meteor.user();

        ticketObj.tags.push( Meteor.user().profile.name );
        ticketObj.tags.push( ticketObj.date.getFullYear() );
        ticketObj.tags.push( ticketObj.category );
        ticketObj.tags = Template.instance().cleanTags( ticketObj.tags );

        ///ADD THE TAGS TO QUERYARRAY
        _.each(ticketObj.tags,function(e){
            queryArrayObj.update({'_id':Meteor.user()._id},{
                $addToSet:{
                    'queryTags':e
                }
            })
        })

        ticketObj.queryTags = queryArrayObj.findOne().queryTags


        if(!Session.get('docId')) {
            alert('you must attach a file!')
            return false
        }else{
            Meteor.call('insertTicket',ticketObj,function(err,resp){
                if(!err){
                    console.log('new ticket created',resp);
                    alert('success!');
                    $('input,textarea').val('');
                    Session.set('lastTicket',resp);
                    Session.set('docId',false);
                    Session.set('files',false);
                    Session.set('fileArray',false);
                    //Session.set('searchQuery',ticketObj.title)
                    FlowRouter.go('/files');
                }else{
                    console.error('error creating ticket',err)
                }
            })
        }
    }
});

Template.uploadForm.onCreated(function () {
    queryArrayObj.insert({'_id':Meteor.user()._id});
    this.cleanTags = function(arr){ //clean whitespace, duplicates, force lowercase
        if (typeof arr !== 'undefined' && arr.length > 0) {
            var new_arr = [];
            _.each(arr, function (str) {
                var s = str.trim().toLocaleLowerCase();
                if (new_arr.indexOf(s) === -1 && s !== '')
                    new_arr.push(s);
            });
            return new_arr;
        }else{
            return arr;
        }
    }
});

Template.uploadForm.onRendered(function () {
    $('.summernote').summernote();
});

Template.uploadForm.onDestroyed(function () {
    //add your statement here
});

