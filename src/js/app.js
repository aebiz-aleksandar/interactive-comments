    // import style.scss
    import '../scss/style.scss';
    //import modules
    import getData from './services/getData';
    import Comments from './components/Comments';
    import CommentsAction from './components/CommentsAction';


    //Event: Comments Action
    document.querySelector('.comments-container').addEventListener('click', e => {
        const element = e.target;
        new CommentsAction().getCommentsAction(element);
    });

    // Event: DOM Content Loaded
    document.addEventListener('DOMContentLoaded', () => {
        //get data from Rest API or Local Storage
        getData();
        //after get data show them in DOM
        new Comments().addCommentTemplate();
        //add comment area
        new Comments().addCommentArea();
    });