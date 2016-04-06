Meteor.methods({
    'userLookup':function(){
        var pipeline = [
            {$group: {_id: "$user"}}
        ];
        var result = Tickets.aggregate(pipeline);
        return result

    },
})
