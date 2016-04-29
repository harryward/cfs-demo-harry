Meteor.methods({
    'insertFolder':function(folderObj){
        console.log('creating ticket...');

        var searchDoc = {};
        var folderId =  Folders.insert(folderObj)
        searchDoc.title = folderObj.title
        searchDoc.folderId = folderId
        searchDoc.body = folderObj.queryTags.toString(); + ' '+folderObj.summary + ' ' + folderObj.title
        searchDoc.folderMeta = folderObj
        Meteor.call('addRecord',searchDoc,folderObj._id);
        return folderId

    },
    'updateFolder':function(folderId,folderObj){
        console.log('updating ticket..');
        console.log('folderObj',folderObj)
        return Folders.update({
            '_id':folderId},{
            $set:folderObj
        })
    }
})

//Meteor.call('searchElastic','all the',function(err,resp){
//    Session.set('elasticResp',resp);
//    console.log(resp)
//});