Template.mobileMenu.helpers({
    'currUser':function(){
        console.log("user:", Meteor.user());
        return Meteor.user();
    },
    'categories':function(){
        return Categories.find({},{sort:{'name':1}}).fetch();
    },
});

Template.mobileMenu.events({
    'click .homeQuery':function(event,template){
        event.preventDefault();
        //Categories.update({}, {$set: {liclass: ""}});
        //Categories.update(this._id, {$set: {liclass: "active"}});
        $('.homeQuery').parent('li').removeClass('active')
        $(event.target).parent('li').addClass('active')
        //this.liclass = "active";
        console.log('click li.categories ul ul a', JSON.stringify(this));
        //Session.set('searchQuery', $(event.target).attr('data-q') );
        folderFind( $(event.target).attr('data-q'), $(event.target).attr('data-f'), 1);
        FlowRouter.go('/');
    }
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

