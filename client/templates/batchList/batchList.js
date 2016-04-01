Template.batchList.helpers({

    'tickets': function () {
        if (!Session.get('filterQuery') && Session.get('useQuery')) {
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
                        },

                    ]

                }, {
                    'sort': {
                        'date': -1
                    },
                    'skip': Session.get('skip'),
                    'limit': 10,
                }).fetch()
            } else {
                return Tickets.find({}, {
                    'sort': {
                        'date': -1
                    },
                    //'skip': Session.get('skip'),
                    'limit': 10,
                }).fetch()
            }
        }else{

            // IF ADVANCED FILTER

            return Tickets.find({},{
                'sort': {
                'date': -1
            }}
        ).fetch()
        }
    },
    'advancedResults':function(){
        // MIKE TO MAKE THE ENTIRE QUERY BE A SESSION VARIABLE
        return Tickets.find({
            $or: [
                {
                    'title': {
                        $regex: Session.get('filterQuery').title, $options: 'i'
                    }
                },
                //{
                //    'tags': {
                //        $regex: searchQuery, $options: 'i'
                //    }
                //},
                //{
                //    'summary': {
                //        $regex: searchQuery, $options: 'i' dd
                //    }
                //},

            ]

        },{
            'sort': {
                'date': -1
            },
            //'skip': Session.get('skip'),
        }).fetch()
    },
    'date': function () {
        return moment(this.date).fromNow();
    },
    'searchQuery': function () {
        return Session.get('searchQuery')
    },
    'raw': function () {
        return EJSON.stringify(this, {'indent': true})
    },
    'isLast': function () {
        if (this._id === Session.get('lastTicket')) {
            return true
        }
    }
});

Template.batchList.events({
    'click .editMe': function (event, template) {
        // event.preventDefault();
        // alert('make this button go to a route that lets you edit the files, title and summary')
    },

    'click .removeMe': function (event, template) {
        event.preventDefault();
        if (confirm('are you sure? this cannot be reversed')) {
            Tickets.remove(this._id)
        }
    },
    'click .pagination li': function (event, template) {
        event.preventDefault();
        var pagNum = $(event.target).text();

        Session.set('skip', pagNum * 10)
        Session.set('page', pagNum)
        $('.batchList-container').scrollTop(0)
    },

});

Template.batchList.onCreated(function () {
    //add your statement here
});

Template.batchList.onRendered(function () {
    //add your statement here
});

Template.batchList.onDestroyed(function () {
    //add your statement here
});

