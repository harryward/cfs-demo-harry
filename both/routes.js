FlowRouter.route('/upload', {
    // do some action for this route
    action: function(params, queryParams) {
        console.log("Params:", params);
        console.log("Query Params:", queryParams);
        BlazeLayout.render('globalLayout', {
            top: "uploadForm"
            //main: "mikeTpl"
        });
    }
});

FlowRouter.route('/settings', {
    // do some action for this route
    action: function(params, queryParams) {
        console.log("Params:", params);
        console.log("Query Params:", queryParams);

        BlazeLayout.render('globalLayout', {
            top: "settings"
        });
    }
});

FlowRouter.route('/', {
    // do some action for this route
    action: function(params, queryParams) {
        console.log("Params:", params);
        console.log("Query Params:", queryParams);
        BlazeLayout.render('globalLayout', {
            top: "folderList"
        });
    }
});


FlowRouter.route('/search', {
    // do some action for this route
    action: function(params, queryParams) {
        console.log("Params:", params);
        console.log("Query Params:", queryParams);
        BlazeLayout.render('globalLayout', {
            main:"folderList"
        });
    }
});

FlowRouter.route('/edit/folder/:ticketId', {
    // do some action for this route
    action: function(params, queryParams) {
        console.log("Params:", params);
        console.log("Query Params:", queryParams);
        Session.set('params',params);
        BlazeLayout.render('globalLayout', {
            main: "folderLanding"
        });
    }
});
