Meteor.methods({
    'totalCats':function(){
        return Categories.find().count()
    },
    'totalClients':function(){
        return Clients.find().count()
    },
    'totalTags':function(){
        return Tags.find().count()
    }
})