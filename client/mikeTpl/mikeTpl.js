Template.mikeTpl.helpers({
    //add you helpers here

    'searchQuery':function(){
        return Session.get('searchQuery')
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
        searchQuery.$and = [];
        fields = template.findAll('.form-control');
        _.each(fields,function(e){

            if(e.name && e.value){
                theField = {};
                if($(e).attr('type')!= 'daterange'){
                theField[e.name] = {

                    $regex: e.value, $options: 'i'

                }
                }else{
                    var splitDate = e.value.replace(/''/g,'').split('-')
                    var splitStart = splitDate[0];
                    var splitEnd = splitDate[1];
                    theField[e.name] = {

                        $gte: new Date(moment(splitStart).format()),
                        $lte: new Date(moment(splitEnd).format())

                    }
                }


                console.info('theField',theField);

                searchQuery.$and.push(theField);

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
    $('input[type="daterange"]').daterangepicker();
});

Template.mikeTpl.onDestroyed(function () {
    //add your statement here
});

