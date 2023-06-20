

import { fetchToLogin } from "./api.js"

/**
 * @param {HTMLElement} element
 * @returns {LoginModal}
 */
export class LoginModal{
    constructor(element){
        this.element = element
        //* Creation du root
        this.root = document.createElement('div')
        this.root.setAttribute('class', 'login-modal')
        this.element.appendChild(this.root)

        //* On vide le main 
        this.main = document.querySelector('main')
        this.main.innerHTML = ''
        this.main.appendChild(this.root)

        //*-------Methods-------*//
        this.createFormulaire()
        this.getLogin()
    }
    
     createFormulaire(){
         //? Creation du login-modal-container
        this.loginModalContainer = document.createElement('div')
        this.loginModalContainer.setAttribute('class', 'login-modal-container')
        this.root.appendChild(this.loginModalContainer)

        //? Creation du login-modal-header
        this.loginModalHeader = document.createElement('div')
        this.loginModalHeader.setAttribute('class', 'login-modal-header')
        this.loginModalContainer.appendChild(this.loginModalHeader)

        //? Creation du login-modal-title
        this.loginModalTitle = document.createElement('h2')
        this.loginModalTitle.setAttribute('class', 'login-modal-title')
        this.loginModalTitle.textContent = 'Log In'
        this.loginModalHeader.appendChild(this.loginModalTitle)
 
        //? Creation du login-modal-body 
        this.loginModalBody = document.createElement('div')
        this.loginModalBody.setAttribute('class', 'login-modal-body')
        this.loginModalContainer.appendChild(this.loginModalBody)

        //? Creation du login-modal-form
        this.loginModalForm = document.createElement('form')
        this.loginModalForm.setAttribute('class', 'login-modal-form')
        this.loginModalForm.setAttribute('id', 'login-modal-form')
        this.loginModalForm.setAttribute('action', '/login')
        this.loginModalForm.setAttribute('method', 'POST')
        this.loginModalBody.appendChild(this.loginModalForm)

        //? Creation du login-modal-form-group
        this.loginModalFormGroup = document.createElement('div')
        this.loginModalFormGroup.setAttribute('class', 'login-modal-form-group')
        this.loginModalForm.appendChild(this.loginModalFormGroup)

        //? Creation du login-modal-form-group-label
        this.loginModalFormGroupLabel = document.createElement('label')
        this.loginModalFormGroupLabel.setAttribute('class', 'login-modal-form-group-label')
        this.loginModalFormGroupLabel.setAttribute('for', 'admin-email')
        this.loginModalFormGroupLabel.textContent = 'Email'
        this.loginModalFormGroup.appendChild(this.loginModalFormGroupLabel)

        //? Creation du login-modal-form-group-input
        this.loginModalFormGroupInputEmail = document.createElement('input')
        this.loginModalFormGroupInputEmail.setAttribute('class', 'login-modal-form-group-input')
        this.loginModalFormGroupInputEmail.setAttribute('type', 'email')
        this.loginModalFormGroupInputEmail.setAttribute('id', 'admin-email')
        this.loginModalFormGroupInputEmail.setAttribute('name', 'admin-email')
        this.loginModalFormGroupInputEmail.setAttribute('required', 'required')
        this.loginModalFormGroup.appendChild(this.loginModalFormGroupInputEmail)

        //? Creation du login-modal-form-group-label
        this.loginModalFormGroupLabel = document.createElement('label')
        this.loginModalFormGroupLabel.setAttribute('class', 'login-modal-form-group-label')
        this.loginModalFormGroupLabel.setAttribute('for', 'admin-password')
        this.loginModalFormGroupLabel.textContent = 'Mot de passe'
        this.loginModalFormGroup.appendChild(this.loginModalFormGroupLabel)

        //? Creation du login-modal-form-group-input
        this.loginModalFormGroupInputPassword = document.createElement('input')
        this.loginModalFormGroupInputPassword.setAttribute('class', 'login-modal-form-group-input')
        this.loginModalFormGroupInputPassword.setAttribute('type', 'password')
        this.loginModalFormGroupInputPassword.setAttribute('id', 'admin-password')
        this.loginModalFormGroupInputPassword.setAttribute('name', 'admin-password')
        this.loginModalFormGroupInputPassword.setAttribute('required', 'required')
        this.loginModalFormGroup.appendChild(this.loginModalFormGroupInputPassword)

        //? Creation du login-modal-form-group-input
        this.loginModalFormGroupInput = document.createElement('input')
        this.loginModalFormGroupInput.setAttribute('class', 'login-modal-form-group-input')
        this.loginModalFormGroupInput.setAttribute('type', 'submit')
        this.loginModalFormGroupInput.setAttribute('value', 'Se connecter')
        this.loginModalFormGroup.appendChild(this.loginModalFormGroupInput)

        //? Creation du login-modal-footer
        this.loginModalFooter = document.createElement('div')
        this.loginModalFooter.setAttribute('class', 'login-modal-footer')
        this.loginModalContainer.appendChild(this.loginModalFooter)

        //? Creation du login-modal-footer-link
        this.loginModalFooterLink = document.createElement('a')
        this.loginModalFooterLink.setAttribute('class', 'login-modal-footer-link')
        this.loginModalFooterLink.setAttribute('href', '#')
        this.loginModalFooterLink.textContent = 'Mot de passe oublié ?'
        this.loginModalFooter.appendChild(this.loginModalFooterLink)
     }
    
    /**
     * * Méthode qui permet de récupérer les données du formulaire
     * @param {string} user.email - L'email de l'utilisateur
     * @param {string} user.password - Le mot de passe de l'utilisateur
     * @returns {object} user - L'objet user
     */
     getLogin(){
        //? On récupère les éléments du formulaire
        this.loginModalForm.addEventListener('input', () => { 
            this.user = {
                email: this.loginModalFormGroupInputEmail.value,
                password: this.loginModalFormGroupInputPassword.value,
            }})

        //? On écoute la soumission du formulaire
        this.loginModalForm.addEventListener('submit', (e) => {
            e.preventDefault()                                                          
            fetchToLogin(this.user)                                                     
        })
     }
}

function getLogout() {
    if (localStorage.getItem('token')) {
        const logoutBtn = document.querySelector('.login-modal')
        logoutBtn.textContent = 'logout'
        logoutBtn.addEventListener('click', () => {
            localStorage.removeItem('token')
                location.reload()
            })
        }
}
getLogout()
