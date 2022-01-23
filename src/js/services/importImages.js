    //Function: Import Images
    function importImages() {
        const imagesContext = require.context('/src/images/avatars', true, /\.(svg|png|jpe?g)$/i);
        const allImages = {};

        imagesContext.keys().forEach(item => {
            allImages[item.replace('./', '')] = imagesContext(item);
        });

        return allImages;
    }

    export default importImages;