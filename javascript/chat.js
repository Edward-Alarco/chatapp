const form = document.querySelector('.typing-area'),
inputField = form.querySelector('.input-field')
sendBtn = form.querySelector('button'),
chatBox = document.querySelector('.chat-box');

form.onsubmit = (e)=> {e.preventDefault();}

sendBtn.onclick = ()=> {
    let xhr = new XMLHttpRequest()
    xhr.open("POST", "php/insert-chat.php", true)
    xhr.onload = ()=> {
        if(xhr.readyState===XMLHttpRequest.DONE){
            if(xhr.status===200){
                inputField.value = '';//se envia el mensaje y se limpia el input del chat
                if(!chatBox.classList.contains('active')){
                    scrollToBottom()
                }
            }
        }
    }

    //enviar data por ajax al php
    let formData = new FormData(form)
    xhr.send(formData)
}

chatBox.onmouseenter = ()=> {
    chatBox.classList.add('active')
}
chatBox.onmouseleave = ()=> {
    chatBox.classList.remove('active')
}


setInterval(()=>{
    let xhr = new XMLHttpRequest();
    xhr.open("POST", "php/get-chat.php", true);
    xhr.onload = ()=> {
        if(xhr.readyState === XMLHttpRequest.DONE){
            if(xhr.status === 200){
                let data = xhr.response;
                chatBox.innerHTML = data;
                if(!chatBox.classList.contains('active')){
                    scrollToBottom()
                }
            }
        }
    }
    let formData = new FormData(form)
    xhr.send(formData);
},500); //se repetira cada 500ms 


function scrollToBottom(){
    chatBox.scrollTop = chatBox.scrollHeight;
}