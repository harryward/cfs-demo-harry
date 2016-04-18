Meteor.publish("cats",function(){
    return Categories.find();
})

Meteor.publish("tags",function(){
    return Tags.find();
})

Meteor.publish("markets",function(){
    return Markets.find();
})

Meteor.publish("clients",function(){
    return Clients.find();
})
