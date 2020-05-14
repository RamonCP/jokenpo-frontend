import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import {TextField, Button, Backdrop, CircularProgress} from '@material-ui/core';

import api from '../../services/api'
import {isAuthenticated} from '../../config/auth'

import './style.css'

export default class Login extends Component {
    constructor(props) {
        super(props)

        this.state = {
            user: { 
                email: "",
                senha: "",
            },
            loading: false
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(e) {
        const state = Object.assign({}, this.state.user)
        const targetName = e.target.name
        state[targetName] = e.target.value
        this.setState({ user: state })
    }

    async handleSubmit(e) {
        e.preventDefault()

        this.setState({ loading: true })

        try {
            const response = await api.post('/jokenpo/login',this.state.user)
            const token = response.headers.authorization.replace('Bearer ','')
            
            if (token) {
                localStorage.setItem('token', token)
                this.forceUpdate()
            }

        } catch(e) {
            alert(e.message)
        }
    }

    render() {
        return(
            isAuthenticated() ? (
                <Redirect to="/game" />
            ) : (
                <>
                    <div className="form-login-container">
                        <div className="bgImage"></div>
                        <div className="form-login-content">
                            <h1>JoKenPo</h1>

                            <form onSubmit={this.handleSubmit} noValidate autoComplete="off">
                                <TextField type="email" name="email" label="Email" 
                                    fullWidth required style={{ marginBottom: 15 }} 
                                    onChange={this.handleChange} 
                                    />
                                <TextField type="password" name="senha" label="Senha" 
                                    fullWidth required style={{ marginBottom: 35 }} 
                                    onChange={this.handleChange} 
                                />
                                <Button type="submit" variant="contained" color="primary">Entrar</Button>
                            </form>
                        </div>
                    </div>

                    <Backdrop className="loading-login" open={this.state.loading}>
                        <CircularProgress color="inherit" />
                    </Backdrop>

                </>
            )   
        )
    }
}
