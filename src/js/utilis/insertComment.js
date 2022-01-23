    //Function: Insert Comment
    function insertComment(container, beforeEl, currentEl) {
        if (beforeEl) {
            container.insertBefore(currentEl, beforeEl);
        } else {
            container.appendChild(currentEl);
        }
    }

    export default insertComment;