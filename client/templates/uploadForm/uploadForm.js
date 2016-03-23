Template.uploadForm.helpers({
    'files':function(){
        return Session.get('files')
    },
    'thisFile':function(){
        return Docs.findOne(this.toString())
    }
});

Template.uploadForm.events({
    'change .myFileInput': function(event, template) {
        var files = event.target.files
        for (var i = 0, ln = files.length; i < ln; i++) {
            if(files.length){
                var newFile = new FS.File(files[i]);
                newFile.metadata = {foo:"bar"}
                Docs.insert(newFile, function (err, fileObj) {
                    console.log('fileObj',fileObj);
                    var fileArray = Session.get('files') || [];
                    fileArray.push(fileObj._id)
                    $(event.target).val('');
                    Session.set('files',fileArray)
                    Session.set('docId',fileObj._id);
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
        ticketObj.files = Session.get('files');
        console.log('ticket object',ticketObj);
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
                    Session.set('files',false)

                }else{
                    console.error('error creating ticket',err)
                }
            })
        }
    }
});

Template.uploadForm.onCreated(function () {
    //add your statement here
});

Template.uploadForm.onRendered(function () {
    //add your statement here
});

Template.uploadForm.onDestroyed(function () {
    //add your statement here
});

