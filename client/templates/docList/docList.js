Template.docList.helpers({

});

Template.docList.events({

});


Template.docList.onCreated(function () {
    Session.set('elasticResp', false);
    var aArgs = {};
    aArgs[ Session.get('searchField') ] = Session.get('searchQuery');
    Meteor.call('ticketQuery', aArgs, function (err, resp) {
        Session.set('elasticResp', resp);
        console.log(resp)
    });

});

Template.docList.onRendered(function () {
    Session.set('elasticResp', false);
});

Template.docList.onDestroyed(function () {
    //add your statement here
});

