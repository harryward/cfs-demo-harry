Meteor.methods({
    'userLookup':function(queryObj){
        var pipeline = [
            //{$match: queryObj},
            {$group: {_id: "$user"}}
        ];
        var result = Tickets.aggregate(pipeline);
        return result

    },
})
