const formValues = {};  // Сюда пишутся значения формы (Object как в Java, или dict из Python)
const formValidation = {};  // Сюда пишутся статусы валидации каждого поля. Если поле ни разу не валидировалось,
// то при обращении к Object вернётся undefined, который при логическом сравнении обрабатывается как false

// Объявляется и инициализируется константная переменная
// Инициализация функцией, заданной в стрелочном виде
export const validateEmail = (e) => {
    // formValidation.email = e.target.value
    // Создадим шаблон регулярного выражения. В нём применяются шаблонные строки
    // Гуглить по тегам: "шаблонные строки js", "регулярные выражения"
    const regExp = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

    if (String(e).toLowerCase().match(regExp) !== null) {
        console.log("EMAIL IS CORRECT")
        email.classList.remove("invalid")
        email.classList.add("valid")
        formValidation.email = true
    } else {
        console.log("EMAIL IS INCORRECT")
        email.classList.remove("valid")
        email.classList.add("invalid")
        formValidation.email = false
    }

    sign_up_btn.disabled = !getValidationStatus()

    return formValidation.email
}
export const validatePassword = (e) => {
    // Напишите код валидации здесь и присвойте true/false в объект(словарь) formValidation
    // Пароль должен содержать 8 символов и хотя бы одну цифру, одну любую букву и один спец символ
    const regExp = /^.*(?=.{8,})(?=.*[a-zA-Z])(?=.*\d)(?=.*[!#$%&?_:;., "]).*$/;

    if (String(e).match(regExp) !== null) {
        console.log("PASSWORD IS CORRECT")
        password.classList.remove("invalid")
        password.classList.add("valid")
        formValidation.password = true
    } else {
        console.log("PASSWORD IS INCORRECT")
        password.classList.remove("valid")
        password.classList.add("invalid")
        formValidation.password = false
    }

    sign_up_btn.disabled = !getValidationStatus()

    return formValidation.password
}

export const validateCheckPassword = (e) => {
    const password_repeat = document.getElementById("password_repeat");

    if (e === password.value) {
        console.log("REPEAT PASSWORD IS CORRECT")
        password_repeat.classList.remove("invalid")
        password_repeat.classList.add("valid")
        formValidation.password_repeat = true
    } else {
        console.log("REPEAT PASSWORD IS INCORRECT")
        password_repeat.classList.remove("valid")
        password_repeat.classList.add("invalid")
        formValidation.password_repeat = false
    }

    sign_up_btn.disabled = !getValidationStatus()

    return formValidation.password_repeat
}

// Функция возвращающая true если все валидации пройдены, и false если хотя бы одна не пройдена
export const getValidationStatus = () => {
    // Происходит функциональная мгаия, читай строчку кода ниже как:
    // Получить значения (не ключи) из объекта, затем применить к каждому значению функцию двойного логического отрицания
    // (преобразование к булевому типу) и результаты всех применений это true, то вернуть true, иначе - false
    return Object.values(formValidation).every((validationStatus) => !!validationStatus)
}


// Функция которая ставит значение поля в форме по ключу
export const setFormValue = (valueKey, newValue, validator) => {
    formValues[valueKey] = newValue
    if (validator !== undefined) {
        formValidation[valueKey] = validator(newValue)
    }
}


// Функция для обработки отправки формы регистрации
// В этой функции должен быть http запрос на сервер для регистрации пользователя (сейчас просто демонстрация)
export const submitSignUpForm = () => {
    if (!getValidationStatus()) {
        console.log("FORM IS INCORRECT");
        console.log(formValues);
        return false;
    }

    console.log("FORM IS FINE");
    console.log(formValues);
    return true;
}

const usersInfo = {"user@ghost.ru": "1324&aT_000"}

export const checkFillingForm = (e) => {
    email_sign_in.classList.remove("invalid");
    password_sign_in.classList.remove("invalid");

    sign_in_btn.disabled = !(email_sign_in.value !== '' && password_sign_in.value !== '');
}

export const submitSignInForm = (e) => {
    const get_email = email_sign_in.value
    const get_password = password_sign_in.value

    if (usersInfo.hasOwnProperty(get_email)) {
        // Проверка совпадения пароля
        if (usersInfo[get_email] === get_password) {
            console.log("FORM IS FINE");
            console.log(formValues);
            return true;
        }
    }

    // Очистка полей формы
    email_sign_in.classList.add("invalid");
    password_sign_in.classList.add("invalid");

    console.log("FORM IS INCORRECT");
    console.log(formValues);
    return false;
}
