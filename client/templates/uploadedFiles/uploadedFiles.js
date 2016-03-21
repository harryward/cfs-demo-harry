Template.uploadedFiles.helpers({
    'files':function(){
        return Images.find({},{sort:{'uploadedAt':-1}}).fetch()
    },
    'theImageUrl':function(){
        return Images.findOne(this._id).url();
    },
    'isImage':function(){
        return Images.findOne(this._id).isImage()
    },
    'raw':function(){
        return EJSON.stringify(this,{'indent':true})
    }
});

Template.uploadedFiles.events({
    //add your events here
});

Template.uploadedFiles.onCreated(function () {
    //add your statement here
});

Template.uploadedFiles.onRendered(function () {
    //add your statement here
});

Template.uploadedFiles.onDestroyed(function () {
    //add your statement here
});

