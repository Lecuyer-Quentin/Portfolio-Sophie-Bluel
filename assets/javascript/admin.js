import { allData , fetchToDelete , fetchToAdd } from "./api.js"


/**
 * * Création de la class Admin
 * @param {HTMLElement} element
 * @returns {Admin}
 */
export class Admin{
    constructor(element) {
        this.element = element   
    }
    createAdminModif(){
         //? Creation du modif
        this.modif = document.createElement('div')
        this.modif.setAttribute('class', 'modif')
        this.element.appendChild(this.modif)
        
        //? Creation du Button modif
        this.modifBtn = document.createElement('button')
        this.modifBtn.setAttribute('class', 'modif-btn')
        this.modifBtn.innerText = 'Modifier'
        this.modif.appendChild(this.modifBtn)

        //? Creation de l'icon du Button modif
        this.modifBtnIcon = document.createElement('i')
        this.modifBtnIcon.setAttribute('class', 'fas fa-edit')
        this.modifBtn.appendChild(this.modifBtnIcon) 
    }
    deleteAll(){
       allData() //? On récupère les données
            .then(data => {
                //? On récupère les id
                this.ids = data.map(item => item.id)
                //? On boucle sur les id pour les supprimer
                this.ids.forEach(id => {
                    this.deleteItem(id)
                })
            })
    }
    deleteItem(id){
        fetchToDelete(id)
    }
    addItem(formAddData){
        fetchToAdd(formAddData)
    }
}
/* ///////////////////////////////////////////////////////////////////// */
/**
 * * Création de la class AdminBanner
 * @param {HTMLElement} element
 * @returns {AdminBanner}
 */
export class AdminBanner extends Admin{

    constructor(element){
        super(element)

    //*------Appel Methods------//
        this.createAdminBanner()

    //*-------Event------------//
        this.bannerBtn.addEventListener('click', (e) => {
            e.preventDefault()
            localStorage.removeItem('token')
            window.location.href = 'index.html'
            console.log('Publier les changements') //todo
        })
    }
    //*--------Method---------//
    createAdminBanner(){
        this.banner = document.createElement('div')
        this.banner.setAttribute('class', 'banner')
        this.element.appendChild(this.banner)

        //? Creation du banner-logo
        this.bannerLogo = document.createElement('i')
        this.bannerLogo.setAttribute('class', 'fas fa-edit banner-logo')
        this.banner.appendChild(this.bannerLogo)

        //? Creation du banner-title
        this.bannerTitle = document.createElement('p')
        this.bannerTitle.setAttribute('class', 'banner-title')
        this.bannerTitle.innerText = 'Mode edition'
        this.banner.appendChild(this.bannerTitle)

        //? Creation du banner-btn
        this.bannerBtn = document.createElement('button')
        this.bannerBtn.setAttribute('class', 'banner-btn')
        this.bannerBtn.innerText = 'publier les changements'
        this.banner.appendChild(this.bannerBtn)
    }
}
/* ///////////////////////////////////////////////////////////////////// */
/**
 * * Création de la class AdminModif
 * @param {HTMLElement} element
 * @returns {AdminModif}
 */
export class AdminModif extends Admin{
    constructor(element){
        super(element)

    //* -------Appel Methods--------- *//
        this.createAdminModif()

    //* ----------Event----------- *//
        this.modifBtn.addEventListener('click', (e) => {
            e.preventDefault()
            new AdminModalGallery(this.element) //? Ouvrir le modal de la galerie
        })
    }    
}
/*///////////////////////////////////////////////////////////////////////*/
/**
 * * Création de la class AdminModifImg
 * @param {HTMLElement} element
 * @returns {AdminModifImg}
 */
export class AdminModifImg extends Admin{ //todo : Ajouter action pour modifier l'image
    constructor(element){
        super(element)

    //* -------Appel Methods--------- *//
        this.createAdminModif()

    //* ----------Event----------- *//
        this.modifBtn.addEventListener('click', () => {
            alert('Modifier l\'image') //todo
        })
    } 
}
/*///////////////////////////////////////////////////////////////////////*/
/**
 * * Création de la class AdminModifText
 * @param {HTMLElement} element
 * @returns {AdminModifText}
 */
export class AdminModifText extends Admin{ //todo : Ajouter action pour modifier le texte
    constructor(element){
        super(element)

    //* -------Appel Methods--------- *//
        this.createAdminModif()

    //* ----------Event----------- *//
        this.modifBtn.addEventListener('click', () => {
            alert('Modifier le texte') //todo
        })
    } 
}
/*///////////////////////////////////////////////////////////////////////*/
/**
 * * Création de la class AdminModalGallery
 * @param {HTMLElement} element
 * @returns {AdminModalGallery}
 */
