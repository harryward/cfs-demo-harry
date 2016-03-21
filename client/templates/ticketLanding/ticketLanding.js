Template.ticketLanding.helpers({
	"tickets": function(){
		return Tickets.find(Session.get('params').ticketId).fetch()

	}
});

Template.ticketLanding.events({
	'click .publishMe':function(event,template){
		//check for changes in title
		//check for changes in summary
		//add insert update
		//add success message
		//add routing back home
	},
	'click .cancelMe':function(event,template){
		if(confirm('Are you sure? All unsaved changes will be lost.')){
			//route back home
		} else{
			return false;
		}
		// add else statement to stay on the page


	},
	'click .removeMe':function(event,template){
		event.preventDefault();
		if(confirm('Are you sure you want to delete? This cannot be reversed.')){
			Tickets.remove(this._id)
			// Need to add routing back to home
		} else{
			return false;
		}
	}

});