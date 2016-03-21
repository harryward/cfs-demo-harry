Template.ticketLanding.helpers({
	"tickets": function(){
		return Tickets.find(Session.get('params').ticketId).fetch()

	}
});

Template.ticketLanding.events({
	'click .publishMe':function(event,template){
		if($('#titleInput').val() !== ''){;
			var newtitle= $('#titleInput').val();
			Tickets.update({_id: this._id}, {$set: {'title': newtitle}});
			$('#titleInput').val('');
		} 

		if($('#summaryInput').val() !== ''){
			var newSummary= $('#summaryInput').val();
			Tickets.update({_id: this._id}, {$set: {'summary': newSummary}});
			$('#summaryInput').val('');
		} else{
			alert("No changes made.")
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