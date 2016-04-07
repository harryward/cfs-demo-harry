Meteor.publish("cats",function(){
    return Categories.find();
})

Meteor.publish("tags",function(){
    return Tags.find();
})