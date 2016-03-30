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
        var searchTerm = $(event.target).find('.searchInput').val();
        Session.set('searchQuery', searchTerm)
        Session.set('skip', parseInt('0'))
        Session.set('page', parseInt('0'))
    },
    'click .advancedFilter':function(event,template){
        event.preventDefault();
        if( Session.get("advancedFilter") ) {
            Session.set("advancedFilter", false);
        }else{
            Session.set("advancedFilter", true);
        }
    },
});

Template.filterModule.onCreated(function () {
    Session.set('skip', parseInt('0'))
    Session.set('page', parseInt('1'))
    Deps.autorun(function(){
        Meteor.subscribe('docs',Session.get('searchQuery'),Session.get('skip'))
    })
});

Template.filterModule.onRendered(function () {
    //add your statement here
});

Template.filterModule.onDestroyed(function () {
    //add your statement here
});

