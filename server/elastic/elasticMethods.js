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
    'searchElastic': function (theTerm) {

        var elasticsearch = Npm.require('elasticsearch');

        connectionString = 'https://site:91460979a91648185b808a5059cd13e3@bifur-eu-west-1.searchly.com';

        var client = new elasticsearch.Client({
            host: connectionString
        });

        theSearch = client.search({
            index: 'labdocs',
            type: 'document',
            //"more_like_this" : {
            //    "fields" : ["title", "body"],
            //    "like" : theTerm,
            //    "min_term_freq" : 1,
            //    "max_query_terms" : 12
            //},
            q: theTerm
        }).then(function (resp) {
            return resp
        }, function (err) {
            console.log(err.message);
        });

        return theSearch
    },
     'homeElastic': function (theTerm) {

         var theLatest = Tickets.find({},{sort:{date:-1}}).fetch()
         var results = {hits:{hits:[]}};
         _.each(theLatest,function(dirtyResult){
             var convertedResult = {};
             convertedResult._source = {};
             convertedResult._source._id = dirtyResult._id;
             convertedResult._source.ticketId = dirtyResult._id;
             convertedResult._source.batchMeta = dirtyResult;
             results.hits.hits.push(convertedResult);
         })

         return results
     },
})