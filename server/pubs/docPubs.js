Meteor.publish('docs',function(searchQuery,skipAmount){
    if(searchQuery){
        return Tickets.find({
                $or: [
                    {
                        'title': {
                            $regex: searchQuery, $options: 'i'
                        }
                    },
                    {
                        'tags': {
                            $regex: searchQuery, $options: 'i'
                        }
                    },
                    {
                        'summary': {
                            $regex: searchQuery, $options: 'i'
                        }
                    },

                ]

            },
            {'sort': {'date': -1},limit:100}
        )

    }else{
        return Tickets.find({}, {'sort': {'date': -1},limit:100})
    }
})

Meteor.publish('singleTicket',function(ticketId){
    return Tickets.find({'_id':ticketId})

})

Meteor.publish('singleDoc',function(fileId){
    return Docs.find({'_id':fileId})

})

