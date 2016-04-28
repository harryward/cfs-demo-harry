if (Meteor.isServer) {


    var elasticsearch = Npm.require('elasticsearch');

    connectionString = 'https://site:91460979a91648185b808a5059cd13e3@bifur-eu-west-1.searchly.com';

    //console.log(connectionString)

    var client = new elasticsearch.Client({
        host: connectionString
    });

    //CREATE A NEW ELASTIC SEARCH BUCKET
    //client.indices.create({
    //    index: 'tickets',
    //}, function (error, response) {
    //    console.log(response);
    //})

    //
    ////client.index({
    ////    index: 'sample',
    ////    type: 'document',
    ////    id: '133',
    ////    body: {
    ////        name: 'Reliability',
    ////        text: 'Reliability is improved if multiple redundant sites are used, which makes well-designed cloud
    //// computing suitable for business continuity.' } }, function (error, response) { console.log(response); });
    //
    //client.search({
    //    index: 'sample',
    //    type: 'document',
    //    body: {
    //        query: {
    //            match: {
    //                text: "Reliability"
    //            }
    //        }
    //    }
    //}).then(function (resp) {
    //    console.log('search resp', EJSON.stringify(resp.hits, {indent: true}));
    //}, function (err) {
    //    console.log(err.message);
    //});

    Meteor.methods({
///
    });
}