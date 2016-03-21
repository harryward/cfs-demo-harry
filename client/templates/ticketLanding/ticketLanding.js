Template.ticketLanding.helpers({
	"tickets": function(){
		return Session.get('params').this._id
		// console.log(this._id)
	}
});