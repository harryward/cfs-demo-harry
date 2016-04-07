Meteor.methods({
    'totalCats':function(){
        return Categories.find().count()
    },
    'totalTags':function(){
        return Tags.find().count()
    },
})