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
