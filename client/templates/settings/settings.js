Template.settings.helpers({
    'page': function () {
        return Session.get('page')
    }
});

Template.settings.events({
    'keyup #q':function(ev,template){
        console.log("keyup.which: "+ev.which);
        //after a space has been typed, send a query every other keystroke
        if (ev.which > 31 && ev.which < 123) {
            if (Session.get('autoSendSearch') && Session.get('keyUpSearch')) {
                submitSearch($('#q').val());
                Session.set('keyUpSearch', false);
            } else if (ev.which === 32) {
                Session.set('autoSendSearch', true);
                Session.set('keyUpSearch', false);
            } else if (Session.get('autoSendSearch')) {
                Session.set('keyUpSearch', true);
            }
        }
    },
    'submit .searchForm': function (event, template) {
        event.preventDefault();
        submitSearch( $('#q').val() );
    }
});

Template.settings.onCreated(function () {

});

Template.settings.onRendered(function () {
    //add your statement here
});

Template.settings.onDestroyed(function () {
    //add your statement here
});

