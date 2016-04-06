Meteor.publish('userMeta',function(theUserId){
    //return Meteor.users.find({'_id':theUserId})
    return Meteor.users.find()
})