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
    }
});


Template.navBar.events({
    'click #search-icon': function(event,template){
        event.preventDefault();
        $('#q').focus().select();
    },
    'click .navigate':function(event,template){
        //if there are active search terms, clear all params
        console.log('click .navigate');
        clearSearchParams();
    },
    'click #uploadClick':function(event,template){
        event.preventDefault();
        clearSearchParams();
        FlowRouter.go('/upload');
    },
    'click .logOut':function(event,template){
        event.preventDefault();
        clearSearchParams();
        Meteor.logout();
    },
    'click #sidebar-close':function(event){
        event.preventDefault();
        $('.sideBarNav').sideNav('hide');
    },
    'click .settings':function(event){
        event.preventDefault();
        clearSearchParams();
        FlowRouter.go('/settings')
    },
    'click .homeQuery':function(event,template){
        event.preventDefault();
        console.log('click .homeQuery');
        Session.set('searchQuery', $(event.target).attr('data-q') );
        Session.set('searchField', $(event.target).attr('data-f') );
        FlowRouter.go('/');
    },
    'submit .folderSearch': function (event, template) {
        event.preventDefault();
        console.log('submit .folderSearch');
        Session.set('searchQuery', $('#q').val() );
        Session.set('searchField',false);
        FlowRouter.go('/search');
    }
});

var clearSearchParams = function(){
    console.log('clearSearchParams');
    Session.set('folderList',false);
    Session.set('searchQuery',false);
    Session.set('searchField',false);
}

Template.navBar.onCreated(function () {

    //SIDEBAR
    setTimeout(function(){
        $('.sideBarToggle').sideNav({
                menuWidth: 300, // Default is 240
                edge: 'left', // Choose the horizontal origin
                closeOnClick: false // Closes side-nav on <a> clicks, useful for Angular/Meteor
            }
        );

        $(".collapsible-header").dropdown();

        console.log('sidebar initiated');

        $('.sideBarToggle').sideNav('show');
    },100)

    Session.set('skip', parseInt('0'));
    Session.set('page', parseInt('1'));
    Session.set('autoSendSearch',false);
    Session.set('keyUpSearch',false);
    Deps.autorun(function(){
        Meteor.subscribe('folderSearch',Session.get('folderSearchQuery'),Session.get('queryArgs'))
    })
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

