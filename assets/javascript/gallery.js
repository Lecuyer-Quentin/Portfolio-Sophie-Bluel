

import { allData, categories } from "./api.js"

/**
 * * Création de la class Gallery
 * @param {HTMLElement} element
 * @param {Objets} data
 * @returns {Gallery}
 */
export class Gallery{

    constructor(element){
        this.element = element
        //* Création de la div root
        this.root = document.createElement("div")
        this.root.setAttribute("class", "gallery")
        this.element.appendChild(this.root)

        //* Création de la div gallery
        this.galleryContainer = document.createElement("div")
        this.galleryContainer.setAttribute("class", "gallery-container")
        this.root.appendChild(this.galleryContainer)

        //* Variable
        this.buttonToggle = []

        //*Appel des méthodes de la class
        this.createToggle()
        this.createGalleryAll()
    }

    /**
     * * Création de la div btn-toggle-container
     * * Création du bouton btn-toggle-all
     * * Création des boutons btn-toggle
     * @returns {Gallery}
     */
    createToggle(){
        this.btnToggleContainer = document.createElement('div')
        this.btnToggleContainer.setAttribute('class', 'btn-toggle-container')
        this.galleryContainer.appendChild(this.btnToggleContainer)

        //* Création du bouton btn-toggle-all
        this.btnToggleAll = document.createElement('button')
        this.btnToggleAll.setAttribute('class', 'btn-toggle-all')
        this.btnToggleAll.setAttribute('id', 'btn-toggle-all')
        this.btnToggleAll.textContent = 'Tous'
        this.btnToggleAll.classList.add('btn-toggle--active')
        this.btnToggleContainer.appendChild(this.btnToggleAll)
        this.buttonToggle.push(this.btnToggleAll)
        this.activateBtnToggle()

        //* EventListener sur le btnToggleAll
        this.btnToggleAll.addEventListener('click', () => {
            //? On vide la div galleryProjects
            this.galleryProjects.style.display = 'none'
            //? On appelle la méthode createGalleryAll
            this.createGalleryAll()
        })
        
        //* On loop sur les catégories
        categories().then(data => {
            data.forEach(category => {
                this.btnToggle = document.createElement('button')
                this.btnToggle.setAttribute('class', 'btn-toggle')
                this.btnToggle.setAttribute('id', category.name)
                this.btnToggle.textContent = category.name
                this.btnToggleContainer.appendChild(this.btnToggle)
                
                this.buttonToggle.push(this.btnToggle)
                this.activateBtnToggle()

                //* EventListener sur les btnToggle
                this.btnToggle.addEventListener('click', () => {
                    if(category.name === 'Objets'){
                        this.galleryProjects.style.display = 'none'
                        this.createGalleryByCategory(category.name)
                }
                    if(category.name === 'Appartements'){
                        this.galleryProjects.style.display = 'none'
                        this.createGalleryByCategory(category.name)
                }
                    if(category.name === 'Hotels & restaurants'){
                        this.galleryProjects.style.display = 'none'
                        this.createGalleryByCategory(category.name)
                    }
                }) 
            })
        })
    }

    activateBtnToggle(){
        this.buttonToggle.forEach(btnToggle => {
            btnToggle.addEventListener('click', () => {
                this.buttonToggle.forEach(btnToggle => {
                    btnToggle.classList.remove('btn-toggle--active')
                })
                btnToggle.classList.add('btn-toggle--active')
            })
        })
            
        }


    /**
     * * Création de la div gallery-projects
     * @param {Objets} data
     * @returns {Gallery}
     */
    createGalleryAll(){ 
        this.galleryProjects = document.createElement('div')
        this.galleryProjects.setAttribute('class', 'gallery-projects')
        this.galleryContainer.appendChild(this.galleryProjects)
        
        //* On loop sur les datas
        allData().then(datas => {
            datas.forEach(data => {
                //? On appelle la méthode createGallery
                this.createGallery(data)
            })
        })
    }

    /**
     * * Création de la figure project
     * * Création de l'image project-image
     * * Création du figcaption project-title
     * @param {Objets} data
     * @returns {Gallery}
     */
    createGallery(data){
        this.project = document.createElement('figure')
        this.project.setAttribute('class', 'project')
        this.galleryProjects.appendChild(this.project)
        this.projectImage = document.createElement('img')
        this.projectImage.setAttribute('class', 'project-image')
        this.projectImage.setAttribute('src', data.imageUrl)
        this.projectImage.setAttribute('alt', data.title)
        this.project.appendChild(this.projectImage)
        this.projectTitle = document.createElement('figcaption')
        this.projectTitle.setAttribute('class', 'project-title')
        this.projectTitle.textContent = data.title
        this.project.appendChild(this.projectTitle)
    }

    /**
     * * Création de la div gallery-projects
     * @param {Objets} category
     * @returns {Gallery}
     */
    createGalleryByCategory(category){
        this.galleryProjects = document.createElement('div')
        this.galleryProjects.setAttribute('class', 'gallery-projects')
        this.galleryContainer.appendChild(this.galleryProjects)

        //* On loop sur les datas
        allData().then(datas => {
            datas.forEach(data => {
                if(data.category.name === category){
                    this.createGallery(data)
                }
            })
        })
    }
}