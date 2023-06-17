
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
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(user),               
        })
        .then(response => {                                                    
            if(response.ok){                                                    
                return response.json()                                          
            }
            throw new Error('Email ou mot de passe incorrect')
        })
        .then(user => {                                                         
            localStorage.setItem('token', user.token)                           
        })
        .finally(() => {                                                       
            if(localStorage.getItem('token')){                                 
                window.location.reload()                                      
            }
        })
    } catch (error) {
        alert(error)
    }
}

//* Fetching to delete a work from the API
export async function fetchToDelete(id){
        await fetch(`http://localhost:5678/api/works/${id}`,{
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            },
        body: JSON.stringify({
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
