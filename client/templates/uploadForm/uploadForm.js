Template.uploadForm.helpers({
    'files':function(){
        return Session.get('files')
    },
    'thisFile':function(){
        return Docs.findOne(this.toString())
    },
    'uploadProg':function(){
        return Docs.findOne(this.toString()).uploadProgress()
    },
    'isDone':function(){
        return Docs.findOne(this.toString()).isUploaded()
    },
    'categories':function(){
        return Categories.find({},{sort:{'name':1}}).fetch()
    },
    'clients':function(){
        return Clients.find({},{sort:{'name':1}}).fetch()
    }

});
// test d

Template.uploadForm.events({
    'click .popFile':function(event,template){
        var self = this.toString();
        var fileArray = [];
        if(Session.get('files').length > 1){
            _.each(Session.get('files'),function(fileId){
                if(fileId === self){

                }else{
                    fileArray.push(fileId);
                    Session.set('files',fileArray || [])
                }
            })
        }else{
            Session.set('files',[])
        }
    },
    'click .uploadButton':function(event,template){
        $('.myFileInput').click();
    },
    'change .myFileInput': function(event, template) {
        var files = event.target.files
        for (var i = 0, ln = files.length; i < ln; i++) {
            if(files.length){
                var newFile = new FS.File(files[i]);
                newFile.metadata = {foo:"bar"}
                Docs.insert(newFile, function (err, fileObj) {
                    console.log('fileObj',fileObj);
                    var fileArray = Session.get('files') || [];
                    var fileTypeArray = Session.get('fileTypes') || [];
                    fileArray.push(fileObj._id);
                    fileTypeArray.push( fileObj.getExtension().toLocaleLowerCase() );
                    Session.set('fileTypes',fileTypeArray);

                    queryArrayObj.update({'_id':Meteor.user()._id},{
                        $addToSet:{
                            'queryTags':fileObj.getExtension()
                        }
                    })

                    $(event.target).val('');
                    Session.set('files',fileArray);

                    Session.set('docId',fileObj._id);
                    Meteor.subscribe('singleDoc',fileObj._id);
                    // Inserted new doc with ID fileObj._id, and kicked off the data upload using HTTP
                });

            }
        }
    },
    'click .addSummary':function(event,template){
        event.preventDefault();
        var self = this;
        var thisDoc = Docs.findOne(this.toString())
        var theSummary = prompt('File Summary...',thisDoc.metadata.summary || '');
        if(theSummary){
            Docs.update({'_id':self.toString()},{
                $set:{
                    'metadata.summary':theSummary
                }})
            queryArrayObj.update({'_id':Meteor.user()._id},{
                $addToSet:{
                    'queryTags': theSummary.toLowerCase()
                }
            })
        }
    },
    'click .addTitle':function(event,template){
        event.preventDefault();
        var self = this;
        var thisDoc = Docs.findOne(this.toString())
        var theTitle = prompt('File Title...',thisDoc.metadata.title || $('.batchTitle').val() || '');
        if(theTitle){
        Docs.update({'_id':self.toString()},{
            $set:{
            'metadata.title':theTitle
        }})
            queryArrayObj.update({'_id':Meteor.user()._id},{
                $addToSet:{
                    'queryTags': theTitle.toLowerCase()
                }
            })
        }
    },
    'submit .ticketCreator':function(event,template){
        event.preventDefault();
        ticketObj = {};
        formObj = $(event.target).serializeArray();
        _.each(formObj,function(e,i){
            if(e.name){
                ticketObj[e.name] = e.value;
            }
        });
        ticketObj.date = new Date();
        ticketObj.summary = $('.summernote').val();
        ticketObj.files = Session.get('files');
        ticketObj.fileTypes = Session.get('fileTypes');
        ticketObj.tagString = ticketObj.tags;
        ticketObj.tags = Session.get('tags');
        ticketObj.user = Meteor.user()._id;
        ticketObj.userObj = Meteor.user();
        ticketObj.category = $('.catDrop').val();
        //parse URLs from summary for more machine tagging OR listen for onPaste events in the summary field front-end

        ticketObj.tags.push(ticketObj.category);
        ticketObj.tags.push( Meteor.user().profile.name);
        ticketObj.tags.push( moment().format('YYYY'));
        ticketObj.tags.push( ticketObj.category);

        ///ADD THE TAGS TO QUERYARRAY
        _.each(ticketObj.tags,function(e){
            queryArrayObj.update({'_id':Meteor.user()._id},{
                $addToSet:{
                    'queryTags': e.toLowerCase()
                }
            })
        })
        ticketObj.tags = Session.get('tags');
        ticketObj.queryTags = queryArrayObj.findOne().queryTags
        console.log('ticket object',ticketObj);

        //if(!Session.get('docId')) {
        //    alert('you must attach a file!')
        //    return false
        //}else{
            Meteor.call('insertTicket',ticketObj,function(err,resp){
                if(!err){
                    console.log('new ticket created',resp);
                    alert('success!');
                    var clearSessions = ['lastTicket','docId','files','fileArray','tags','totalCats','totalTags']
                    _.each(clearSessions,function(e){
                        Session.set(e,false)
                    })
                    $('input,textarea').val('');
                    FlowRouter.go('/files');
                }else{
                    console.error('error creating ticket',err)
                }
            })
        //}
    }
});

