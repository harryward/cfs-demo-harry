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
    'searching':function(){
        return Session.get('searching')
    },
    'skip': function (totes) {
        return Session.get('skip') + ' - ' + (Session.get('skip') + 10) + ' of ' + totes + ' '
    },
    'ticketCount': function () {
        if (Session.get('searchQuery')) {
            return Tickets.find({
                $or: [
                    {
                        'title': {
                            $regex: Session.get('searchQuery'), $options: 'i'
                        }
                    },
                    {
                        'tags': {
                            $regex: Session.get('searchQuery'), $options: 'i'
                        }
                    },
                    {
                        'summary': {
                            $regex: Session.get('searchQuery'), $options: 'i'
                        }
                    }

                ]

            }).count()
        } else {
            return Tickets.find({}).count()
        }
    }
});

Template.filterModule.events({
    'submit .searchForm': function (event, template) {
        event.preventDefault();

        var filterObj = {};
        filterObj.term = $(event.target).find('.searchInput').val();


        var advancedFilters = [
            {
                name:'title',
                label:'Title',
                field_type:'text',
                inherit_search:true,
                default_value:filterObj.term || ''
            },
            {
                name:'summary',
                label:'Summary',
                field_type:'text',
                inherit_search:true,
                default_value:filterObj.term || ''
            },
            {
                name:'tags',
                label:'Tags',
                field_type:'text',
                inherit_search:true,
                default_value:filterObj.term || ''
            },
            {
                name:'date',
                label:'Date Created',
                field_type:'date',
                inherit_search:false,
                default_value:moment().format('YYYY-MM-DD')
            },
            {
                name:'creator',
                label:'Creator',
                field_type:'active_lookup',
                inherit_search:false,
                default_value:filterObj.term || ''
            }
        ];


        //searchColumns = ["title","summary","tags","date"];
        searchQuery = {};
        searchQuery.$or = []

        //QUERY ARGS
        queryArgs = {};
        //queryArgs.limit = 1;
        queryArgs.sort = {date: 1}
        //formBObj = [];

        _.each(advancedFilters,function(e){

            // build the query
            var fieldObj = {};
            fieldObj[e.name] ={$regex:filterObj.term,$options:"i"}
            if(e.inherit_search){
            searchQuery.$or.push(fieldObj)
            }

            ////BUILD THE FORM
            //formBObj.push({
            //    'name':e,
            //    'value':filterObj.term
            //})


        })

        console.log('searchQuery',searchQuery)
        Session.set('searchQuery',filterObj.term);
        Session.set('formBuilderObj',advancedFilters); // this builds the advanced filter form
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

