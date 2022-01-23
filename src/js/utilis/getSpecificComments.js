    //Function: Get Specific Comment
    function getSpecificComment(comments, id) {
        let specificComment;
        comments.forEach(comment => {
            if (comment.id == id) {
                specificComment =  comment;
            }
            if (comment.replies.length > 0) {
                comment.replies.forEach(commentReply => {
                    if (commentReply.id == id) {
                        specificComment = commentReply;
                    }
                });
            }
        });
        return specificComment;
    }

    export default getSpecificComment;