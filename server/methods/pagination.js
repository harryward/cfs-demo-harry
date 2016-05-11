Meteor.methods({
    'makePagination': function (args) {
        //args = {total_item_ct:22, page_item_limit:RESULTS_PAGE_LIMIT, requested_page_num:1};
        //returns pages = [{name:1, nav:1, class:''}, {name:2 + "", nav:2, class: ''}];
        var pages = [];

        var total_item_ct = args.total_item_ct;
        var page_item_limit = args.page_item_limit;
        var requested_page_num = ( args.requested_page_num < 1 ) ? 1 : args.requested_page_num;
        // var show_extra = 2; //number of page links to show on either side of selected page
        var pageloop = 1; //counter
        var total_pages =  Math.ceil(total_item_ct / page_item_limit)
        requested_page_num = ( requested_page_num > total_pages ) ? total_pages : requested_page_num;
        var pre = ["first", "back"];
        var aft = ["next", "last"];
        if (total_pages > 1) {
            _.each(pre,function(p){
                var pclass = (requested_page_num == 1) ? "disabled":"";
                var backpage = (requested_page_num == 1) ? 1 : (requested_page_num - 1);
                var pnav = (p === "first") ? 1 : backpage;
                pages.push({name: p + "", nav:pnav+"", class: pclass});
            });
            while ( pageloop <=  total_pages) {
                console.log("requested_page_num:"+requested_page_num+" RESULTS_PAGE_LIMIT " + RESULTS_PAGE_LIMIT + " :: total_item_ct " + total_item_ct + " ::  total_pages " + total_pages);
                var liclass = (requested_page_num == pageloop) ? "active" : "";
                pages.push({name: pageloop+"", nav:pageloop+"", class: liclass});
                pageloop++;
            }
            _.each(aft,function(a){
                var aclass = (requested_page_num == total_pages) ? "disabled":"";
                var nextpage = (requested_page_num == total_pages) ? total_pages : ((requested_page_num - 0) +1);
                var anav = (a === "last") ? total_pages : nextpage;
                pages.push({name: a + "", nav:anav+"", class: aclass});
            });
        }
        return pages;
    }
})

