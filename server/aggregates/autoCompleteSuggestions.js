Meteor.methods({
    'autoCompleteTags': function () {

        var pipeline = [
            {$unwind: "$queryTags"},
            {$group: {_id: "$queryTags", frequency: {$sum: 1}}},
        ];

        var result = Folders.aggregate(pipeline);
        //console.log(result);
        //return result
        if (result) {
            _.each(result, function (e) {
                //autoComplete.
                if (e._id && e._id != "" && e._id != " ") {
                    e.term = e._id;
                    e._id = Base58.encode(e._id);
                    //console.log('inserting term: ', e._id);
                    if (autoComplete.findOne(e._id)) {
                        console.log('updating term', e.term)
                        autoComplete.update({'_id': e._id}, {
                            $set: {
                                'frequency': e.frequency
                            }
                        });
                    } else {
                        console.log('inserting new term', e.term)
                        autoComplete.insert(e);
                    }
                }
            })
        }
        //return result
    }
})