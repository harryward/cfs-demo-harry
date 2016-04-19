Tickets = new Meteor.Collection("tickets");
autoComplete = new Meteor.Collection("autocomplete");

if (Meteor.isServer) {
    Tickets._ensureIndex({
        "title": "text",
        "summary": "text",
        "queryTags": "text"
    });
}