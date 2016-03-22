Template.ticketLanding.helpers({
    "tickets": function(){
        return Tickets.find(Session.get('params').ticketId).fetch()

    },
    'theFileLink':function(){
        if(Docs.findOne(this.toString())){
            return Docs.findOne(this.toString()).url()
        }
    },
    'theFileMeta':function(){
        if(Docs.findOne(this.toString())){
            return Docs.findOne(this.toString())
        }
    },
    'editing':function(){
        return Session.get('editing')
    },
    'raw':function(){
        return EJSON.stringify(this,{'indent':true})
    },
});



Template.ticketLanding.events({
    'click .editMe':function(event,template){
        event.preventDefault();
      if(!Session.get('editing')){
          Session.set('editing',true)
      } else{
          Session.set('editing',false)
      }
    },
   'submit .editForm':function(event,template){
       event.preventDefault();
       var formObj = {};

       _.each(template.findAll('.form-control'),function(e,i){
           formObj[e.name] = e.value
       })

       formObj.lastEdited = new Date();

       console.log('updated form Obj',formObj);

       Meteor.call('updateTicket',Session.get('params').ticketId,formObj,function(err,resp){ // server/ticketMethods.js
           if(!err){
               alert('saved');
           }else{
               alert('errors, check the console')
               console.error(err)
           }
       })

   }
});

Template.ticketLanding.onCreated(function () {
    //add your statement here
});

Template.ticketLanding.onRendered(function () {
    //add your statement here
});

Template.ticketLanding.onDestroyed(function () {
    //add your statement here
});

