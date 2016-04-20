Template.navBar.helpers({
    //add you helpers here
});

Template.navBar.events({
    'click .logOut':function(event,template){
        event.preventDefault();
        Meteor.logout();
    },
    'click #uploadClick':function(event,template){
        event.preventDefault();
        FlowRouter.go('/upload')
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

