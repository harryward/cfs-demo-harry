if(Meteor.isClient){
Tracker.autorun(function(){
    if(Session.get('searchQuery')){
        var advancedFilters = [
            {
                name:'title',
                label:'Title',
                field_type:'text',
                inherit_search:true,
                default_value:Session.get('searchQuery') || ''
            },
            {
                name:'summary',
                label:'Summary',
                field_type:'text',
                inherit_search:true,
                default_value:Session.get('searchQuery') || ''
            },
            {
                name:'tags',
                label:'Tags',
                field_type:'text',
                inherit_search:true,
                default_value:Session.get('searchQuery') || ''
            },
            {
                name:'date',
                label:'Date Created',
                field_type:'daterange',
                inherit_search:false,
                default_value:''
            },
            {
                name:'creator',
                label:'Creator',
                field_type:'active_lookup',
                inherit_search:false,
                default_value: ''
            }
        ];
        Session.set('formLayout',advancedFilters)
        Session.set('formBuilderObj',Session.get('formLayout')); // this builds the advanced filter form
    }
})




}