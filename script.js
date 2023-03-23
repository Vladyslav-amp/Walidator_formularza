const username = document.querySelector('#username')
const pass = document.querySelector('#password')
const pass2 = document.querySelector('#password2')
const email = document.querySelector('#email')
const sendBtn = document.querySelector('.send')
const clearBtn = document.querySelector('.clear')
const popup = document.querySelector('.popup')


//Funkcje

const showError = (input, msg) => {
    //argument INPUT przechowuje nasze INPUTY
    //argument MSG przechowuje placeholder

    const formBox = input.parentElement; //odwolujemy sie do rodzica INPUTa
    const errorMsg = formBox.querySelector('.error_text');//szukamy w rodzicu nasza klase error_text

    formBox.classList.add('error'); //dodajemy do naszego rodzica klase error ktora dodaje sie dynamicznie
    errorMsg.textContent = msg; //Dodajemy naszego placeholder(msg) do naszego errora
}

const clearError = (input) => {
    const formBox = input.parentElement;
    formBox.classList.remove('error')
}

const checkForm = input => {
    input.forEach(el => {
        if(el.value === ''){
            showError(el, el.placeholder)
        } else {
            clearError(el)
        }
    })

    //argument INPUT(nazwa dowolna) z fn 'checkForm' przechowuje tablice z naszymi inputami(username,pass,pass2,email)
    //argument EL odnosi sie do kazdej zmiennej, którą umiescilismy w tablicy(najpierw username, dalej pass, dalej pass2 i na koniec email)

}

const checkLenght = (input, min) => {
    //sprawdza dlugosc tekstu
    //input.previosElementSibling - odwolujemy sie do poprzedniego brata input czyli do label
    //za pomoca slice wycinamy ostatni element na stringu czyli ':'
    if(input.value.length < min){
        showError(input, `${input.previousElementSibling.innerText.slice(0,-1)} jest za krotkie min ${min} znakow`)
    }
}

const checkPassword = (pass1, pass2) => {
    if(pass1.value !== pass2.value){
        showError(pass2, 'Hasła nie identyczne')
    }
}

const checkEmail = (email) => {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

    if(re.test(email.value)){ //.test - wykonuje poszukiwanie lancucha znaków pomiedzy wyrazeniem regularnym(re) i okreslonym wzorcem(email)
        clearError(email)
    } else {
        showError(email, 'E-mail jest niepoprawny')
    }
}

const checkErrors = () => {
    const allInput = document.querySelectorAll('.form_box')
    let errorCount = 0

    allInput.forEach(el => {
        if(el.classList.contains('error')){
            errorCount++;
        }
    })

    if(errorCount === 0){
        popup.classList.add('show_popup')
    }
}

//Listenery
sendBtn.addEventListener('click', e => {
    e.preventDefault();
    checkForm([username,pass,pass2,email])
    checkLenght(username, 3)
    checkLenght(pass, 8)
    checkPassword(pass, pass2)
    checkEmail(email)
    checkErrors()
})
clearBtn.addEventListener('click', e => {
    e.preventDefault();

    //przy klikaniu na przycisk clear my zadajemy naszemu input pusty string ''
    [username,pass,pass2,email].forEach(el => {
        el.value = ''
        clearError(el) //czyszczymy po nacisku 'wyczysc' error-y
    })

    //stary sposob ktory korzystamy rzadko
    // username.value = ''
    // pass.value = ''
    // pass2.value = ''
    // email.value = ''
})
