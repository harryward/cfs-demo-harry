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

// console.log('onRendered');
    $.each($('.list-group-item'), function (index, value) {

      console.log("hello world")
    })
});

Template.ticketLanding.onDestroyed(function () {
    //add your statement here
});

<<<<<<< HEAD
	}
});

Template.ticketLanding.events({
	'click .publishMe':function(event,template){
		
		if($('#titleInput').val() !== ''){
			var newtitle= $('#titleInput').val();
			Tickets.update({_id: this._id}, {$set: {'title': newtitle}});
			$('#titleInput').val('');
			$(".alert-success").show();
		} 

		if($('#summaryInput').val() !== ''){
			var newSummary= $('#summaryInput').val();
			Tickets.update({_id: this._id}, {$set: {'summary': newSummary}});
			$('#summaryInput').val('');
			$(".alert-success").show();	
		} 
		// else if ($('#summaryInput') && $('#summaryInput').val() == ''){
		// 	alert("No changes made.");
		// 	// // return false;	

		// }
		else{

			return false;	

		}

	},
	'click .cancelMe':function(event,template){
		if(confirm('Are you sure? All unsaved changes will be lost.')){
			FlowRouter.go("/");
		} else{
			return false;

		}



	},
	'click .removeMe':function(event,template){
		event.preventDefault();
		if(confirm('Are you sure you want to delete? This cannot be reversed.')){
			Tickets.remove(this._id)
			FlowRouter.go("/");

		} else{
			return false;
		}
	}

});
=======
>>>>>>> master
