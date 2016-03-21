Template.ticketLanding.helpers({
	"tickets": function(){
		return Session.get('params').ticketId 
		// console.log(this._id)
	}
});