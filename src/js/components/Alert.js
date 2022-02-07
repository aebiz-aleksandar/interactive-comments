    //Function: Show Alert
    function showAlert(message, action) {
        const alertEl = document.createElement('div');
        //add the class via action
        alertEl.classList.add('alert', `alert-${ action }`);
        //add the content to alert el
        alertEl.appendChild(document.createTextNode(message));
        //add alert el to body element
        document.querySelector('body').appendChild(alertEl);
        //display alert from left side
        setTimeout(() => alertEl.classList.add('alert-show'), 0);
        //remove alert after 2sec
        setTimeout(() => {
            alertEl.classList.remove('alert-show');
            setTimeout(() => alertEl.parentNode.removeChild(alertEl), 500);
        }, 2000) 
    }

    export default showAlert;