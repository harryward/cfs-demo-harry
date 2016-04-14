Meteor.publish('albaPubs', function (searchQuery, queryArgs) {
    if (queryArgs) {
        return Tickets.find(searchQuery, queryArgs)
    } else {
        return Tickets.find({},{sort:{date:1}})
    }
})