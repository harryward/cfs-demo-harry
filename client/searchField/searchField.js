Template.searchField.helpers({
    'autoComp': function () {
        return autoComplete.find({}, {$sort: {'term': 1}}).fetch()
    },
    'searchQuery': function () {
        return Session.get('searchQuery');
    },
});

Template.searchField.events({
});

Template.searchField.onCreated(function () {
    Session.set('skip', parseInt('0'));
    Session.set('page', parseInt('1'));
    Session.set('autoSendSearch', false);
    Session.set('keyUpSearch', false);

    Deps.autorun(function () {
        Meteor.subscribe('aComplete', Session.get('aQuery'))
    })


});

Template.searchField.onRendered(function () {
    //put a thing here
});

/*
Template.searchField.onRendered(function () {
    Session.set('aQuery', '');
    Session.set('searchQuickSubmit', true);

    $('#aq').selectize({
        sortField: 'term',
        searchField: ['term'],
        valueField: 'term',
        labelField: 'term',
        onItemAdd: function (value, $item) { //called second
            var item = this.getItem(value)[0].innerHTML;
            console.log("Add item "+item);
            Session.set('searchQuickSubmit', false);
            //Session.set('aQuery', '');
            //delete Session.keys.aQuery;
            //this.clear();
            //this.clearOptions();
        },
        onChange: function(passed){ //term added to the list //called third
            //testing reload
            console.log('onChange passed '+passed);
        },
        options: [],
        onKeyDown: function(z){ //onType
            console.log("caretPos = "+JSON.stringify(this.caretPos) );
            console.log("$activeOption = "+JSON.stringify(this.$activeOption) );
            console.log("$activeItems = "+JSON.stringify(this.$activeItems) );
            console.log("onKeyDown called z.keyCode="+z.keyCode);
        },
        persist: false,
        maxItems:22,
        create: function(input) {//called first //creates a new tag not on the list of autocomplete suggestions
            console.log("create "+input);
            Session.set('aQuery', '');
            Session.get('searchQuickSubmit');
            //return { term:input };
            if ( Session.get('searchQuickSubmit') && input.indexOf(" ") > -1 ) {
                FlowRouter.go('/search');
            } else {
                return { term:input };
            }
        },
        load: function (query, callback) { //
            console.log('LOAD query', query);
            Session.set('aQuery', query);
            if (query.length > 1 && query != "") {
                callback(autoComplete.find().fetch());
            } else {
                console.log('no query');
                callback({})
            }
        }

    });
});
*/
Template.searchField.onDestroyed(function () {
    //add your statement here
});

