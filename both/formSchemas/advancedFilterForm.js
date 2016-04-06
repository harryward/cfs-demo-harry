formSchemas = new Mongo.Collection("formschemas");

if (Meteor.isClient) {


    Meteor.startup(function () {
    Meteor.subscribe('formSchem',{'form_id':'master'});
        Tracker.autorun(function(){
         if(formSchemas.find().count()){
             Session.set('formLayout', formSchemas.find().fetch())
             Session.set('formBuilderObj', Session.get('formLayout'));
         }
        })


    });


    Tracker.autorun(function () {
        if (Session.get('searchQuery')) {
            // var advancedFilters = formFilters.findOne({'_id':'default'})
            var advancedFilters = formSchemas.find().fetch();
            Session.set('formLayout', advancedFilters)
            Session.set('formBuilderObj', Session.get('formLayout')); // this builds the advanced filter form
        }
    })


}