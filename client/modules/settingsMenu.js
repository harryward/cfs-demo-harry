Template.settingsMenu.helpers({
});

Template.settingsMenu.events({
});

Template.settingsMenu.onCreated(function () {
    //add your statement here
});

Template.settingsMenu.onRendered(function () {
    $('.settings_menu_btn').sideNav({
            menuWidth: 300, // Default is 240
            edge: 'right', // Choose the horizontal origin
            closeOnClick: true // Closes side-nav on <a> clicks, useful for Angular/Meteor
        }
    );
    //$('.button-collapse').sideNav('show');
});

Template.settingsMenu.onDestroyed(function () {
    //add your statement here
});

