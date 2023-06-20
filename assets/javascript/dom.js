
import { Gallery } from "./gallery.js"
import { LoginModal } from "./loginModal.js"
import { Admin , AdminBanner , AdminModif , AdminModifImg , AdminModifText } from "./admin.js"

//* Appel de la class Gallery
document.addEventListener("DOMContentLoaded", () => {
    new Gallery(document.querySelector("#gallery"))
})

//* Appel de la class LoginModal
const loginModal = document.querySelector('#login-modal')
loginModal.addEventListener('click', () => {
    new LoginModal(document.querySelector('#login-modal'))
})

//* Appel de la class Admin
//? Si le token existe, on instancie la class Admin
document.addEventListener('DOMContentLoaded', () => {
    if(localStorage.getItem('token')){
        new Admin(document.querySelector('#admin'))
        new AdminBanner(document.querySelector('#admin-banner'))
        new AdminModif(document.querySelector('#admin-modif'))
        new AdminModifImg(document.querySelector('#admin-modif-img'))
        new AdminModifText(document.querySelector('#admin-modif-text'))
    }
})