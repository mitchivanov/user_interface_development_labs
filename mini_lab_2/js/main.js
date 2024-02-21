// Импортируем функции из файла utils.js
import {
    setFormValue,
    submitSignUpForm,
    validateEmail,
    validatePassword,
    validateCheckPassword,
    submitSignInForm,
    checkFillingForm
} from "./utils.js"

// Выписываем все айдишники HTMl-элементов в константы для переиспользования
const first_name_id = 'first_name'
const last_name_id = 'last_name'
const password_id = 'password'
const password_repeat_id = "password_repeat"
const email_id = 'email'

const sign_up_form_id = 'sign_up_form'
const sign_up_btn_id = 'sign_up_btn'

const sign_in_link_id = 'sign_in_link'
const sign_in_form_id = 'sign_in_form'
const sign_in_btn_id = "sign_in_btn"

const email_sign_in_id = "email_sign_in"
const password_sign_in_id = "password_sign_in"

const warning_sign_in_id = "warning_text_sign_in"

// Получаем элементы DOM-дерева по id
const first_name = document.getElementById(first_name_id);
const last_name = document.getElementById(last_name_id);
const email = document.getElementById(email_id);
const password = document.getElementById(password_id);
const check_password = document.getElementById(password_repeat_id);
const email_sign_in = document.getElementById(email_sign_in_id);
const password_sign_in = document.getElementById(password_sign_in_id);
const switch_to_sign_in = document.getElementById(sign_in_link_id);
const sign_up_btn = document.getElementById(sign_up_btn_id);
const sign_in_btn = document.getElementById(sign_in_btn_id);

// Устанавливаем обработчики событий oninput для ввода данных в форму регистрации
// oninput вызывается с параметром "event" каждый раз, когда ввод меняется
// Значение, которое мы присваеваем этому аттрибуту - это функция, определённая в стрелочном стиле
// Гуглить по тегам "события JS", "onchange/oninput HTML", "стрелочные функции JS", ...

// Устанавливаем значение для имени без валидации
first_name.oninput = (e) => setFormValue(first_name_id, e.target.value)

// Устанавливаем значение для фамилии без валидации
last_name.oninput = (e) => setFormValue(last_name_id, e.target.value)

// Устанавливаем значение для электронной почты с валидацией
email.oninput = (e) => setFormValue(email_id, e.target.value, validateEmail)

// Устанавливаем значение для пароля с валидацией
password.oninput = (e) => setFormValue(password_id, e.target.value, validatePassword)

// Устанавливаем значение для повтора пароля с валидацией
check_password.oninput = (e) => setFormValue(password_repeat_id, e.target.value, validateCheckPassword)

// Устанавливаем обработчики событий oninput для ввода данных в форму авторизации
// Устанавливаем значение для электронной почты при входе с проверкой заполнения
email_sign_in.oninput = (e) => setFormValue(email_sign_in_id, e.target.value, checkFillingForm)

// Устанавливаем значение для пароля при входе с проверкой заполнения
password_sign_in.oninput = (e) => setFormValue(password_sign_in_id, e.target.value, checkFillingForm)

// Устанавливаем обработчик события onclick для переключения между формами регистрации и авторизации
// Меняем стили объекта DOM дерева. Это позволяет скрыть форму регистрации и показать форму авторизации
// Объект формы не исключается из DOM дерева, а просто становистя невидимым
switch_to_sign_in.onclick = (e) => {
    document.getElementById(sign_up_form_id).style.display = "none"
    document.getElementById(sign_in_form_id).style.display = ""
}

// Устанавливаем обработчик события onclick для кнопки регистрации
sign_up_btn.disabled = true;
sign_up_btn.onclick = (e) => {
    // При нажатии кнопки в форме по умолчанию происходит перезагрузка страницы.
    // Чтобы отключить его, нужно отменить стандартное поведение события
    e.preventDefault()
    submitSignUpForm()
}

// Устанавливаем обработчик события onclick для кнопки авторизации
sign_in_btn.disabled = true;
sign_in_btn.onclick = (e) => {
    e.preventDefault()
    if (!submitSignInForm()) {
        document.getElementById(warning_sign_in_id).style.display = ""
    } else {
        document.getElementById(warning_sign_in_id).style.display = "none"
    }
}