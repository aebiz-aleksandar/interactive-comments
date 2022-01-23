    //Function: Remove Comment Area
    function removeCommentArea() {
        const commentAddReplyEl = document.querySelector('.comment-add-reply');
        if (commentAddReplyEl) {
            commentAddReplyEl.parentNode.removeChild(commentAddReplyEl);
        }
    }
    export default removeCommentArea;