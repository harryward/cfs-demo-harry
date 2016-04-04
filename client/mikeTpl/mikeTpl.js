Template.mikeTpl.helpers({
    //add you helpers here
    'rawFilter': function(){
        return EJSON.stringify( Session.get('docSearchQuery'), {'indent':true } );
    },
    'rawForm': function(){
        return EJSON.stringify( Session.get('formBuilderObj'), {'indent':true } );
    },
    'docSearchQuery':function(){
        return Session.get('docSearchQuery')
    },
    'formBuilderObj':function(){
        return Session.get('formBuilderObj')
    },

});

Template.mikeTpl.events({
    'submit .advancedFilterForm': function(event, template){
        event.preventDefault();
        searchQuery = {};
        searchQuery.$or = [];
        fields = template.findAll('.form-control');
        _.each(fields,function(e){

            if(e.name && e.value){
                theField = {};
                if($(e).attr('type')!= 'date'){
                theField[e.name] = {

                    $regex: e.value, $options: 'i'

                }
                }else{
                    theField[e.name] = {

                        $gte: new Date(moment(e.value).format())

                    }
                }


                console.info('theField',theField);

                searchQuery.$or.push(theField);

            }
        })



        Session.set('docSearchQuery',searchQuery);
    }
});

Template.mikeTpl.onCreated(function () {
    //Deps.autorun(function(){
    //    Meteor.subscribe('advancedFilter',Session.get('filterQuery'))
    //})
});

Template.mikeTpl.onRendered(function () {
    //add your statement here
});

Template.mikeTpl.onDestroyed(function () {
    //add your statement here
});

