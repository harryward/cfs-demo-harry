Template.batchLanding.helpers({
    "tickets": function () {
        if(Tickets.find(Session.get('params').ticketId).count()){
        return Tickets.find(Session.get('params').ticketId).fetch()
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
        return Docs.findOne(this.toString()).getExtension()
    },
    'date':function(){
        return moment(this.date).format('MM/DD/YYYY hh:mm a')
    },
    'editing': function () {
        return Session.get('editing')
    },
    'raw': function () {
        return EJSON.stringify(this, {'indent': true})
    },
});


Template.batchLanding.events({
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

        Meteor.call('updateTicket', Session.get('params').ticketId, formObj, function (err, resp) { // server/ticketMethods.js
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

Template.batchLanding.onCreated(function () {
    Meteor.subscribe('singleTicket', Session.get('params').ticketId)
    Tracker.autorun(function () {
        if (Tickets.find({'_id': Session.get('params').ticketId}).count()) {
            _.each(Tickets.findOne({'_id': Session.get('params').ticketId}).files, function (filer) {
                Meteor.subscribe('singleDoc', filer)
            })
        }
    })
});

Template.batchLanding.onRendered(function () {
    //add your statement here
});

Template.batchLanding.onDestroyed(function () {
    //add your statement here
});

