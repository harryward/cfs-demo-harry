Template.mikeTpl.helpers({
    //add you helpers here
    'rawFilter': function(){
        return EJSON.stringify( Session.get('filterQuery'), {'indent':true } );
    }

});

Template.mikeTpl.events({
    'submit .advancedFilterForm': function(event, template){
        event.preventDefault();
        var formObj = {};
        var fields = template.findAll('.form-control');
        _.each(fields, function(e, i){
            if(e.name) {
                formObj[e.name] = e.value;
            }
        })
        console.log("form data: ", formObj);

        formObj.date = new Date();
        if(Session.get('searchQuery')){
            formObj.s_query = Session.get('searchQuery');
        }

        Session.set('filterQuery', formObj);
    }
});

Template.mikeTpl.onCreated(function () {
    Deps.autorun(function(){
        Meteor.subscribe('advancedFilter',Session.get('filterQuery'))
    })
});

Template.mikeTpl.onRendered(function () {
    //add your statement here
});

Template.mikeTpl.onDestroyed(function () {
    //add your statement here
});