export class AdminModalGallery extends Admin{ //todo : Ajouter action/éditer une image

    constructor(element){
        super(element)
        
        this.root = document.createElement('div')
        this.root.setAttribute('class', 'modal-gallery')
        this.element.appendChild(this.root)
        this.modalContainer = document.createElement('div')
        this.modalContainer.setAttribute('class', 'modal-container')
        this.root.appendChild(this.modalContainer)


    //* ------------Methods Appels------------- *//
        //? Creation du Header de la modal
        this.createAdminModalHeader()

        //? Creation de la galerie
        this.createAdminModalGallery() //!! Attention A surveiller

        //? Creation du Footer de la modal
        this.createAdminModalFooter()

    //* --------------Events---------------- *//
         //? Action du Button Retour
        this.modalBtnReturn.addEventListener('click', (e) => {
            e.preventDefault()
            this.root.style.display = 'none'
            new AdminModalGallery(this.element) //? Retour à la page précédente
        })
        //? Action du Button Fermer
        this.modalGalleryCloseBtn.addEventListener('click', (e) => {
            e.preventDefault()
            this.root.style.display = 'none'
        })

        //? Action du Button Supprimer la galerie
        this.modalDeleteGallery.addEventListener('click', (e) => {
            e.preventDefault()
            if(confirm('Voulez vous supprimer la galerie ?')){
                this.deleteAll()
            }
        })

        //? Action du Button Ajouter une photo 1er page
        this.modalBtnAdd.addEventListener('click', (e) => {
            e.preventDefault()
            this.modalContainer.innerHTML = ''
            //? Creation de la page d'ajout d'image
            this.createAdminModalAddImg()
        })
        
    }
    
    //* -----------Methods--------------- *//
    /**
     * * Création du Header de la modal
     * @description Création du Header de la modal
     */
    createAdminModalHeader(){
        //? Creation du Header de la modal
        this.modalGalleryHeader = document.createElement('div')
        this.modalGalleryHeader.setAttribute('class', 'modal-gallery-header')
        this.modalContainer.appendChild(this.modalGalleryHeader)

        //? Creation du Bouton Retour
        this.modalBtnReturn = document.createElement('button')
        this.modalBtnReturn.setAttribute('class', 'modal-gallery-btn-return hide')
        this.modalBtnReturn.setAttribute('type', 'button')
        this.modalGalleryHeader.appendChild(this.modalBtnReturn)
        this.modalBtnReturnIcon = document.createElement('i')
        this.modalBtnReturnIcon.setAttribute('class', 'fas fa-arrow-left fa-xl')
        this.modalBtnReturn.appendChild(this.modalBtnReturnIcon)

        //? Creation du Title de la modal
        this.modalGalleryHeaderTitle = document.createElement('h2')
        this.modalGalleryHeaderTitle.setAttribute('class', 'modal-gallery-header-title')
        this.modalGalleryHeaderTitle.innerText = 'Galerie Photo'
        this.modalGalleryHeader.appendChild(this.modalGalleryHeaderTitle)

        //? Creation du Button Fermer
        this.modalGalleryCloseBtn = document.createElement('button')
        this.modalGalleryCloseBtn.setAttribute('class', 'modal-gallery-close-btn')
        this.modalGalleryCloseBtn.setAttribute('type', 'button')
        this.modalGalleryHeader.appendChild(this.modalGalleryCloseBtn)

        //? Creation de l'icon du Button Fermer
        this.modalGalleryCloseBtnIcon = document.createElement('i')
        this.modalGalleryCloseBtnIcon.setAttribute('class', 'fa-solid fa-xmark fa-xl')
        this.modalGalleryCloseBtn.appendChild(this.modalGalleryCloseBtnIcon)
    }

