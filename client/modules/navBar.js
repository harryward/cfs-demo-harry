Template.navBar.helpers({
    'searchQuery':function(){
        return Session.get('searchQuery')
    },
});

Template.navBar.events({
    'click .logOut':function(event,template){
        event.preventDefault();
        Meteor.logout();
    },
    'keyup #q':function(ev,template){
        console.log("keyup.which: "+ev.which);
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
    'submit .searchForm': function (event, template) {
        event.preventDefault();
        submitSearch( $('#q').val() );
    }
});


var submitSearch = function(q){
    Session.set('elasticResp',false);
    //neeed to reset the session vars
    delete Session.keys['searchQuery'];
    delete Session.keys['queryArgs'];
    var filterObj = {};
    filterObj.term = q;
    //filterObj.term = event.target.value;

    var terms = filterObj.term.split(' ');

    //searchColumns = ["title","summary","tags","date"];
    //https://themeteorchef.com/snippets/mongodb-queries-and-projections/

    var searchQuery = {};

    var fieldObj = {};

    //QUERY ARGS
    var queryArgs = {};

    if(filterObj.term && filterObj.term != "") {

        Meteor.call('searchElastic',filterObj.term,function(err,resp){
            Session.set('elasticResp',resp);
            console.log(resp)
        });

        searchQuery = {"$text": {$search: filterObj.term}}; //, score: { $meta: "textScore" }
        //queryArgs.limit = 1;

        queryArgs = {
            fields: {
                score: { "$meta": "textScore" }
            },
            sort: {
                score: { "$meta": "textScore" }
                //date: -1
            }
        };

    }

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
    console.log('searchQuery:',searchQuery)
    console.log('queryArgs:',queryArgs)
    Session.set('searchQuery',filterObj.term);
    Session.set('formBuilderObj',Session.get('formBuilderObj')); // this builds the advanced filter form
    Session.set('docSearchQuery', searchQuery || {});
    Session.set('queryArgs', queryArgs);
}

Template.navBar.onCreated(function () {
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

