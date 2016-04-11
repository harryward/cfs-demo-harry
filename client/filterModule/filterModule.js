Template.filterModule.helpers({
    'page': function () {
        return Session.get('page')
    },
    'searchQuery':function(){
        return Session.get('searchQuery')
    },

    'advancedFilter':function(){
        return Session.get('advancedFilter')
    },
    'fileTypes':function(){
        var types = ['jpeg','jpg','gif','png','doc','docx','xsl','xslx','ppt','pptx','pdf'];
        return types;
    },
    'searching':function(){
        return Session.get('searching')
    },
    'skip': function (totes) {
        return Session.get('skip') + ' - ' + (Session.get('skip') + 10) + ' of ' + totes + ' '
    }
});

Template.filterModule.events({
    'submit .searchForm': function (event, template) {
        event.preventDefault();
        var filterObj = {};
        filterObj.term = $(event.target).find('.searchInput').val();
        var terms = filterObj.term.split(' ');

        //searchColumns = ["title","summary","tags","date"];
        //https://themeteorchef.com/snippets/mongodb-queries-and-projections/
        searchQuery = {};
        searchQuery = { "$text": { $search: filterObj.term } }; //, score: { $meta: "textScore" }
        //searchQuery.$or = []
        var fieldObj = {};

        //QUERY ARGS
        queryArgs = {};
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

        console.log('searchQuery',searchQuery)
        console.log('queryArgs',queryArgs)
        Session.set('searchQuery',filterObj.term);
        Session.set('formBuilderObj',Session.get('formBuilderObj')); // this builds the advanced filter form
        Session.set('docSearchQuery', searchQuery);
        Session.set('queryArgs', queryArgs);


    },
    'click .advancedFilter':function(event,template){
        event.preventDefault();
        if( Session.get("advancedFilter") ) {
            Session.set('useQuery',false);
            Session.set("advancedFilter", false);
        }else{



            Session.set('useQuery',true);
            Session.set("advancedFilter", true);

        }
    },
});

Template.filterModule.onCreated(function () {
    Session.set('skip', parseInt('0'))
    Session.set('page', parseInt('1'))


    //Deps.autorun(function(){
    //    Meteor.subscribe('docs',Session.get('searchQuery'),Session.get('skip'))
    //})

    Deps.autorun(function(){
        Meteor.subscribe('docSearch',Session.get('docSearchQuery'),Session.get('queryArgs'))
    })


});

Template.filterModule.onRendered(function () {
    //add your statement here
});

Template.filterModule.onDestroyed(function () {
    //add your statement here
});

