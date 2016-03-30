if (Meteor.isClient) {
  // counter starts at 0
  Session.setDefault('counter', 0);

}

if (Meteor.isServer) {
  Meteor.startup(function () {
    Tickets._ensureIndex({ "date": -1})
  });
}
