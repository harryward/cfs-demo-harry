 Meteor.methods({
    'addRecord': function (theBody, theId) {

        var elasticsearch = Npm.require('elasticsearch');

        connectionString = 'https://site:91460979a91648185b808a5059cd13e3@bifur-eu-west-1.searchly.com';

        var client = new elasticsearch.Client({
            host: connectionString
        });

       var theResp = client.index({
            index: 'labdocs',
            type: 'document',
            id: theId,
            body: theBody
        }, function (error, response) {
            return response
        });

        return theResp


    },
    'searchElastic': function (args) {
        console.log('searchElastic args ', args);
        //var theTerm = args.q;
        var elasticsearch = Npm.require('elasticsearch');

        connectionString = 'https://site:91460979a91648185b808a5059cd13e3@bifur-eu-west-1.searchly.com';

        var client = new elasticsearch.Client({
            host: connectionString
        });
        var searchParams = {
            index: 'labdocs',
            type: 'document',
            //"more_like_this" : {
            //    "fields" : ["title", "body"],
            //    "like" : theTerm,
            //    "min_term_freq" : 1,
            //    "max_query_terms" : 12
            //},
            body: {
                query: {
                    "query_string": args
                }
            }
        };

        theSearch = client.search(
            searchParams
        ).then(function (resp) {
            return resp
        }, function (err) {
            console.log(err.message);
        });

        return theSearch
    },
     'folderQuery': function (args) {
         console.log('folderQuery args ', args);
         var q = args.q;
         var f = args.f;
         var qObj = (q) ? {f:q} : {};
         var theLatest = Folders.find(qObj,{sort:{date:-1}}).fetch();
         var results = {hits:{total:theLatest.length, hits:[], f:f, q:q}};
         _.each(theLatest,function(dirtyResult){
             var convertedResult = {};
             convertedResult._source = {};
             convertedResult._source.flarg = "fwefw";
             convertedResult._source._id = dirtyResult._id;
             convertedResult._source.ticketId = dirtyResult._id;
             convertedResult._source.folderMeta = dirtyResult;
             results.hits.hits.push(convertedResult);
         })

         return results
     }

 })