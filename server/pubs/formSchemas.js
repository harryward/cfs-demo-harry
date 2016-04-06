Meteor.publish('formSchem', function (formArgs) {
    return formSchemas.find(formArgs);
})