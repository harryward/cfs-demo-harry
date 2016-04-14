Meteor.methods({
    'insertTicket':function(ticketObj){
        console.log('creating ticket...');

        var searchDoc = {};
        searchDoc.title = ticketObj.title
        searchDoc.ticketId = ticketObj._id
        searchDoc.body = ticketObj.queryTags.toString(); + ' '+ticketObj.summary + ' ' + ticketObj.title
        searchDoc.batchMeta = ticketObj

        Meteor.call('addRecord',searchDoc,ticketObj._id)

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

//Meteor.call('searchElastic','all the',function(err,resp){
//    Session.set('elasticResp',resp);
//    console.log(resp)
//});