Template.batchList.helpers({
    'tickets':function(){
        if(Session.get('searchQuery')){
            return Tickets.find({'title':{$regex:Session.get('searchQuery'),$options:'i'}},{'sort':{'title':1}}).fetch()
        }else{
            return Tickets.find({},{'sort':{'type':-1,'title':1}}).fetch()
        }
    },
    'theFile':function(){
        if(Docs.findOne(this.toString())){
        return Docs.findOne(this.toString()).url()
        }
    },
    'totalFiles':function(){
        return this.files.length
    },
    'theFileMeta':function(){
        if(Docs.findOne(this.toString())){
            return Docs.findOne(this.toString())
        }
    },
    'raw':function(){
        return EJSON.stringify(this,{'indent':true})
    },
    'isLast':function(){
        if(this._id === Session.get('lastTicket')){
            return true
        }
    }
});

Template.batchList.events({
    'click .editMe':function(event,template){
        // event.preventDefault();
        // alert('make this button go to a route that lets you edit the files, title and summary')
    },
    'keyup .searchInput':function(event,template){
        Session.set('searchQuery',event.target.value)
    },
    'click .removeMe':function(event,template){
        event.preventDefault();
        if(confirm('are you sure? this cannot be reversed')){
        Tickets.remove(this._id)
        }
    }
});

Template.batchList.onCreated(function () {
    //add your statement here
});

Template.batchList.onRendered(function () {
    //add your statement here
});

Template.batchList.onDestroyed(function () {
    //add your statement here
});

