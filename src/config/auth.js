import jwt from 'jsonwebtoken'

export const isAuthenticated = () => {
    const token = localStorage.getItem('token') || ""
    if (token) {

        const decodedToken = jwt.decode(token, {complete: true});
        const timestampNow = Math.floor(Date.now() / 1000)

        // console.log(decodedToken.payload.exp, timestampNow)

        if (decodedToken.payload.exp < timestampNow) {
            console.log("Sessão expirada")
            localStorage.removeItem('token')
            return false
        } else {
            console.log("Válido")
            return true
        }


        return true
    }
    return false
}


export const getToken = () => localStorage.getItem('token');
