    import commentsObj from '../services/setupAPP';

    //Function: Delete Specifi Comment
    function deleteSpecificComment(comments, id) {
        comments.forEach((comment, index) => {
            if (comment.id == id) {
                commentsObj.comments.splice(index, 1);
            } else if (comment.replies && comment.replies.length > 0) {
                comment.replies.forEach((commentReply, indexReply) => {
                    if (commentReply.id == id) {
                        commentsObj.comments[index].replies.splice(indexReply, 1);
                    }
                });
            }
        });
    }

    export default deleteSpecificComment;