    /**
     * * Création de la galerie
     * @description Création de la galerie
     * @returns {HTMLElement} modalGalleryContainer
     */
    createAdminModalGallery(){
        //? Creation du Container de la galerie
        this.modalGalleryContainer = document.createElement('div')
        this.modalGalleryContainer.setAttribute('class', 'modal-gallery-container')
        this.modalContainer.appendChild(this.modalGalleryContainer)

        /**
         * * Création des items de la galerie
         * @description Création des items de la galerie
         * @returns {HTMLElement} item
         */
         allData().then(datas => {
            //? On parcours les datas
            for(let data of datas){
                this.item = document.createElement('figure')
                this.item.setAttribute('class', 'gallery-modal-item')
                this.modalGalleryContainer.appendChild(this.item)

                //? Creation de l'image et de ses attributs
                this.itemImg = document.createElement('img')
                this.itemImg.setAttribute('class', 'gallery-modal-item-img')
                this.itemImg.setAttribute('src', data.imageUrl)
                this.itemImg.setAttribute('alt', data.title)
                this.item.appendChild(this.itemImg)

                //? Creation du Button Supprimer une image
                this.itemBtn = document.createElement('button')
                this.itemBtn.setAttribute('class', 'gallery-modal-item-btn')
                this.itemBtn.setAttribute('type', 'button')
                this.item.appendChild(this.itemBtn)

                //? Action du Button Supprimer une image
                this.itemBtn.addEventListener('click', (e) => {
                    e.preventDefault()
                    this.id = data.id
                    if(confirm('Voulez vous supprimer cette image ?')){
                        this.deleteItem(this.id)
                    }
                })

                //? Creation du Svg Supprimer une image
                this.itemBtnIcon = document.createElementNS('http://www.w3.org/2000/svg', 'svg')
                this.itemBtnIcon.setAttribute('class', 'gallery-modal-item-btn-icon')
                this.itemBtnIcon.setAttribute('width', '12')
                this.itemBtnIcon.setAttribute('height', '12')
                this.itemBtnIcon.setAttribute('viewBox', '0 0 9 9')
                this.itemBtnIcon.setAttribute('fill', 'white')
                this.itemBtn.appendChild(this.itemBtnIcon)
                //? Creation du Svg Path Supprimer une image
                this.itemBtnIconPath = document.createElementNS('http://www.w3.org/2000/svg', 'path')
                this.itemBtnIconPath.setAttribute('fill-rule', 'evenodd')
                this.itemBtnIconPath.setAttribute('clip-rule', 'evenodd')
                this.itemBtnIconPath.setAttribute('d',"M6.6 1.8V0.9C6.6 0.402944 6.19704 0 5.7 0H3.3C2.80294 0 2.4 0.402944 2.4 0.9V1.8H0V2.4H0.6V8.1C0.6 8.59704 1.00294 9 1.5 9H7.5C7.99704 9 8.4 8.59704 8.4 8.1V2.4H9V1.8H6.6ZM3 0.9C3 0.734316 3.13432 0.6 3.3 0.6H5.7C5.86568 0.6 6 0.734316 6 0.9V1.8H3V0.9ZM4.2 4.2V7.2H4.8V4.2H4.2ZM2.4 7.2V5.4H3V7.2H2.4ZM6 5.4V7.2H6.6V5.4H6Z")
                this.itemBtnIcon.appendChild(this.itemBtnIconPath)

             

                //? Creation du Link Éditer une image
                this.itemEdit = document.createElement('a')
                this.itemEdit.setAttribute('class', 'gallery-modal-item-edit')
                this.itemEdit.setAttribute('href', '#')
                this.itemEdit.innerText = 'éditer'
                this.item.appendChild(this.itemEdit)

                //? Action du Link Éditer une image
                this.itemEdit.addEventListener('click', (e) => {
                    e.preventDefault()
                    if(confirm('Voulez vous éditer cette image ?')){
                        alert('Fonctionnalité en cours de développement')//todo 
                    }
                })
            }
         })
    }
    createAdminModalFooter(){
        //? Creation du Container de la decoration
        this.modalDecoContainer = document.createElement('div')
        this.modalDecoContainer.setAttribute('class', 'modal-deco-container')
        this.modalContainer.appendChild(this.modalDecoContainer)

        //? Creation du Button Ajouter une photo
        this.modalBtnAdd = document.createElement('button')
        this.modalBtnAdd.setAttribute('class', 'modal-gallery-btn-add')
        this.modalBtnAdd.setAttribute('type', 'button')
        this.modalBtnAdd.innerText = 'Ajouter une photo'
        this.modalContainer.appendChild(this.modalBtnAdd)

        //? Creation du lien pour supprimer la gallery
        this.modalDeleteGallery = document.createElement('a')
        this.modalDeleteGallery.setAttribute('class', 'modal-gallery-delete')
        this.modalDeleteGallery.setAttribute('href', '#')
        this.modalDeleteGallery.innerText = 'Supprimer la galerie'
        this.modalContainer.appendChild(this.modalDeleteGallery)
    }
    createAdminModalAddImg(){
             //? Appel du header
            this.modalContainer.appendChild(this.modalGalleryHeader)

            // //? Affichage du bouton retour
            this.modalBtnReturn.classList.remove('hide')

            //? Appel du titre
            this.modalGalleryHeaderTitle.innerText = 'Ajouter une image'
            this.modalGalleryHeader.appendChild(this.modalGalleryHeaderTitle)

            //? Appel du bouton close
            this.modalGalleryHeader.appendChild(this.modalGalleryCloseBtn)

            //? Creation du formulaire d'ajout d'image
            this.modalGalleryForm = document.createElement('form')
            this.modalGalleryForm.setAttribute('class', 'modal-gallery-form')
            this.modalGalleryForm.setAttribute('method', 'POST')
            this.modalGalleryForm.setAttribute('action','' )
            // this.modalGalleryForm.setAttribute('url', ``)
            this.modalGalleryForm.setAttribute('enctype', 'multipart/form-data')
            this.modalContainer.appendChild(this.modalGalleryForm)

            //? Creation du container de preview d'image
            this.modalGalleryFormPreview = document.createElement('div')
            this.modalGalleryFormPreview.setAttribute('class', 'modal-gallery-form-preview')
            this.modalGalleryForm.appendChild(this.modalGalleryFormPreview)

            this.modalGalleryFormPreviewImg = document.createElement('img')
            this.modalGalleryFormPreviewImg.setAttribute('class', 'modal-gallery-form-preview-img')
            this.modalGalleryFormPreviewImg.setAttribute('accept', 'jpg, png')
            this.modalGalleryFormPreviewImg.setAttribute('max-size', '4Mo')
            this.modalGalleryFormPreview.appendChild(this.modalGalleryFormPreviewImg)

            //? Creation du svg de preview
            this.modalGalleryFormPreviewIcons = document.createElementNS('http://www.w3.org/2000/svg', 'svg')
            this.modalGalleryFormPreviewIcons.setAttribute('class', 'modal-gallery-form-preview-icons')
            this.modalGalleryFormPreviewIcons.setAttribute('width', '58')
            this.modalGalleryFormPreviewIcons.setAttribute('height', '46')
            this.modalGalleryFormPreviewIcons.setAttribute('viewBox', '0 0 58 46')
            this.modalGalleryFormPreviewIcons.setAttribute('fill', '#B9C5CC')
            this.modalGalleryFormPreviewIcons.setAttribute('xmlns', 'http://www.w3.org/2000/svg')
            this.modalGalleryFormPreview.appendChild(this.modalGalleryFormPreviewIcons)
            //? Creation du path du svg de preview
            this.modalGalleryFormPreviewIconsPath = document.createElementNS('http://www.w3.org/2000/svg', 'path')
            this.modalGalleryFormPreviewIconsPath.setAttribute('d', 'M57 0H1C0.448 0 0 0.447 0 1V45C0 45.553 0.448 46 1 46H57C57.552 46 58 45.553 58 45V1C58 0.447 57.552 0 57 0ZM56 44H2V2H56V44ZM29 22L22 15L24.414 12.586L29 17.172L39.586 6.586L42 9L29 22Z')
            this.modalGalleryFormPreviewIcons.appendChild(this.modalGalleryFormPreviewIconsPath)

            //? Creation du formulaire d'ajout d'image - input
            this.modalGalleryFormInput = document.createElement('input')
            this.modalGalleryFormInput.setAttribute('type', 'file')
            this.modalGalleryFormInput.setAttribute('name', 'image')
            this.modalGalleryFormInput.setAttribute('id', 'image')
            this.modalGalleryFormInput.setAttribute('class', 'modal-gallery-form-input')
            this.modalGalleryFormInput.setAttribute('accept', 'jpg, png')
            this.modalGalleryFormInput.setAttribute('max-size', '4Mo')
            this.modalGalleryFormInput.setAttribute('required', 'required')
            this.modalGalleryFormPreview.appendChild(this.modalGalleryFormInput)

            //? Affichage de l'image dans la preview
            this.modalGalleryFormInput.addEventListener('change', () => {
                //? createObjectURL permet de créer une url temporaire pour l'image sélectionnée dans le formulaire 
                this.modalGalleryFormPreviewImg.setAttribute('src', URL.createObjectURL(this.modalGalleryFormInput.files[0]))
            })

            //? Creation du bouton d'ajout d'image
            this.modalGalleryFormInputBtn = document.createElement('button')
            this.modalGalleryFormInputBtn.setAttribute('class', 'modal-gallery-form-input-btn')
            this.modalGalleryFormInputBtn.setAttribute('for', 'image')
            this.modalGalleryFormInputBtn.innerText = '+ Ajouter photo'
            this.modalGalleryFormPreview.appendChild(this.modalGalleryFormInputBtn)
            
            //? Creation du texte d'information
            this.modalGalleryFormText = document.createElement('p')
            this.modalGalleryFormText.setAttribute('class', 'modal-gallery-form-text')
            this.modalGalleryFormText.innerText = 'jpg, png : 4Mo'
            this.modalGalleryFormPreview.appendChild(this.modalGalleryFormText)

            //? Creation du label de titre
            this.modalGalleryFormLabelTitle = document.createElement('label')
            this.modalGalleryFormLabelTitle.setAttribute('for', 'title')
            this.modalGalleryFormLabelTitle.setAttribute('class', 'modal-gallery-form-label-title')
            this.modalGalleryFormLabelTitle.innerText = 'Titre'
            this.modalGalleryForm.appendChild(this.modalGalleryFormLabelTitle)

            //? Creation de l'input de titre
            this.modalGalleryFormInputTitle = document.createElement('input')
            this.modalGalleryFormInputTitle.setAttribute('type', 'text')
            this.modalGalleryFormInputTitle.setAttribute('name', 'title')
            this.modalGalleryFormInputTitle.setAttribute('id', 'title')
            this.modalGalleryFormInputTitle.setAttribute('required', 'required')
            this.modalGalleryFormInputTitle.setAttribute('class', 'modal-gallery-form-input-title')
            this.modalGalleryForm.appendChild(this.modalGalleryFormInputTitle)

            //? Creation du label de select
            this.modalGalleryFormLabelSelect = document.createElement('label')
            this.modalGalleryFormLabelSelect.setAttribute('for', 'category')
            this.modalGalleryFormLabelSelect.setAttribute('class', 'modal-gallery-form-label-select')
            this.modalGalleryFormLabelSelect.innerText = 'Catégorie'
            this.modalGalleryForm.appendChild(this.modalGalleryFormLabelSelect)

            //? Creation du select
            this.modalGalleryFormSelect = document.createElement('select')
            this.modalGalleryFormSelect.setAttribute('name', 'category')
            this.modalGalleryFormSelect.setAttribute('id', 'category')
            this.modalGalleryFormSelect.setAttribute('required', 'required')
            this.modalGalleryFormSelect.setAttribute('class', 'modal-gallery-form-select')
            this.modalGalleryForm.appendChild(this.modalGalleryFormSelect)

            //? Creation des options du select
            this.modalGalleryFormSelectOption1 = document.createElement('option')
            this.modalGalleryFormSelectOption1.setAttribute('value', '1')
            this.modalGalleryFormSelectOption1.innerText = 'Objets'
            this.modalGalleryFormSelect.appendChild(this.modalGalleryFormSelectOption1)

            this.modalGalleryFormSelectOption2 = document.createElement('option')
            this.modalGalleryFormSelectOption2.setAttribute('value', '2')
            this.modalGalleryFormSelectOption2.innerText = 'Appartements'
            this.modalGalleryFormSelect.appendChild(this.modalGalleryFormSelectOption2)

            this.modalGalleryFormSelectOption3 = document.createElement('option')
            this.modalGalleryFormSelectOption3.setAttribute('value', '3')
            this.modalGalleryFormSelectOption3.innerText = 'Hotels et restaurants'
            this.modalGalleryFormSelect.appendChild(this.modalGalleryFormSelectOption3)

            //? Creation du container de decoration
            this.modalGalleryForm.appendChild(this.modalDecoContainer)

            //? Creation du bouton de validation du formulaire
            this.modalGalleryFormBtn = document.createElement('button')
            this.modalGalleryFormBtn.setAttribute('class', 'modal-gallery-form-btn')
            this.modalGalleryFormBtn.setAttribute('type', 'submit')
            this.modalGalleryFormBtn.innerText = 'Valider'
            this.modalGalleryForm.appendChild(this.modalGalleryFormBtn)   

            //? Écoute des changements dans le formulaire
            this.modalGalleryForm.addEventListener('change', (e) => {
                e.preventDefault()
            //? Création de l'objet FormData
            //? FormData permet de créer un objet contenant les données du formulaire
            //? On peut ensuite envoyer cet objet au serveur via une requête Fetch
                this.formAddData = new FormData(this.modalGalleryForm)         
            })

            //? Écoute du click sur le bouton de validation du formulaire
            this.modalGalleryFormBtn.addEventListener('click', (e) => {
                e.preventDefault()
                //? Appel de la fonction d'ajout d'image
                this.addItem(this.formAddData)
            })
    }
   
}
