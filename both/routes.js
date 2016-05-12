FlowRouter.route('/upload', {
    // do some action for this route
    action: function(params, queryParams) {
        Session.set('showCreateFolder',false);
        Session.set('mainClass', 'upload');
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
        Session.set('showCreateFolder',true);
        Session.set('mainClass', 'settings');
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
        Session.set('showCreateFolder',true);
        Session.set('mainClass', 'home');
        console.log("Params:", params);
        console.log("Query Params:", queryParams);
        BlazeLayout.render('globalLayout', {
            main: "folderList"
        });
    }
});


FlowRouter.route('/search', {
    // do some action for this route
    action: function(params, queryParams) {
        Session.set('showCreateFolder',true);
        Session.set('mainClass', 'search');
        console.log("Params:", params);
        console.log("Query Params:", queryParams);
        BlazeLayout.render('globalLayout', {
            main:"folderList"
        });
    }
});

FlowRouter.route('/folder/:ticketId', {
    // do some action for this route
    action: function(params, queryParams) {
        Session.set('showCreateFolder',true);
        Session.set('mainClass', 'folder');
        console.log("Params:", params);
        console.log("Query Params:", queryParams);
        Session.set('params',params);
        BlazeLayout.render('globalLayout', {
            main: "folderLanding"
        });
    }
});

FlowRouter.route('/edit/folder/:ticketId', {
    // do some action for this route
    action: function(params, queryParams) {
        Session.set('showCreateFolder',true);
        Session.set('mainClass', 'edit');
        console.log("Params:", params);
        console.log("Query Params:", queryParams);
        Session.set('params',params);
        BlazeLayout.render('globalLayout', {
            main: "uploadForm"
        });
    }
});
