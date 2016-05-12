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
    'categories':function(){
        return Categories.find({},{sort:{'name':1}}).fetch();
    },
    'showCreateFolder':function(){
        return true;
    }
});


Template.navBar.events({
});

Template.navBar.onCreated(function () {

    //SIDEBAR
    setTimeout(function(){

        $('.button-collapse').sideNav({
                menuWidth: 300, // Default is 240
                edge: 'right', // Choose the horizontal origin
                closeOnClick: true // Closes side-nav on <a> clicks, useful for Angular/Meteor
            }
        );
        //$('.button-collapse').sideNav('show');

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
    Deps.autorun(function () {
        Meteor.subscribe('aComplete', Session.get('aQuery'))
    })
    Deps.autorun(function () {
        Meteor.subscribe('cats')
    })
});




Template.navBar.onRendered(function () {
    //add your statement here
});

Template.navBar.onDestroyed(function () {
    //add your statement here
});

