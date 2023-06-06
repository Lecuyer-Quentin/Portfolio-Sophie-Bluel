//* Fetching all data from the API
export const allData = async function fetchAllData(){
    try {
        const response = await fetch('http://localhost:5678/api/works',{
            method: 'GET',
            headers: {
                'Accept': 'application/json'
            }
        })
        const data = await response.json()
        return data
    } catch (error) {
        console.log(error)
    }
}

//* Fetching/Categories from the API
export const categories = async function fetchCategories(){
    try {
        const response = await fetch(`http://localhost:5678/api/categories`,{
            method: 'GET',
            headers: {
                'Accept': 'application/json'
            }
        })
        const data = await response.json()
        return data
    } catch (error) {
        console.log(error)
    }
}

//* Fetching for users login
export async function fetchToLogin(user){
    try {
        await fetch(`http://localhost:5678/api/users/login`,{
            method: 'POST', //? Méthode de la requête
            headers: {
                'Accept': 'application/json', //? Type de contenu accepté par le client
                'Content-Type': 'application/json', //? Type de contenu envoyé par le client
            },
            body: JSON.stringify(user),//? Corps de la requête (données envoyées)                
        })
        .then(response => { //? Réponse du serveur (données reçues) 
            if(response.ok){ //? Si la réponse est ok
                console.log(response)
                return response.json() //? Retourne les données au format json
            }
            throw new Error('Email ou mot de passe incorrect')
        })
        .then(user => { //? Données reçues au format json
            localStorage.setItem('token', user.token) //? Enregistre le token dans le localStorage
        })
        .finally(() => { //? Enfin (après avoir reçu les données)
            if(localStorage.getItem('token')){ //? Si le token existe

                window.location.reload() //? Recharge la page
            }
        })

    } catch (error) {
        alert(error)
    }
}

//* Fetching to delete a work from the API
export async function fetchToDelete(id){
        await fetch(`http://localhost:5678/api/works/${id}`,{
            method: 'DELETE', //? Méthode de la requête
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}` //? Token d'authentification
            },
        body: JSON.stringify({ //? Corps de la requête (données envoyées)
            id: id
        }),
        })
}
    
    

//* Fetching to add a work to the API 
export async function fetchToAdd(formAddData){
    try {
        await fetch(`http://localhost:5678/api/works`,{
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`,
            },
            body: formAddData          
        })
        .then(response => {
            if(response.ok){
                return response.json()
            }
            throw new Error('Une erreur est survenue')
        })
    } catch (error) {
        console.log(error)
    }
}
