Template.docList.helpers({
    'batches': function () {
        //var sort = (Session.get('searchQuery') && Session.get('searchQuery') != "") ?
        //{} : {'sort':{'date': -1}};
        return Tickets.find({}, {'sort':{'date': -1}}).fetch();
    },

});

Template.docList.events({

});


Template.docList.onCreated(function () {


});

Template.docList.onRendered(function () {
    //add your statement here
});

Template.docList.onDestroyed(function () {
    //add your statement here
});

