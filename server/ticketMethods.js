Meteor.methods({
    'insertTicket':function(ticketObj){
        console.log('creating ticket...');
        return Tickets.insert(ticketObj)
    },
    'updateTicket':function(ticketId,ticketObj){
        console.log('updating ticket..');
        console.log('ticketObj',ticketObj)
        return Tickets.update({
            '_id':ticketId},{
            $set:ticketObj
        })
    }
})