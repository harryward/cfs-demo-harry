if(Meteor.isClient){
Tracker.autorun(function(){
    //if(Session.get('searchQuery')){
        // var advancedFilters = formFilters.findOne({'_id':'default'})
        var advancedFilters = [
            {
                name:'title',
                label:'Title',
                field_type:'text',
                q_type:'regex',
                inherit_search:true,
                default_value:Session.get('searchQuery') || ''
            },
            {
                name:'summary',
                label:'Summary',
                field_type:'text',
                q_type:'regex',
                inherit_search:true,
                default_value:Session.get('searchQuery') || ''
            },
            {
                name:'tags',
                label:'Tags',
                field_type:'text',
                q_type:'regex',
                inherit_search:true,
                default_value:Session.get('searchQuery') || ''
            },
            {
                name:'date',
                label:'Date Created',
                field_type:'daterange',
                q_type:'date',
                inherit_search:false,
                default_value:''
            },
            {
                name:'user',
                label:'Creator',
                field_type:'active_lookup',
                q_type:'literal', //for IDs
                inherit_search:false,
                default_value: ''
            }
        ];
        Session.set('formLayout',advancedFilters)
        Session.set('formBuilderObj',Session.get('formLayout')); // this builds the advanced filter form
    //}
})




}