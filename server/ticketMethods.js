Meteor.methods({
    'insertTicket':function(ticketObj){
        console.log('creating ticket...')
        return Tickets.insert(ticketObj)
    }
})