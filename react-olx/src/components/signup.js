import React, { Component } from 'react';
import { connect } from 'react-redux';
import { signup } from '../store/action/auth';
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


class Signup extends Component {

    state = {
        name: '',
        email: '',
        password: '',
    }
    emailFormHandler(event) {
        this.setState({
            email: event.target.value,
        })
    }
    nameFormHandler(event) {
        this.setState({
            name: event.target.value,
        })
    }
    passwordFormHandler(event) {
        this.setState({
            password: event.target.value,
        })
    }
    SignUp() {
        this.props.signupAction(this.state.name, this.state.email, this.state.password)
    }
    render() {
        return (
            <div>
                <div className="container">
                    <h1 id="hed">Register</h1>
                    <p>Please fill in this form to create an account.</p>
                    <hr />

                    <label><b>Name</b>
                        <input type="text" value={this.state.name} id='namer' onChange={this.nameFormHandler.bind(this)}
                            placeholder="Enter Your Name" required />
                    </label>

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

                    <button onClick={this.SignUp.bind(this)} className="registerbtn">Register</button>
                </div>

                <div className="container signin">
                    <p>Already have an account? <Link to="/signin">Login Here</Link>.</p>
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
        signupAction: (name, email, password) => {
            dispatch(signup(name, email, password))
        }
    })
}

export default connect(mapStateToProps, mapDispatchToProps)(Signup);

