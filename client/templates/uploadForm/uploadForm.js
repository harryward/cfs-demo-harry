Template.uploadForm.helpers({
    'showCreateFolder':function(){
        return Session.get('showCreateFolder')
    },
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
    'markets':function(){
        return Markets.find({},{sort:{'Facility':1}}).fetch()
    },
    'categories':function(){
        return Categories.find({},{sort:{'name':1}}).fetch()
    },
    'clients':function(){
        return Clients.find({},{sort:{'name':1}}).fetch()
    },
    'currUser':function(){
        return Meteor.user();
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
        var theTitle = prompt('File Title...',thisDoc.metadata.title || $('.folderTitle').val() || '');
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
        var stopwords = ["a", "about", "above", "across", "after", "afterwards", "again", "against", "all", "almost", "alone", "along", "already", "also","although","always","am","among", "amongst", "amoungst", "amount", "an", "and", "another", "any","anyhow","anyone","anything","anyway", "anywhere", "are", "around", "as",  "at", "back","be","became", "because","become","becomes", "becoming", "been", "before", "beforehand", "behind", "being", "below", "beside", "besides", "between", "beyond", "bill", "both", "bottom","but", "by", "call", "can", "cannot", "cant", "co", "con", "could", "couldnt", "cry", "de", "describe", "detail", "do", "done", "down", "due", "during", "each", "eg", "eight", "either", "eleven","else", "elsewhere", "empty", "enough", "etc", "even", "ever", "every", "everyone", "everything", "everywhere", "except", "few", "fifteen", "fify", "fill", "find", "fire", "first", "five", "for", "former", "formerly", "forty", "found", "four", "from", "front", "full", "further", "get", "give", "go", "had", "has", "hasnt", "have", "he", "hence", "her", "here", "hereafter", "hereby", "herein", "hereupon", "hers", "herself", "him", "himself", "his", "how", "however", "hundred", "ie", "if", "in", "inc", "indeed", "interest", "into", "is", "it", "its", "itself", "keep", "last", "latter", "latterly", "least", "less", "ltd", "made", "many", "may", "me", "meanwhile", "might", "mill", "mine", "more", "moreover", "most", "mostly", "move", "much", "must", "my", "myself", "name", "namely", "neither", "never", "nevertheless", "next", "nine", "no", "nobody", "none", "noone", "nor", "not", "nothing", "now", "nowhere", "of", "off", "often", "on", "once", "one", "only", "onto", "or", "other", "others", "otherwise", "our", "ours", "ourselves", "out", "over", "own","part", "per", "perhaps", "please", "put", "rather", "re", "same", "see", "seem", "seemed", "seeming", "seems", "serious", "several", "she", "should", "show", "side", "since", "sincere", "six", "sixty", "so", "some", "somehow", "someone", "something", "sometime", "sometimes", "somewhere", "still", "such", "system", "take", "ten", "than", "that", "the", "their", "them", "themselves", "then", "thence", "there", "thereafter", "thereby", "therefore", "therein", "thereupon", "these", "they", "thickv", "thin", "third", "this", "those", "though", "three", "through", "throughout", "thru", "thus", "to", "together", "too", "top", "toward", "towards", "twelve", "twenty", "two", "un", "under", "until", "up", "upon", "us", "very", "via", "was", "we", "well", "were", "what", "whatever", "when", "whence", "whenever", "where", "whereafter", "whereas", "whereby", "wherein", "whereupon", "wherever", "whether", "which", "while", "whither", "who", "whoever", "whole", "whom", "whose", "why", "will", "with", "within", "without", "would", "yet", "you", "your", "yours", "yourself", "yourselves"];
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
        //ticketObj.category = $('.catDrop').val();
        //parse URLs from summary for more machine tagging OR listen for onPaste events in the summary field front-end
        var titleWords = ticketObj.title.split(' ');
        _.each(titleWords,function(e,i){
            if(stopwords.indexOf( e.toLocaleLowerCase() ) === -1){
                //console.log("stopword "+e);
                ticketObj.tags.push( e );
            }
        })
        ticketObj.tags.push( ticketObj.category );
        ticketObj.tags.push( Meteor.user().profile.name);
        ticketObj.tags.push( ticketObj.client );
        ticketObj.tags.push( ticketObj.market );
        ticketObj.tags.push( moment().format('MMMM'));
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
            Meteor.call('insertFolder',ticketObj,function(err,resp){
                if(!err){
                    console.log('new ticket created',resp);
                    alert('success!');
                    var clearSessions = ['lastTicket','docId','files','fileArray','tags','totalCats','totalClients','totalTags']
                    _.each(clearSessions,function(e){
                        Session.set(e,false)
                    })
                    $('input,textarea').val('');
                    Meteor.call('autoCompleteTags');
                    FlowRouter.go('/search');
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
    Meteor.subscribe('markets'); // subscribe to markets
    Meteor.subscribe('clients'); // subscribe to clients
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

    // Client SELECTIZE
    Meteor.call('totalClients',function(err,resp){
        Session.set('totalClients',resp)
    })
    var clientRendered = false
    Tracker.autorun(function(){
        if(Clients.find().count() === Session.get('totalClients') && !clientRendered){
            clientRendered = true
            console.log('rendering client selectize');
            $('.clientDrop.hidden').removeClass('hidden form-control');
            $('.clientDrop').selectize({
                sortField: 'name',
                options:Clients.find().fetch(),
                valueField: 'name',
                labelField: 'name',
                searchField: ['name'],
                maxItems:1,
                create: function(input) {
                    Clients.insert({
                        '_id':Base58.encode(input.toLowerCase().replace(/ /g,'')),
                        'name':input
                    })
                    return {
                        name:input
                    }
                },
                onChange: function(value) {
                    Session.set('client',value.split(','));
                    console.log('client',Session.get('client'))
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
            console.log('rendering tags selectize');
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

