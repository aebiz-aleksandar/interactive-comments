    // import modules
    import Storage from './Storage';
    import commentsObj from './setupAPP';
    //import data from data.json
    import data from '/data.json';
    
    // Function: Get Data
    function getData() {
        const storageIns = new Storage();

        if (storageIns.getDataFromStore()) {
            const storeData = storageIns.getDataFromStore();
            commentsObj.currentUser = storeData.currentUser;
            commentsObj.comments = storeData.comments;
        } else {
            commentsObj.currentUser = data.currentUser;
            commentsObj.comments = data.comments;
            // add data to store
            storageIns.addDataToStore(commentsObj);
        }
    }

    export default getData;