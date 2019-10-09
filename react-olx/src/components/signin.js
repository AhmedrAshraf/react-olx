import React, { Component } from 'react';
import { connect } from 'react-redux';
import { signin } from '../store/action/auth';
import { Link } from 'react-router-dom';
import './signup.css';
import loaderlogo from './loader.gif'

const errorStyle = {
    color: 'white',
    border: '1px solid red',
    backgroundColor: 'red',
    padding: '5px',
    boxShadow: '1px 1px 2px black',
    fontWeight: 'bold',
} 

class Signin extends Component {

    state = {
        email: '',
        password: '',
    }
    emailFormHandler(event) {
        this.setState({
            email: event.target.value,
        })
    }
    passwordFormHandler(event) {
        this.setState({
            password: event.target.value,
        })
    }
    SignIn() {
        this.props.signinAction(this.state.email, this.state.password)
    }
    render() {
        return (
            <div>
                <div className="container">
                    <h1 id="hed">Login</h1>
                    <p>login your account here.</p>
                    <hr />

                    <label><b>Email</b>
                        <input type="text" value={this.state.email} id='emailr' onChange={this.emailFormHandler.bind(this)}
                            placeholder="Enter Email" required />
                    </label>

                    <label><b>Password</b>
                        <input type="password" value={this.state.password} id='pswr' onChange={this.passwordFormHandler.bind(this)}
                            placeholder="Enter Password" required />
                    </label>
                    {
                        (this.props.loader === true) ? (<img src={loaderlogo} alt="loading" id="loaderLogo" />) : null
                    }
                    {
                        (this.props.showError === true) ? (<div style={errorStyle}>{this.props.errorMessage}</div>) : null
                    }
                    <hr />
                    <p>By creating an account you agree to our Terms & Privacy.</p>

                    <button onClick={this.SignIn.bind(this)} className="registerbtn">Login</button>
                </div>

                <div className="container signin">
                    <p>Don`t have an account? <Link to="/">Register Here</Link>.</p>
                </div>
            </div>
        )
    }
}
function mapStateToProps(state) {
    return ({
        loader: state.basicInfo.loader,
        showError: state.basicInfo.showError,
        errorMessage: state.basicInfo.errorMessage,
    
    })
}

function mapDispatchToProps(dispatch) {
    return ({
        signinAction: (email, password) => {
            dispatch(signin(email, password))
        }
    })
}

export default connect(mapStateToProps, mapDispatchToProps)(Signin);

