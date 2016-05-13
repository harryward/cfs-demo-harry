Template.mobileMenu.helpers({
    'currUser':function(){
        console.log("user:", Meteor.user());
        return Meteor.user();
    },
});

Template.mobileMenu.events({
});

Template.mobileMenu.onCreated(function () {
    Deps.autorun(function () {
        Meteor.subscribe('cats')
    })
});

Template.mobileMenu.onRendered(function () {
    $('.mobile_menu_btn').sideNav({
            menuWidth: 300, // Default is 240
            edge: 'left', // Choose the horizontal origin
            closeOnClick: false // Closes side-nav on <a> clicks, useful for Angular/Meteor
        }
    );
    //$(".collapsible-header").dropdown();
    $('.mobile_menu_btn').sideNav('show');
});

Template.mobileMenu.onDestroyed(function () {
    //add your statement here
});

