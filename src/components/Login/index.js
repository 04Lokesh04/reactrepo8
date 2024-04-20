import './index.css'

import {Redirect} from 'react-router-dom'

import Cookies from 'js-cookie'

import {Component} from 'react'

class Login extends Component {
  state = {username: '', password: '', showerror: '', errorMsg: ''}

  changeUsername = event => {
    this.setState({username: event.target.value})
  }

  changePassword = event => {
    this.setState({password: event.target.value})
  }

  submitSuccess = jwtToken => {
    const {history} = this.props
    Cookies.set('jwt_token', jwtToken, {expires: 45})

    history.replace('/')
  }

  submitFailure = errorMsg => {
    this.setState({showerror: true, errorMsg})
  }

  submitForm = async event => {
    event.preventDefault()
    const {username, password} = this.state

    const userDetails = {username, password}

    const url = 'https://apis.ccbp.in/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }

    const response = await fetch(url, options)
    const data = await response.json()
    if (response.ok === true) {
      this.submitSuccess(data.jwt_token)
    } else {
      this.submitFailure(data.error_msg)
    }
  }

  render() {
    const {username, password, showerror, errorMsg} = this.state
    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }
    return (
      <div className="background">
        <div className="main">
          <form className="formcard" onSubmit={this.submitForm}>
            <img
              className="loginimage"
              src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
              alt="website logo"
            />
            <div className="details">
              <label className="label" htmlFor="username">
                USERNAME
              </label>
              <input
                id="username"
                type="text"
                className="input"
                placeholder="Username"
                value={username}
                onChange={this.changeUsername}
              />
            </div>
            <div className="details">
              <label className="label" htmlFor="password">
                PASSWORD
              </label>
              <input
                className="input"
                placeholder="Password"
                value={password}
                onChange={this.changePassword}
                type="password"
                id="password"
              />
            </div>
            <button className="loginButton" type="submit">
              Login
            </button>
            {showerror && <p className="errorpara">*{errorMsg}</p>}
          </form>
        </div>
      </div>
    )
  }
}

export default Login
