const username = document.querySelector('#username');
const password = document.querySelector('#password');
const password2 = document.querySelector('#password2');
const email = document.querySelector('#email');
const sendBtn = document.querySelector('.send');
const clearBtn = document.querySelector('.clear');
const popup = document.querySelector('.popup');

const showError = (input, msg) => {
    const formBox = input.parentElement;
    const errorMsg = formBox.querySelector('.error-text');

    formBox.classList.add('error');
    errorMsg.textContent = msg;

}

const clearError = input => {
    const formBox = input.parentElement;
    formBox.classList.remove('error');
} 

const checkForm = input => {
    input.forEach (el => {
        if(el.value === '') {
            showError(el, el.placeholder)
        } else {
            clearError(el)
        }
    })
}

const checkLength = (input, min) => {
    if(input.value.length < min) {
        showError(input, `${input.previousElementSibling.innerText.slice(0,-1)} składa się z min. ${min} znaków.`);
    }
}

const checkPassword = (password, ppassword2) => {
    if(password.value !== password2.value) {
        showError(password2, 'Hasła do siebie nie pasują')
    } 

}

const checkMail = email => {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;        

    if (re.test(email.value)) {
        clearError(email)
    } else {
        showError(email, 'E-mail jest niepoprawny')
    }

};

const checkErrors = () => {
    const formBoxAll = document.querySelectorAll('.form-box');
    let errorCount = 0;

    formBoxAll.forEach(el => {
        if(el.classList.contains('error')) {
            errorCount++;
        }
    })
    if(errorCount === 0){
        popup.classList.add('show-popup');
    }

}


sendBtn.addEventListener('click', e => {
    e.preventDefault();
    
    checkForm([username, password, password2, email]);
    checkLength(username, 3);
    checkLength(password, 8);
    checkPassword(password, password2);
    checkMail(email);
    checkErrors();

})

clearBtn.addEventListener('click', (e) => {
    e.preventDefault();

    [username, password, password2, email].forEach(el => {
        el.value = '';
        clearError(el);
    })
})
