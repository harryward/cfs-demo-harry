Docs = new FS.Collection("docs", {
    stores: [new FS.Store.FileSystem("docs", {path: "~/uploads"})]
});