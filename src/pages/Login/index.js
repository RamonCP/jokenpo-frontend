import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'

import api from '../../services/api'
import {isAuthenticated} from '../../config/auth'


export default class Login extends Component {
    constructor(props) {
        super(props)

        this.state = {
            email: "",
            senha: "" 
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(e) {
        const state = Object.assign({}, this.state)
        const targetName = e.target.name
        state[targetName] = e.target.value
        this.setState(state)
    }

    async handleSubmit(e) {
        e.preventDefault()
        try {
            const response = await api.post('/jokenpo/login',this.state)
            const token = response.headers.authorization.replace('Bearer ','')
            
            if (token) {
                localStorage.setItem('token', token)
                this.forceUpdate()
            }
            
            console.log(response)

        } catch(e) {
            alert(e.message)
        }
    }

    render() {
        return(
            isAuthenticated() ? (
                <Redirect to="/app" />
            ) : (

                <form onSubmit={this.handleSubmit}>
                    <label>
                        Nome:
                        <input type="email" name="email" onChange={this.handleChange} required />
                    </label>
                    <label>
                        Senha:
                        <input type="password" name="senha" onChange={this.handleChange} required />
                    </label>
                    <button>Entrar</button>
                </form>
            )   

        )
    }
}