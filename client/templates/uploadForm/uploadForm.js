Template.uploadForm.helpers({

});

Template.uploadForm.events({
    'change .myFileInput': function(event, template) {
        var files = event.target.files;
        for (var i = 0, ln = files.length; i < ln; i++) {
            Images.insert(files[i], function (err, fileObj) {
                console.log('fileObj',fileObj);
                Session.set('docId',fileObj._id)
                // Inserted new doc with ID fileObj._id, and kicked off the data upload using HTTP
            });
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
        ticketObj.files = [Session.get('docId')]
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
                    Session.set('lastTicket',resp)

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

