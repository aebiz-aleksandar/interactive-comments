    //Function: Insert After
    function insertAfter(container, refEl, targetEl) {
        const siblingEl = refEl.nextElementSibling;
        if (siblingEl) {
            container.insertBefore(targetEl, siblingEl);
        } else {
            container.appendChild(targetEl);
        }
    }

    export default insertAfter;