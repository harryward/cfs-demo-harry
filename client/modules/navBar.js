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
    'click #search-icon': function(event,template){
        event.preventDefault();
        $('#q').focus().select();
    },
    'click #uploadClick':function(event,template){ ///TODO: remove this
        event.preventDefault();
        clearSearchParams();
        FlowRouter.go('/upload');
    },
    'click .logOut':function(event,template){///TODO: remove this or add back the logout link
        event.preventDefault();
        clearSearchParams();
        Meteor.logout();
    },
    'click #sidebar-close':function(event){
        event.preventDefault();
        $('.sideBarNav').sideNav('hide');
    },
    'click .navigate':function(event){
        event.preventDefault(); //navigating away from search results clears search params
        console.log('click .navigate', event.target.className );
        clearSearchParams();
        var href = $(event.target).attr('href');
        FlowRouter.go(href);
    },
    'click .homeQuery':function(event,template){
        event.preventDefault();
        console.log('click .homeQuery');
        //Session.set('searchQuery', $(event.target).attr('data-q') );
        folderFind( $(event.target).attr('data-q'), $(event.target).attr('data-f') );
        FlowRouter.go('/');
    },
    'submit .folderSearch': function (event, template) {
        event.preventDefault();
        console.log('submit .folderSearch');
        //Session.set('searchQuery', $('#q').val() );
        //Session.set('searchField',false);
        folderFind( $('#q').val(), false);
        FlowRouter.go('/search');
    }
});

var clearSearchParams = function(){
    console.log('clearSearchParams');
    Session.set('folderList',false);
    Session.set('searchQuery',false);
    Session.set('searchField',false);
}

var folderFind = function(q, f){
    //var fl = Session.get('folderList');
    var q = q.trim();
    //var f = Session.get('searchField');
        var qMethod = (f) ? 'folderQuery' : 'searchElastic';
        var qArgs = {};
        if (f && f != "") {
            qArgs[f] = q;
        } else if (q && q != "") {
            qArgs['query'] = q;
        } else {
            qMethod = 'folderQuery';
        }
        Meteor.call(qMethod, qArgs, function (err, resp) {
            Session.set('folderList', resp);
            console.log(qMethod + ' resp ', resp);
            console.log('qArgs ', qArgs);
        });
    //Session.set('folderList',false);
    Session.set('searchQuery', q);
    Session.set('searchField', f);

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

