import React, { Component } from 'react'


export default class Game extends Component {
    constructor(props){
        super(props)

        this.state = {
            value: ""
        }
    }

    render(){
        return(
            <h1>Você está logado</h1>
        )
    }
}