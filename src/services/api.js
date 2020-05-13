import axios from 'axios'

const api = axios.create({
    baseURL: 'https://jokenpo-back-end.herokuapp.com/'
})

export default api