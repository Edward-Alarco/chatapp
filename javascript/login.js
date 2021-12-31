const form = document.querySelector('.login form'),
continueBtn = form.querySelector('.button input'),
error = form.querySelector('.error-txt')

form.onsubmit  = (e)=> {
    e.preventDefault();
}
continueBtn.onclick = ()=> {
    let xhr = new XMLHttpRequest()
    xhr.open("POST", "php/login.php", true)
    xhr.onload = ()=> {
        if(xhr.readyState===XMLHttpRequest.DONE){
            if(xhr.status===200){
                let data = xhr.response;
                if(data=="gg"){
                    location.href = 'users.php';
                }else{
                    error.textContent = data
                    error.style.display = 'block'
                }
            }
        }
    }

    //enviar data por ajax al php
    let formData = new FormData(form)
    xhr.send(formData)
}