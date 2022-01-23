    import commentsObj from '../services/setupAPP';
    
    //Function: Edit Specific Comment
    function editSpecificComment(comments, id, value) {
        comments.forEach((comment, index) => {
            if (comment.id == id) {
                commentsObj.comments[index].content = value;
            } else {
                if (comment.replies && comment.replies.length > 0) {
                    comment.replies.forEach((commentReply, indexReply) => {
                        if (commentReply.id == id) {
                            commentsObj.comments[index].replies[indexReply].content = value;
                        }
                    });
                }
            }
        });
    }

    export default editSpecificComment;