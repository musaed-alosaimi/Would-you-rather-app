import React from 'react'
import {Redirect} from 'react-router-dom'

export default class PageNotFoundComponent extends React.Component {

    state = {
        directToHome: false,
    }

    componentDidMount(){

        setTimeout(() => (this.setState({directToHome: true, })), 2000)

    }

    render() {

        return <div style={{textAlign: 'center', }}>

            <h2>404</h2>
            <h2>The page you are looking for doesn't exist.</h2>

            {this.state.directToHome && <Redirect to='/Home' />}

        </div>

    }
} 