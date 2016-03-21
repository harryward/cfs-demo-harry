Template.ticketLanding.helpers({
	"tickets": function(){
		return Tickets.find(Session.get('params').ticketId).fetch()

	}
});

Template.ticketLanding.events({
	'click .removeMe':function(event,template){
		event.preventDefault();
		if(confirm('are you sure? this cannot be reversed')){
			Tickets.remove(this._id)
			// Need to add routing back to home
		}
	}

});