Meteor.methods({
    'makeZip':function(theFile){
        var zip = new JSZip();
        // Add content to Zip file
        zip.file('textfile.txt', 'Hello World');
        zip.file('folder/image.jpg', theFile);

        // Save to file on server
        var path = process.env["PWD"] + "/public/";
        zip.saveAs(path + "filename.zip");
        return path + "filename.zip"

    },
})