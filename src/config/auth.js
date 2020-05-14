import jwt from 'jsonwebtoken'

export const isAuthenticated = () => {
    const token = localStorage.getItem('token') || ""
    if (token) {

        const decodedToken = jwt.decode(token, {complete: true});
        
        const dateNow = new Date()
        console.log(decodedToken, decodedToken.payload.exp, dateNow.getTime())

        // if (decodedToken.payload.exp < dateNow.getTime()) {
        //     console.log("Foi expirado")
        // } else {
        //     console.log("Válido")
        // }


        return true
    }
    return false
}


export const getToken = () => localStorage.getItem('token');
