Meteor.publish('docSearch', function (searchQuery, queryArgs) {
    if (queryArgs) {
        return Tickets.find(searchQuery, queryArgs)
    } else {
        return false
    }
})

Meteor.publish('singleTicket', function (ticketId) {
    return Tickets.find({'_id': ticketId})

})

Meteor.publish('singleDoc', function (fileId) {
    return Docs.find({'_id': fileId})

})

