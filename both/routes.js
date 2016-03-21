FlowRouter.route('/', {
    // do some action for this route
    action: function(params, queryParams) {
        console.log("Params:", params);
        console.log("Query Params:", queryParams);
        BlazeLayout.render('globalLayout', {
            top: "uploadForm",
            main: "ticketList"
        });
    },
});

FlowRouter.route('/edit/ticket/:ticketId', {
    // do some action for this route
    action: function(params, queryParams) {
        console.log("Params:", params);
        console.log("Query Params:", queryParams);
        Session.set('params',params)
        BlazeLayout.render('globalLayout', {
            main: "ticketLanding"
        });
    },
});