Template.uploadForm.onCreated(function () {
    queryArrayObj.remove({});
    queryArrayObj.insert({'_id':Meteor.user()._id});
    //this.cleanTags = function(arr){ //clean whitespace, duplicates, force lowercase
    //    if (typeof arr !== 'undefined' && arr.length > 0) {
    //        var new_arr = [];
    //        _.each(arr, function (str) {
    //            var s = str.toLocaleLowerCase();
    //            if (new_arr.indexOf(s) === -1 && s !== '')
    //                new_arr.push(s);
    //        });
    //        return new_arr;
    //    }else{
    //        return arr;
    //    }
    //}

    // data subscription

    Meteor.subscribe('cats'); // subscribe to categories
    Meteor.subscribe('tags'); // subscribe to tags
});

Template.uploadForm.onRendered(function () {
    $('.summernote').summernote();

    // CATS SELECTIZE

    Meteor.call('totalCats',function(err,resp){
        Session.set('totalCats',resp)
    })
    var catRendered = false;
    Tracker.autorun(function(){
        if(Categories.find().count() === Session.get('totalCats') && !catRendered){
            catRendered = true
            console.log('rendering category selectize');
            $('select.catDrop.hidden').removeClass('hidden');
            $('select.catDrop').selectize({
                sortField: 'name',
                options:Categories.find().fetch(),
                searchField: ['name'],
                valueField: 'name',
                labelField: 'name',
                create: function(input) {
                     Categories.insert({
                         '_id':Base58.encode(input.toLowerCase().replace(/ /g,'')),
                         'name':input
                     })
                    return {
                        name:input
                    }
                }

            });
        }
    })

   // TAGS SELECTIZE
    Meteor.call('totalTags',function(err,resp){
        Session.set('totalTags',resp)
    })
    var tagRendered = false
    Tracker.autorun(function(){
        if(Tags.find().count() === Session.get('totalTags') && !tagRendered){
            catRendered = true
            console.log('rendering category selectize');
            $('.tagDrop.hidden').removeClass('hidden form-control');
            $('.tagDrop').selectize({
                sortField: 'name',
                options:Tags.find().fetch(),
                valueField: 'name',
                labelField: 'name',
                searchField: ['name'],
                maxItems:3,
                create: function(input) {
                    Tags.insert({
                        '_id':Base58.encode(input.toLowerCase().replace(/ /g,'')),
                        'name':input
                    })
                    return {
                        name:input
                    }
                },
                onChange: function(value) {
                    Session.set('tags',value.split(','));
                    console.log('tags',Session.get('tags'))
                }

            });
        }
    })

});

Template.uploadForm.onDestroyed(function () {
    //add your statement here
});

