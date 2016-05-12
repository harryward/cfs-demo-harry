Template.globalLayout.helpers({
    'main_class': function(){
        var mu = Meteor.user();
        console.log('mu', JSON.stringify(mu));
        if ( mu === null ) {
            return 'loggedout'
        } else {
            return Session.get('mainClass');
        }
    },
    'currUser':function(){
        return Meteor.user();
    },
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
        folderFind( $(event.target).attr('data-q'), $(event.target).attr('data-f'), 1);
        FlowRouter.go('/');
    },
    'submit .folderSearch': function (event, template) {
        event.preventDefault();
        console.log('submit .folderSearch');
        //Session.set('searchQuery', $('#q').val() );
        //Session.set('searchField',false);
        folderFind( $('#q').val(), false, 1);
        FlowRouter.go('/search');
    },
    'click .page_query' : function(event, template){
        event.preventDefault();
        //alert("page-query template.data ", template.data); // why doesn't this reference the item in the pagination array?
        //alert("page-query this ", this.class); // why doesn't this reference the item in the pagination array?
        var newp = $(event.target).attr('data-page');
        var p = Session.get('searchPageNum');
        if ( (newp - 0) !== (p - 0) ) {
            var q = Session.get('searchQuery');
            var f = Session.get('searchField');
            folderFind( q, f, newp);
            //console.log("!!pagenav to "+ newp+ " old p = "+p);
        }
    },
    'click #search-icon': function(event,template){
        event.preventDefault();
        $('#q').focus().select();
    },
    'click #uploadClick':function(event,template){ ///TODO: remove this
        event.preventDefault();
        clearSearchParams();
        FlowRouter.go('/upload');
    },
    'click #sidebar-close':function(event){
        event.preventDefault();
        $('.sideBarNav').sideNav('hide');
    },
    'click .logOut':function(event,template){///TODO: remove this or add back the logout link
        event.preventDefault();
        FlowRouter.go('/');
        Meteor.logout();
        clearSearchParams();
    },
    'click li.close-settings':function(event){
        event.preventDefault(); //navigating away from search results clears search params
        $('.button-collapse').sideNav('hide');
    },
    'click li.settings':function(event){
        event.preventDefault(); //navigating away from search results clears search params
        $('.button-collapse').sideNav('show');
    }
});

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


var clearSearchParams = function(){
    console.log('clearSearchParams');
    Session.set('folderList',false);
    Session.set('searchQuery',false);
    Session.set('searchField',false);
    Session.set('searchPageNum',false);
}

var folderFind = function(q, f, p){
    //console.log("folderFind q:"+q+" f:"+f+" p:"+p)

    //var fl = Session.get('folderList');
    //var f = Session.get('searchField');
    var q = q.trim();
    var qMethod = (f) ? 'folderQuery' : 'searchElastic';
    var p = p || 1;
    var qArgs = {page:p, limit:RESULTS_PAGE_LIMIT, q:{}};
    if (f && f != "") {
        qArgs['q'][f] = q;
    } else if (q && q != "") {
        qArgs['q'] = {query:q};
    } else {
        qMethod = 'folderQuery';
    }
    //console.log('qArgs ', JSON.stringify(qArgs));
    Meteor.call(qMethod, qArgs, function (err, resp) {
        Session.set('folderList', resp);
        //Session.set('folderCount', resp.hits.total);
        //console.log(qMethod + ' resp ', resp);
        //console.log('qArgs ', qArgs);
        //console.log("resp.hits.total ", resp.hits.total)
        var page_args = {total_item_ct:resp.hits.total, page_item_limit:RESULTS_PAGE_LIMIT, requested_page_num:p};
        Meteor.call('makePagination', page_args, function (err2, resp2) {
            if (err2) {
                console.log(err2);
            } else {
                Session.set('pagination', resp2);
            }
        });

    });
    //Session.set('folderList',false);
    Session.set('searchQuery', q);
    Session.set('searchField', f);
    Session.set('searchPageNum', p);

}
