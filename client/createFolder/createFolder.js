Template.createFolder.helpers({
    //add you helpers here
});

Template.createFolder.events({
    'click #uploadClick':function(event,template){
        event.preventDefault();
        FlowRouter.go('/upload')
    }
});

Template.createFolder.onCreated(function () {
    //add your statement here
});

Template.createFolder.onRendered(function () {
    //add your statement here
});

Template.createFolder.onDestroyed(function () {
    //add your statement here
});

