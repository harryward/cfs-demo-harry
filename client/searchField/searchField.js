Template.searchField.helpers({
    'autoComp': function () {
        return autoComplete.find({}, {$sort: {'term': 1}}).fetch()
    },
    'searchQuery': function () {
        return Session.get('searchQuery');
    },
});

Template.searchField.events({
    'keyup #aq': function (event, template) {
        event.preventDefault();
        Session.set('aQuery', event.target.value);
        console.log('setting the term', event.target.value)
    },
    'submit .autoComplete': function (event, template) {
        event.preventDefault();
        submitSearch($('#q').val());
        FlowRouter.go('/files')
    },
    'click .autoTerm': function (event, template) {
        event.preventDefault();
        var q = Session.get('aQuery');
        Session.set('searchQuery', q);
        submitSearch(q);

    },
});

var submitSearch = function (q) {
    Session.set('elasticResp', false);
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

    if (filterObj.term && filterObj.term != "") {

        Meteor.call('searchElastic', filterObj.term, function (err, resp) {
            Session.set('elasticResp', resp);
            console.log(resp)
        });

        searchQuery = {"$text": {$search: filterObj.term}}; //, score: { $meta: "textScore" }
        //queryArgs.limit = 1;

        queryArgs = {
            fields: {
                score: {"$meta": "textScore"}
            },
            sort: {
                score: {"$meta": "textScore"}
                //date: -1
            }
        };

    }

    FlowRouter.go('/files');

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
    console.log('searchQuery:', searchQuery)
    console.log('queryArgs:', queryArgs)
    Session.set('searchQuery', filterObj.term);
    Session.set('formBuilderObj', Session.get('formBuilderObj')); // this builds the advanced filter form
    Session.set('docSearchQuery', searchQuery || {});
    Session.set('queryArgs', queryArgs);
}

Template.searchField.onCreated(function () {
    Session.set('skip', parseInt('0'));
    Session.set('page', parseInt('1'));
    Session.set('autoSendSearch', false);
    Session.set('keyUpSearch', false);

    Deps.autorun(function () {
        Meteor.subscribe('aComplete', Session.get('aQuery'))
    })


});

Template.searchField.onRendered(function () {
    //put a thing here
});

/*
Template.searchField.onRendered(function () {
    Session.set('aQuery', '');
    Session.set('searchQuickSubmit', true);

    $('#aq').selectize({
        sortField: 'term',
        searchField: ['term'],
        valueField: 'term',
        labelField: 'term',
        onItemAdd: function (value, $item) { //called second
            var item = this.getItem(value)[0].innerHTML;
            console.log("Add item "+item);
            Session.set('searchQuickSubmit', false);
            //Session.set('aQuery', '');
            //delete Session.keys.aQuery;
            //this.clear();
            //this.clearOptions();
        },
        onChange: function(passed){ //term added to the list //called third
            //testing reload
            console.log('onChange passed '+passed);
        },
        options: [],
        onKeyDown: function(z){ //onType
            console.log("caretPos = "+JSON.stringify(this.caretPos) );
            console.log("$activeOption = "+JSON.stringify(this.$activeOption) );
            console.log("$activeItems = "+JSON.stringify(this.$activeItems) );
            console.log("onKeyDown called z.keyCode="+z.keyCode);
        },
        persist: false,
        maxItems:22,
        create: function(input) {//called first //creates a new tag not on the list of autocomplete suggestions
            console.log("create "+input);
            Session.set('aQuery', '');
            Session.get('searchQuickSubmit');
            //return { term:input };
            if ( Session.get('searchQuickSubmit') && input.indexOf(" ") > -1 ) {
                FlowRouter.go('/files');
            } else {
                return { term:input };
            }
        },
        load: function (query, callback) { //
            console.log('LOAD query', query);
            Session.set('aQuery', query);
            if (query.length > 1 && query != "") {
                callback(autoComplete.find().fetch());
            } else {
                console.log('no query');
                callback({})
            }
        }

    });
});
*/
Template.searchField.onDestroyed(function () {
    //add your statement here
});

