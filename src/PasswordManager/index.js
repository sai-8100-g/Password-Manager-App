import {Component} from 'react'

import {v4 as uuidv4} from 'uuid'

import PasswordItem from '../PasswordItem'

import './index.css'

class Password extends Component {
  state = {
    passwordList: [],
    webAddress: '',
    userName: '',
    password: '',
    errorAll: false,
    isShowPassword: false,
    count: 0,
  }

  submitUserForm = event => {
    event.preventDefault()
    const {webAddress, userName, password} = this.state
    if (webAddress === '' || userName === '' || password === '') {
      this.setState({
        errorAll: webAddress === '' || userName === '' || password === '',
      })
    } else {
      this.setState({errorAll: false})
      const newPasswordObj = {
        id: uuidv4(),
        webSiteName: webAddress,
        userName,
        password,
      }

      this.setState(prevState => ({
        passwordList: [...prevState.passwordList, newPasswordObj],
        webAddress: '',
        userName: '',
        password: '',
        count: prevState.count + 1,
      }))
    }
  }

  addWebsiteAddress = event => {
    this.setState({webAddress: event.target.value})
  }

  addUserName = event => {
    this.setState({userName: event.target.value})
  }

  addPassword = event => {
    this.setState({password: event.target.value})
  }

  deletePassword = id => {
    this.setState(prevState => ({
      passwordList: prevState.passwordList.filter(eachObj => eachObj.id !== id),
      count: prevState.count - 1,
    }))
  }

  onToggle = () => {
    this.setState(prevState => ({isShowPassword: !prevState.isShowPassword}))
  }

  filteringObjs = event => {
    const input = event.target.value.toLocaleLowerCase()
    if (input === '') {
      this.setState({count: 0})
    }
    this.setState(prevState => ({
      passwordList: prevState.passwordList.filter(
        eachObj =>
          eachObj.webSiteName.toLocaleLowerCase().includes(input) ||
          eachObj.userName.toLocaleLowerCase().includes(input),
      ),
    }))
  }

  render() {
    const {
      passwordList,
      errorAll,
      webAddress,
      userName,
      password,
      isShowPassword,
      count,
    } = this.state
    console.log(isShowPassword)
    const isHavePasswords = passwordList.length !== 0
    return (
      <div className="main">
        <div className="logo">
          <img
            src="https://assets.ccbp.in/frontend/react-js/password-manager-logo-img.png"
            alt="app logo"
          />
        </div>
        <div className="uppercontainer">
          <form className="inputs" onSubmit={this.submitUserForm}>
            <h4>Add New Password</h4>
            <div className="website">
              <div className="logo-img">
                <img
                  src="https://assets.ccbp.in/frontend/react-js/password-manager-website-img.png "
                  alt="website"
                />
              </div>
              <input
                type="text"
                value={webAddress}
                onChange={this.addWebsiteAddress}
                placeholder="Enter Website"
              />
            </div>
            <div className="website">
              <div className="logo-img">
                <img
                  src="https://assets.ccbp.in/frontend/react-js/password-manager-username-img.png"
                  alt="username"
                />
              </div>
              <input
                type="text"
                value={userName}
                placeholder="Enter userName"
                onChange={this.addUserName}
              />
            </div>
            <div className="website">
              <div className="logo-img">
                <img
                  src="https://assets.ccbp.in/frontend/react-js/password-manager-password-img.png"
                  alt="password"
                />
              </div>
              <input
                type="password"
                value={password}
                placeholder="Enter Password"
                onChange={this.addPassword}
              />
            </div>
            <button type="submit">Add</button>
            {errorAll && <p className="error">please fill all the details</p>}
          </form>
          <div className="img-card">
            <img
              src="https://assets.ccbp.in/frontend/react-js/password-manager-lg-img.png"
              alt="password manager"
            />
          </div>
        </div>
        <div className="lowercontainer">
          <div className="lowerinput">
            <div className="count">
              <h1>Your Passwords</h1>
              <p>{count}</p>
            </div>
            <div className="searchInputCard">
              <div className="searchImg">
                <img
                  src="https://assets.ccbp.in/frontend/react-js/password-manager-search-img.png"
                  alt=" search"
                />
              </div>
              <input
                type="search"
                placeholder="search"
                onChange={this.filteringObjs}
              />
            </div>
          </div>
          <hr />
          <div className="checkboxcard">
            <input id="checkbox" type="checkbox" onClick={this.onToggle} />
            <label htmlFor="checkbox">Show passwords</label>
          </div>
          {isHavePasswords === false ? (
            <div className="lowerimage">
              <img
                src="https://assets.ccbp.in/frontend/react-js/no-passwords-img.png"
                alt="no passwords"
              />
              <p>No Passwords</p>
            </div>
          ) : (
            <ul>
              {passwordList.map(eachObj => (
                <PasswordItem
                  passwordObj={eachObj}
                  isShowPassword={isShowPassword}
                  key={eachObj.id}
                  deletePassword={this.deletePassword}
                />
              ))}
            </ul>
          )}
        </div>
      </div>
    )
  }
}

export default Password
