Template.globalLayout.helpers({

});


Template.globalLayout.events({
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

Template.globalLayout.onCreated(function () {

    Session.set('skip', parseInt('0'));
    Session.set('page', parseInt('1'));
    Session.set('autoSendSearch',false);
    Session.set('keyUpSearch',false);
    Deps.autorun(function () {
        Meteor.subscribe('aComplete', Session.get('aQuery'))
    })

});




Template.globalLayout.onRendered(function () {
    //add your statement here
});

Template.globalLayout.onDestroyed(function () {
    //add your statement here
});

