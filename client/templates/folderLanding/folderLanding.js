Template.folderLanding.helpers({
    "folders": function () {
        if(Folders.find(Session.get('params').ticketId).count()){
        return Folders.find(Session.get('params').ticketId).fetch()
        }
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
    'extension':function(){
        var d = Docs.findOne(this.toString() );
        if ( d ) return d.getExtension();
        return '';
    },
    'date':function(){
        return moment(this.date).format('MM/DD/YYYY hh:mm a')
    },
    'editing': function () {
        return Session.get('editing')
    },
    'raw': function () {
        return EJSON.stringify(this, {'indent': true})
    }
});


Template.folderLanding.events({
    'click .editMe': function (event, template) {
        event.preventDefault();
        if (!Session.get('editing')) {
            Session.set('editing', true)
        } else {
            Session.set('editing', false)
        }
    },
    'submit .editForm': function (event, template) {
        event.preventDefault();
        var formObj = {};

        _.each(template.findAll('.form-control'), function (e, i) {
            formObj[e.name] = e.value
        })

        formObj.lastEdited = new Date();

        console.log('updated form Obj', formObj);

        Meteor.call('updateFolder', Session.get('params').ticketId, formObj, function (err, resp) { // server/folderMethods.js
            if (!err) {
                alert('saved');
            } else {
                alert('errors, check the console')
                console.error(err)
            }
        })

    },
    'click .downloadAll':function(event,template){
       //Meteor.call('makeZip',Docs.findOne().url(),function(err,resp){
       //    console.log('response',resp)
       //})
    },
});

Template.folderLanding.onCreated(function () {
    Meteor.subscribe('singleFolder', Session.get('params').ticketId)
    Tracker.autorun(function () {
        if (Folders.find({'_id': Session.get('params').ticketId}).count()) {
            _.each(Folders.findOne({'_id': Session.get('params').ticketId}).files, function (filer) {
                Meteor.subscribe('singleDoc', filer)
            })
        }
    })
});

Template.folderLanding.onRendered(function () {
    //add your statement here
});

Template.folderLanding.onDestroyed(function () {
    //add your statement here
});

