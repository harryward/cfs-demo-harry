Template.ticketLanding.helpers({
	"tickets": function(){
		return Tickets.find(Session.get('params').ticketId).fetch()

	}
});