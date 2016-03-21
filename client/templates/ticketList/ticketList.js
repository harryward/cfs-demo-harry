Template.ticketList.helpers({
    'tickets':function(){
        return Tickets.find({},{sort:{'date':-1}}).fetch()
    },
    'theFile':function(){
        if(Docs.findOne(this.toString())){
        return Docs.findOne(this.toString()).url()
        }
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

Template.ticketList.events({
    //add your events here
});

Template.ticketList.onCreated(function () {
    //add your statement here
});

Template.ticketList.onRendered(function () {
    //add your statement here
});

Template.ticketList.onDestroyed(function () {
    //add your statement here
});

