Folders = new Meteor.Collection("tickets"); //will be folders someday

autoComplete = new Meteor.Collection("autocomplete");

//this is for mongo keyword search, not used in favor of ElasticSearch
if (Meteor.isServer) {
    Folders._ensureIndex({
        "title": "text",
        "summary": "text",
        "queryTags": "text"
    });
}