Meteor.methods({
    'insertTicket':function(ticketObj){
        console.log('creating ticket...');

        var searchDoc = {};
        var ticketId =  Tickets.insert(ticketObj)
        searchDoc.title = ticketObj.title
        searchDoc.ticketId = ticketId
        searchDoc.body = ticketObj.queryTags.toString(); + ' '+ticketObj.summary + ' ' + ticketObj.title
        searchDoc.batchMeta = ticketObj
        Meteor.call('addRecord',searchDoc,ticketObj._id);
        return ticketId

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