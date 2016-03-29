FlowRouter.route('/upload', {
    // do some action for this route
    action: function(params, queryParams) {
        console.log("Params:", params);
        console.log("Query Params:", queryParams);
        BlazeLayout.render('globalLayout', {
            top: "uploadForm"
        });
    },
});
FlowRouter.route('/', {
    // do some action for this route
    action: function(params, queryParams) {
        console.log("Params:", params);
        console.log("Query Params:", queryParams);
        BlazeLayout.render('globalLayout', {
            top: "homePage"
        });
    },
});


FlowRouter.route('/files', {
    // do some action for this route
    action: function(params, queryParams) {
        console.log("Params:", params);
        console.log("Query Params:", queryParams);
        BlazeLayout.render('globalLayout', {
            main:"batchList"
        });
    },
});

FlowRouter.route('/edit/batch/:ticketId', {
    // do some action for this route
    action: function(params, queryParams) {
        console.log("Params:", params);
        console.log("Query Params:", queryParams);
        Session.set('params',params)
        BlazeLayout.render('globalLayout', {
            main: "batchLanding"
        });
    },
});
