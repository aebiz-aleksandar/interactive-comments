    // import modules
    import commentsObj from '../services/setupAPP';
    import importImages from '../services/importImages';
    import insertComment from '../utilis/insertComment';
    
    // Class: Comments
    class Comments {
        constructor() {
            this.commentsContainer = document.querySelector('.comments-container');
        }
        //add comment template
        addCommentTemplate() {
            commentsObj.comments.forEach(comment => {
                const userTemplate = comment.user.username === commentsObj.currentUser.username ?
                true : false;
                const commentEl = document.createElement('div');
                //add class to comment el
                commentEl.classList.add('comment');
                //add comment id on each comment
                commentEl.setAttribute('data-id', comment.id);
                //check if user comment
                if (userTemplate) commentEl.classList.add('comment-you');
                //fill comment el with template
                commentEl.innerHTML = this.createCommentTemplate(comment, userTemplate, false);
                //add whole el to DOM
                this.commentsContainer.appendChild(commentEl);
                //check if current comment have replies
                if (comment.replies && comment.replies.length > 0) {
                    //create container for replies comments
                    const repliesContainer = document.createElement('div');
                    //add class to replies container
                    repliesContainer.classList.add('comment-sub');
                    comment.replies.forEach(reply => {
                        const userReply = reply.user.username === commentsObj.currentUser.username ?
                        true : false;
                        const replyCommentEl = document.createElement('div');
                        // add class to reply comment el
                        replyCommentEl.classList.add('comment');
                        if (userReply) replyCommentEl.classList.add('comment-you');
                        //add comment id on each comment
                        replyCommentEl.setAttribute('data-id', reply.id);
                        //add comment reply id on each comment
                        replyCommentEl.setAttribute('data-reply-id', comment.id);
                        replyCommentEl.innerHTML = this.createCommentTemplate(reply, userReply, true);
                        //fill comment to reply container
                        repliesContainer.appendChild(replyCommentEl);
                    });
                    //add whole replies container to DOM
                    this.commentsContainer.appendChild(repliesContainer);
                }
            });
        }
        // add comment area
        addCommentArea(replyComment) {
            const commentAreaEl = document.createElement('div');
            commentAreaEl.classList.add('comment-add');
            if (replyComment) {
                const replyTo = replyComment.querySelector('.user-name').textContent;
                const replyParent = replyComment.parentElement;
                const replySibling = replyComment.nextElementSibling;
                commentAreaEl.classList.add('comment-add-reply');
                commentAreaEl.innerHTML = this.createCommentArea(replyTo);
                insertComment(replyParent, replySibling, commentAreaEl);
            } else {
                commentAreaEl.innerHTML = this.createCommentArea();
                this.commentsContainer.appendChild(commentAreaEl);
            }
        }
        // create comment template
        createCommentTemplate(comment, userTemplate, hasReply) {
            const userImage = userTemplate ? 
            commentsObj.currentUser.image.png : comment.user.image.png;
            const allImages = importImages();

            return `<div class="comment-head">
                <div class="comment-user">
                    <div class="user-image">
                        <img src="${ allImages[userImage] }" alt="user-avatar">
                    </div>
                    <h3 class="user-name">${ comment.user.username }</h3>
                    ${ userTemplate ? `<div class="comment-badge">you</div>` : '' }
                </div>
                <div class="comment-period">
                    ${ this.definePeriod(comment.createdAt) }
                </div>
            </div>
            <div class="comment-content">
                <p>${ hasReply ? `<span class="mention">@${ comment.replyingTo }</span> ` : '' }${ comment.content }</p>
            </div>
            <div class="comment-set">
                <div class="comment-score">
                    <span class="score-inc">
                        <svg width="11" height="11" xmlns="http://www.w3.org/2000/svg"><path d="M6.33 10.896c.137 0 .255-.05.354-.149.1-.1.149-.217.149-.354V7.004h3.315c.136 0 .254-.05.354-.149.099-.1.148-.217.148-.354V5.272a.483.483 0 0 0-.148-.354.483.483 0 0 0-.354-.149H6.833V1.4a.483.483 0 0 0-.149-.354.483.483 0 0 0-.354-.149H4.915a.483.483 0 0 0-.354.149c-.1.1-.149.217-.149.354v3.37H1.08a.483.483 0 0 0-.354.15c-.1.099-.149.217-.149.353v1.23c0 .136.05.254.149.353.1.1.217.149.354.149h3.333v3.39c0 .136.05.254.15.353.098.1.216.149.353.149H6.33Z" fill="#C5C6EF"/></svg>
                    </span>
                    <span class="score-value">${ comment.score }</span>
                    <span class="score-dec">
                        <svg width="11" height="3" xmlns="http://www.w3.org/2000/svg"><path d="M9.256 2.66c.204 0 .38-.056.53-.167.148-.11.222-.243.222-.396V.722c0-.152-.074-.284-.223-.395a.859.859 0 0 0-.53-.167H.76a.859.859 0 0 0-.53.167C.083.437.009.57.009.722v1.375c0 .153.074.285.223.396a.859.859 0 0 0 .53.167h8.495Z" fill="#C5C6EF"/></svg>
                    </span>
                </div>
                ${ userTemplate ?
                `<div class="comment-manage">
                    <button class="comment-delete">
                        <svg width="12" height="14" xmlns="http://www.w3.org/2000/svg"><path d="M1.167 12.448c0 .854.7 1.552 1.555 1.552h6.222c.856 0 1.556-.698 1.556-1.552V3.5H1.167v8.948Zm10.5-11.281H8.75L7.773 0h-3.88l-.976 1.167H0v1.166h11.667V1.167Z" fill="#ED6368"/></svg>
                        Delete
                    </button>
                    <button class="comment-edit">
                        <svg width="14" height="14" xmlns="http://www.w3.org/2000/svg"><path d="M13.479 2.872 11.08.474a1.75 1.75 0 0 0-2.327-.06L.879 8.287a1.75 1.75 0 0 0-.5 1.06l-.375 3.648a.875.875 0 0 0 .875.954h.078l3.65-.333c.399-.04.773-.216 1.058-.499l7.875-7.875a1.68 1.68 0 0 0-.061-2.371Zm-2.975 2.923L8.159 3.449 9.865 1.7l2.389 2.39-1.75 1.706Z" fill="#5357B6"/></svg>
                        Edit
                    </button>
                </div>` 
                : 
                `<button type="button" class="comment-reply">
                    <svg width="14" height="13" xmlns="http://www.w3.org/2000/svg"><path d="M.227 4.316 5.04.16a.657.657 0 0 1 1.085.497v2.189c4.392.05 7.875.93 7.875 5.093 0 1.68-1.082 3.344-2.279 4.214-.373.272-.905-.07-.767-.51 1.24-3.964-.588-5.017-4.829-5.078v2.404c0 .566-.664.86-1.085.496L.227 5.31a.657.657 0 0 1 0-.993Z" fill="#5357B6"/></svg>
                    Reply
                </button>` }
            </div>`;
        }
        // create comment area
        createCommentArea(replyTo) {
            const allImages = importImages();
            const userImage = commentsObj.currentUser.image.png;
            return `<div class="comment-add-content">
                ${ replyTo ? 
                    `<textarea data-replyto="${ replyTo }" placeholder="@${ replyTo }"></textarea>`
                    :
                    `<textarea placeholder="Add a comment..."></textarea>`
                }
            </div>
            <div class="comment-add-set">
                <div class="user-image">
                    <img src="${ allImages[userImage] }" alt="user-avatar">
                </div>
                <button class="comment-add-btn btn">
                    ${ replyTo ? 'Reply' : 'Send' }
                </button>
            </div>`;
        }
        //define period
        definePeriod(period) {
            const postedTime = new Date(period).getTime();
            const currentTime = new Date().getTime();
            const targetTime = currentTime - postedTime;
            const minute = 60 * 1000;
            const hour = 60 * 60 * 1000;
            const day = 24 * 60 * 60 * 1000;
            const month = 30 * 24 * 60 * 60 * 1000;

            if (targetTime < minute) {
                return 'a few moments ago';
            }
            else if (targetTime > minute && targetTime < hour) {
                return (targetTime / minute).toFixed(0) + ' min ago';
            } else if (targetTime > hour && targetTime < day) {
                return (targetTime / hour).toFixed(0) + ' hours ago';
            } else if (targetTime > day && targetTime < month) {
                return (targetTime / day).toFixed(0) + ' day ago';
            } else if (targetTime > month) {
                return (targetTime / month).toFixed(0) + ' month ago';
            }

        }
    }

    export default Comments;