const password = document.getElementById('password');
const username = document.getElementById('username');
const form = document.getElementById('form');
const errorElem = document.getElementById('error');
form.addEventListener("submit", (e) => {
    let messages = [];
    if(username.value.trim() === '' || username.value === null){
        messages.push('Username cannot be empty!');
    }
    if(password.value.trim() === '' || password.value === null){
        messages.push('Password cannot be empty!');
    }
    if(password.value.trim() !== '' && password.value.length <= 6){
        messages.push('Password cannot be shorter than 6 characters!');    
    }
    if(password.value.length >= 20){
        messages.push('Password cannot be longer than 20 characters!');    
    }
    if(password.value.trim() === 'password'){
        messages.push('Password cannot be password');
    }
    if(messages.length > 0){
        e.preventDefault();
        errorElem.innerText = messages.join(', ')
    } else {
        alert('Valid Submit!!!');
    }
});