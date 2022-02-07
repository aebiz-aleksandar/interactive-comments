    //import modules
    import commentsObj from '../services/setupAPP';
    import Comments from './Comments';
    import Storage from '../services/Storage';
    import getSpecificComment from '../utilis/getSpecificComments';
    import removeCommentArea from '../utilis/removeCommentArea';
    import deleteSpecificComment from '../utilis/deleteSpecificComment';
    import editSpecificComment from '../utilis/editSpecificComment';
    import showAlert from '../components/Alert';

    // Comments Action
    class CommentsAction {
        constructor() {
            this.commentsContainer = document.querySelector('.comments-container');
        }
        //get comments action
        getCommentsAction(element) {
            //Event: check if click element equal element which allow add reply area
            if (element.classList.contains('comment-reply')) {
                //add reply area
                const commentEl = element.closest('.comment');
                //remove previous added comment reply area
                removeCommentArea();
                new Comments().addCommentArea(commentEl);
            }
            //Event: check if click element equal element with value 'Send' or 'Reply' to add new comment
            else if (element.classList.contains('comment-add-btn')) {
                const commentAreaEl = element.closest('.comment-add');
                const textareaEl = commentAreaEl.querySelector('textarea');
                const textareaValue = textareaEl.value;
                const clickElementValue = element.textContent.trim();
                const commentId = new Date().getTime();
                const commentScore = 0;
                //check if textarea value empty
                if (textareaValue === '') {
                    // show alert for error
                    showAlert('Comment input can\'t be empty!', 'error');
                } else {
                    //if click element equal 'Send'
                    if (clickElementValue === 'Send') {
                        //create new comment object
                        const commentObj = {
                            id: commentId,
                            content: textareaValue,
                            createdAt: new Date(),
                            score: commentScore,
                            user: {
                                image: {
                                    png: commentsObj.currentUser.image.png
                                },
                                username: commentsObj.currentUser.username
                            },
                            replies: []
                        };
                        //add this object to global comments object array
                        commentsObj.comments.push(commentObj);
                        //add global comments obj to local storage
                        new Storage().addDataToStore(commentsObj);
                        //add comment to DOM
                        const commentEl = document.createElement('div');
                        //add class to created element
                        commentEl.classList.add('comment', 'comment-you');
                        //add id to created element
                        commentEl.setAttribute('data-id', commentId);
                        commentEl.innerHTML = new Comments().createCommentTemplate(commentObj, true, false);
                        //append created comment to DOM
                        this.commentsContainer.insertBefore(commentEl, commentAreaEl);
                        //show alrert for successfully added comment
                        showAlert('Comment successfully added!', 'success');
                        //empty textarea value
                        textareaEl.value = '';
                    } else if (clickElementValue === 'Reply') {
                        const commentReplyEl = commentAreaEl.previousElementSibling;
                        const commentReplyElId = commentReplyEl.getAttribute('data-id');
                        const commentReplyTo = textareaEl.getAttribute('data-replyto');
                        const specificComment = getSpecificComment(commentsObj.comments, commentReplyElId);
                        //create new reply comment obj
                        const replyCommentObj = {
                            id: commentId,
                            content: textareaValue,
                            createdAt: new Date(),
                            score: commentScore,
                            replyingTo: commentReplyTo,
                            user: {
                                image: {
                                    png: commentsObj.currentUser.image.png
                                },
                                username: commentsObj.currentUser.username
                            }
                        };
                        //create DOM comment el
                        const commentEl = document.createElement('div');
                        //add class to comment
                        commentEl.classList.add('comment', 'comment-you');
                        //add id and reply id to create element
                        commentEl.setAttribute('data-id', commentId);
                        commentEl.setAttribute('data-reply-id', commentReplyElId);
                        commentEl.innerHTML = new Comments().createCommentTemplate(replyCommentObj, true, true);
                        //check out comment on which repled
                        if (specificComment.replies) {
                            if (specificComment.replies.length === 0) {
                            //if comment on which repled don't have sub comments
                                //add object to DOM
                                //create sub comment el
                                const subCommentEl = document.createElement('div');
                                //add class to sub comment el
                                subCommentEl.classList.add('comment-sub');
                                //add comment to sub comment container
                                subCommentEl.appendChild(commentEl);
                                this.commentsContainer.insertBefore(subCommentEl, commentAreaEl);
                            } else if (specificComment.replies.length > 0) {
                            //if comment on which repled have sub comment
                                const subCommentEl = commentAreaEl.nextElementSibling;
                                //add object to DOM
                                subCommentEl.appendChild(commentEl);
                            }
                            //add object to global object
                            specificComment.replies.push(replyCommentObj);
                        } else {
                        //if comment on which repled already located inside sub comment
                            const subCommentEl = commentReplyEl.parentElement;
                            //add object to global object
                            const commentReplyId = commentReplyEl.getAttribute('data-reply-id');
                            const specificReplyComment = getSpecificComment(commentsObj.comments, commentReplyId);
                            specificReplyComment.replies.push(replyCommentObj);
                            //add object to DOM
                            subCommentEl.appendChild(commentEl);
                        }
                        //add comments object to local storage
                        new Storage().addDataToStore(commentsObj);
                        //remove exsist comment area
                        removeCommentArea();
                        //show alrert for successfully added comment
                        showAlert('Comment successfully added!', 'success');
                    }
                }
            }
            //Event: check if click element equal element for delete comment
            else if (element.classList.contains('comment-delete')) {
                const deletePopup = document.createElement('div');
                //add class on created element
                deletePopup.classList.add('comment-delete-popup');
                deletePopup.innerHTML = `<div class="popup-holder">
                    <div class="holder-content">
                        <h2>Delete Comment</h2>
                        <p>Are you sure you want to delete this comment? This will remove the comment and can't be undone.</p>
                    </div>
                    <div class="holder-buttons">
                        <button class="btn btn-no">No, cancel</button>
                        <button class="btn btn-yes">Yes, delete</button>
                    </div>
                </div>`;
                document.querySelector('body').appendChild(deletePopup);

                const deleteBtn = deletePopup.querySelector('.btn-yes');
                const closeBtn = deletePopup.querySelector('.btn-no');
                
                //Event: Delete Comment
                deleteBtn.addEventListener('click', () => {
                    this.deleteComment(element);
                    deletePopup.parentNode.removeChild(deletePopup);
                    //show alrert for successfully removed comment
                    showAlert('Comment successfully removed!', 'success');
                });
                //Event: Close Delete Popup
                closeBtn.addEventListener('click', () => {
                    deletePopup.parentNode.removeChild(deletePopup);
                });

            }
            //Event: check if click element equal element for edit comment
            else if (element.classList.contains('comment-edit')) {
                this.editComment(element);
            }
            //Event: check if click element equal element for apply edit comment
            else if (element.classList.contains('comment-edit-btn')) {
                this.applyCommentEdit(element);
            }
            //Event: check if click element equal element for inc comment score
            else if (element.parentElement.classList.contains('score-inc') ||
                element.parentElement.parentElement.classList.contains('score-inc')) {
                const targetEl = element.closest('.comment');
                const targetElId = targetEl.getAttribute('data-id');
                const scoreValue = targetEl.querySelector('.score-value');
                const specificEl = getSpecificComment(commentsObj.comments, targetElId);
                //increment current score
                specificEl.score += 1;
                new Storage().addDataToStore(commentsObj);
                //edit DOM value
                scoreValue.textContent = specificEl.score;
            }

            //Event: check if click element equal element for dec comment score
            else if (element.parentElement.classList.contains('score-dec') || 
                element.parentElement.parentElement.classList.contains('score-dec')) {
                const targetEl = element.closest('.comment');
                const targetElId = targetEl.getAttribute('data-id');
                const scoreValue = targetEl.querySelector('.score-value');
                const specificEl = getSpecificComment(commentsObj.comments, targetElId);
                //decrament current score
                specificEl.score -= 1;
                if (specificEl.score < 0) specificEl.score = 0;
                new Storage().addDataToStore(commentsObj);
                //edit DOM value
                scoreValue.innerText = specificEl.score;
            }
        }
        //delete comment
        deleteComment(element) {
            const targetEl = element.closest('.comment');
            const targetElId = targetEl.getAttribute('data-id');
            const parentTargetEl = targetEl.parentElement;
            //delete comment from storage
            deleteSpecificComment(commentsObj.comments, targetElId);
            //update storage
            new Storage().addDataToStore(commentsObj);
            //delete comment from DOM
            if (parentTargetEl.classList.contains('comment-sub')) {
                const parentTargetElChilds = parentTargetEl.children;
                if (parentTargetElChilds.length === 1) {
                    parentTargetEl.parentNode.removeChild(parentTargetEl);
                } else {
                    targetEl.parentNode.removeChild(targetEl);
                }
            } else {
                targetEl.parentNode.removeChild(targetEl);
            }
        }
        //edit comment
        editComment(element) {
            const targetEl = element.closest('.comment');
            const targetElContent = targetEl.querySelector('.comment-content');
            const targetElContentMention = targetElContent.querySelector('.mention');
            const tarrgetElContentParagraph = targetElContent.querySelector('p');
            let targetElContentValue;
            if (targetElContentMention) {
                targetElContentValue = targetElContent.textContent.trim().slice(targetElContentMention.textContent.length +1);
            } else {
                targetElContentValue = targetElContent.textContent.trim();
            }
            const commentContent = document.createElement('div');
            commentContent.classList.add('comment-content-edit');
            commentContent.innerHTML = `<textarea ${ targetElContentMention ? `data-reply-to="${ targetElContentMention.textContent }"` : '' } class="comment-content-textarea">${ targetElContentValue }</textarea>
            <button class="comment-edit-btn btn">Update</button>`;
            targetElContent.replaceChild(commentContent, tarrgetElContentParagraph);
        }
        //apply edit comment
        applyCommentEdit(element) {
            const targetEl = element.closest('.comment');
            const targetElContent = targetEl.querySelector('.comment-content');
            const editTextareaEl = targetEl.querySelector('textarea');
            const targetElContentMention = editTextareaEl.getAttribute('data-reply-to');
            const targetElId = targetEl.getAttribute('data-id');

            if (editTextareaEl.value) {
                targetElContent.innerHTML = '';
                const editParagraph = document.createElement('p');
                if (targetElContentMention) {
                    editParagraph.innerHTML = `<span class="mention">${ targetElContentMention }</span> ${ editTextareaEl.value }`;
                } else {
                    editParagraph.innerText = editTextareaEl.value;
                }
                //add to DOM
                targetElContent.appendChild(editParagraph);
                //add to storage
                editSpecificComment(commentsObj.comments, targetElId, editTextareaEl.value);
                new Storage().addDataToStore(commentsObj);
                // show alert for successfully edited comment
                showAlert('Comment sucessfully edited!', 'success');
            } else {
                //show alrert for error
                showAlert('Comment input can\'t be empty!', 'error');
            }
        } 
    }

    export default CommentsAction;