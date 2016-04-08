Tickets = new Meteor.Collection("tickets");

if (Meteor.isServer) {
    Tickets._ensureIndex({
        "title": "text",
        "summary": "text",
        "queryTags": "text"
    });
}