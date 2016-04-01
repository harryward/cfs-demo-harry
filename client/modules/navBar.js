Template.navBar.helpers({
    //add you helpers here
});

Template.navBar.events({
    'click .logOut':function(event,template){
        event.preventDefault();
        Meteor.logout();
    }
});

Template.navBar.onCreated(function () {
    //add your statement here
});

Template.navBar.onRendered(function () {
    //add your statement here
});

Template.navBar.onDestroyed(function () {
    //add your statement here
});

