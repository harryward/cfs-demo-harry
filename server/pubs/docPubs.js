//unused?? in favor of elasticsearch
Meteor.publish('folderSearch', function (searchQuery, queryArgs) {
    if (queryArgs) {
        return Folders.find(searchQuery, queryArgs)
    } else {
        return Folders.find({},{sort:{date:1}})
    }
})
Meteor.publish('folders', function () {
        return Folders.find({},{sort:{date:1}})
})

Meteor.publish('singleFolder', function (folderId) {
    return Folders.find({'_id': folderId})

});

Meteor.publish('singleDoc', function (fileId) {
    return Docs.find({'_id': fileId})

});

