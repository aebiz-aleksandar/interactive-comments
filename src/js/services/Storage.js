    // Class: Storage
    class Storage {
        getDataFromStore() {
            let items = localStorage.getItem('comments');
            items = JSON.parse(items);

            return items;
        }
        addDataToStore(comments) {
            localStorage.setItem('comments', JSON.stringify(comments));
        }
    }

    export default Storage;