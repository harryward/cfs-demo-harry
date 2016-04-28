Template.navBar.helpers({
    'searchQuery':function(){
        return Session.get('searchQuery')
    },
    'currUser':function(){
        console.log("user:", Meteor.user());
        return Meteor.user();
    }
});

Template.navBar.events({
    'click .logOut':function(event,template){
        event.preventDefault();
        Meteor.logout();
    },
    'click #sidebar-close':function(event){
        event.preventDefault();
        $('.sideBarNav').sideNav('hide');
    },
    'click .settings':function(event){
        event.preventDefault();
        FlowRouter.go('/settings')
    },
    'keyup #q':function(ev,template){
        //console.log("keyup.which: "+ev.which);
        //after a space has been typed, send a query every other keystroke
        if (ev.which > 31 && ev.which < 123) {
            if (Session.get('autoSendSearch') && Session.get('keyUpSearch')) {
                submitSearch($('#q').val());
                Session.set('keyUpSearch', false);
            } else if (ev.which === 32) {
                Session.set('autoSendSearch', true);
                Session.set('keyUpSearch', false);
            } else if (Session.get('autoSendSearch')) {
                Session.set('keyUpSearch', true);
            }
        }
    },
    'click .homeQuery':function(event,template){
        event.preventDefault();
        submitSearch( $(event.target).attr('data-q'), $(event.target).attr('data-f') );
        FlowRouter.go('/');
    },
    'submit .autoComplete': function (event, template) {
        event.preventDefault();
        submitSearch( $('#q').val() );
        FlowRouter.go('/search');
    }
});


var submitSearch = function(q, f){//f is a specific field
    console.log("submitSearch q: ", q)
    console.log("submitSearch f: ", f)
    Session.set('elasticResp',false);
    //neeed to reset the session vars
    delete Session.keys['searchQuery'];
    delete Session.keys['searchField'];
    //delete Session.keys['queryArgs'];
    //var filterObj = {};
    //filterObj.term = q;
    //filterObj.term = event.target.value;

    //var terms = filterObj.term.split(' ');

    //searchColumns = ["title","summary","tags","date"];
    //https://themeteorchef.com/snippets/mongodb-queries-and-projections/

    //var searchQuery = {};

    var fieldObj = {};

    //QUERY ARGS
    //var queryArgs = {};

    if(q && q != "") {

        var qMethod = (f && f != "") ? 'ticketQuery' : 'searchElastic';
        var qArgs = {};
        if (f && f != "") { qArgs[f] = q; } else { qArgs['query'] = q; }
        console.log('qMethod ',qMethod)

        Meteor.call(qMethod,qArgs,function(err,resp){
            Session.set('elasticResp',resp);
            console.log(qMethod+' resp ',resp)
            console.log('qArgs ',qArgs)
        });

        //searchQuery = {"$text": {$search: filterObj.term} }; //, score: { $meta: "textScore" }
        //queryArgs.limit = 1;
/*
        queryArgs = {
            fields: {
                score: { "$meta": "textScore" }
            },
            sort: {
                score: { "$meta": "textScore" }
                //date: -1
            }
        };
*/
    }
    //$('.sideBarNav').sideNav('hide');

    //searchQuery.$or = []



    //queryArgs.sort = {date: 1, score: { "$meta": "textScore" } };
    //formBObj = [];

    //db.prod_gravity_2015capex_pr_423.find(
    //    { "$text": { $search: "outlook phase" } },
    //    { score: { $meta: "textScore" } }
    //).sort( { ISOdate: 1, score: { $meta: "textScore" } } )
    /*
     _.each(Session.get('formBuilderObj'),function(e){
     // build the query

     _.each(terms, function(t){
     var cor = {};
     cor[ e.name ] = {$regex: t, $options: "i"};
     searchQuery.$or.push( cor );
     //fieldObj[e.name] = {$regex: t, $options: "i"};
     });


     ////BUILD THE FORM
     //formBObj.push({
     //    'name':e,
     //    'value':filterObj.term
     //})


     })
     */
    //console.log('searchQuery:'+JSON.stringify(searchQuery));
    //console.log('search q:', q)
    //console.log('search f:', f)
    //console.log('queryArgs:',queryArgs)
    Session.set('searchQuery',q);
    Session.set('searchField',f);
    //Session.set('formBuilderObj',Session.get('formBuilderObj')); // this builds the advanced filter form
    //Session.set('docSearchQuery', searchQuery || {});
    //Session.set('queryArgs', queryArgs);
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

        console.log('sidebar initiated')
    },100)

    Session.set('skip', parseInt('0'));
    Session.set('page', parseInt('1'));
    Session.set('autoSendSearch',false);
    Session.set('keyUpSearch',false);
    Deps.autorun(function(){
        Meteor.subscribe('docSearch',Session.get('docSearchQuery'),Session.get('queryArgs'))
    })
});

Template.navBar.onRendered(function () {
    //add your statement here
});

Template.navBar.onDestroyed(function () {
    //add your statement here
});

