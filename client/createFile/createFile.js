Template.createFile.helpers({
    //add you helpers here
});

Template.createFile.events({
    'click #uploadClick':function(event,template){
        event.preventDefault();
        FlowRouter.go('/upload')
    }
});

Template.createFile.onCreated(function () {
    //add your statement here
});

Template.createFile.onRendered(function () {
    //add your statement here
});

Template.createFile.onDestroyed(function () {
    //add your statement here
});

