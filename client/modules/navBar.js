Template.navBar.helpers({
    'autoComp': function () {
        return autoComplete.find({}, {$sort: {'term': 1}}).fetch()
    },
    'searchQuery':function(){
        return Session.get('searchQuery')
    },
    'currUser':function(){
        console.log("user:", Meteor.user());
        return Meteor.user();
    },
    'showCreateFolder':function(){
        return  Session.get('showCreateFolder') || true;
    }
});

Template.navBar.events({
    'click .settingsBtnProxy':function (event, template) {
        $('.mobile_menu_btn').sideNav('hide');
        $('.settings_menu_btn').sideNav('show');
    },
    'click .mobileBtnProxy':function (event, template) {
        $('.settings_menu_btn').sideNav('hide');
        $('.mobile_menu_btn').sideNav('show');
    },
    'click #createFolder':function(event, template){
        event.preventDefault();
        Session.set('showCreateFolder', false)
        FlowRouter.go('/upload');
    }
});

Template.navBar.onCreated(function () {
    Session.set('skip', parseInt('0'));
    Session.set('page', parseInt('1'));
    Session.set('autoSendSearch',false);
    Session.set('keyUpSearch',false);
    Deps.autorun(function () {
        Meteor.subscribe('aComplete', Session.get('aQuery'))
    })
});

Template.navBar.onRendered(function () {
    //add your statement here
});

Template.navBar.onDestroyed(function () {
    //add your statement here
});

