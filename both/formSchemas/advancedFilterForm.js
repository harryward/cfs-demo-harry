formSchemas = new Mongo.Collection("formschemas");

if (Meteor.isClient) {

/*
    Meteor.startup(function () {

        var formQuery = {'form_id': 'master'}
        Session.set('formQuery',formQuery);

        Deps.autorun(function(){
            Meteor.subscribe('formSchem', Session.get('formQuery'));
            console.log('subscribing to form')
        })


        Tracker.autorun(function () {
            if (formSchemas.find().count() && Session.get('formQuery')) {
                Session.set('formBuilderObj', formSchemas.find().fetch());
            }
        })

    //Tracker.autorun(function(){
    //    if(Tickets.find().count()){
    //        _.each(Tickets.find().fetch(),function(e){
    //            Meteor.subscribe('userMeta',e.user);
    //            console.log('subscribing to user meta')
    //        })
    //    }
    //})

    });


    Tracker.autorun(function () {
        if (Session.get('searchQuery')) {
            console.log('testing')
            // var advancedFilters = formFilters.findOne({'_id':'default'})
            var advancedFilters = formSchemas.find().fetch();
            Session.set('formLayout', advancedFilters)
            Session.set('formBuilderObj', Session.get('formLayout')); // this builds the advanced filter form

        }
    })

*/
}