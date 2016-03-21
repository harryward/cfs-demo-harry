Template.ticketLanding.helpers({
	"tickets": function(){
		return Tickets.find(Session.get('params').ticketId).fetch()

	}
});

Template.ticketLanding.events({
	'click .publishMe':function(event,template){
	// event.preventDefault();
	// alert('make this button go to a route that lets you edit the files, title and summary')
	},
	'click .cancelMe':function(event,template){
	// event.preventDefault();
	// alert('make this button go to a route that lets you edit the files, title and summary')
	},
	'click .removeMe':function(event,template){
		event.preventDefault();
		if(confirm('are you sure? this cannot be reversed')){
			Tickets.remove(this._id)
			// Need to add routing back to home
		}
	}

});