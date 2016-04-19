Meteor.publish('aComplete', function (theTerm) {
    if (theTerm) {
        console.log('subcribing to autocomplete...');
        return autoComplete.find({'term': {$regex: theTerm.toString(), $options: 'i'}})
    }
})