import {Component} from 'react'
import {v4 as uuidv4} from 'uuid'
import PasswordItem from '../PasswordItem'

import './index.css'

const APP_LOGO =
  'https://assets.ccbp.in/frontend/react-js/password-manager-logo-img.png'
const PASSWORD_MANAGER_SM =
  'https://assets.ccbp.in/frontend/react-js/password-manager-sm-img.png'
const PASSWORD_MANAGER_LG =
  'https://assets.ccbp.in/frontend/react-js/password-manager-lg-img.png'
const USERNAME =
  'https://assets.ccbp.in/frontend/react-js/password-manager-username-img.png'
const WEBSITE =
  'https://assets.ccbp.in/frontend/react-js/password-manager-website-img.png'
const PASSWORD =
  'https://assets.ccbp.in/frontend/react-js/password-manager-password-img.png'
const SEARCH_ICON =
  'https://assets.ccbp.in/frontend/react-js/password-manager-search-img.png'
const NO_PASSWORD_IMAGE =
  'https://assets.ccbp.in/frontend/react-js/no-passwords-img.png'

const initpasswordsList = [
  {
    id: uuidv4(),
    websiteUrl: 'youtube.com',
    username: 'Santosh456',
    password: 'kumar123',
  },
  {
    id: uuidv4(),
    websiteUrl: 'gmail.com',
    username: 'Santosh789',
    password: 'san123345',
  },
]

class PasswordManager extends Component {
  state = {
    websiteUrl: '',
    username: '',
    password: '',
    passwordsList: initpasswordsList,
    showPasswords: false,
    searchInput: '',
  }

  addNewPassword = event => {
    event.preventDefault()
    const {username, password, websiteUrl} = this.state
    if (!(username && password && websiteUrl)) {
      return
    }
    const newPassword = {
      id: uuidv4(),
      websiteUrl,
      username,
      password,
    }
    this.setState(prevState => ({
      passwordsList: [...prevState.passwordsList, newPassword],
      websiteUrl: '',
      username: '',
      password: '',
    }))
  }

  deletePassword = id =>
    this.setState(prevState => ({
      passwordsList: prevState.passwordsList.filter(
        eachPsw => eachPsw.id !== id,
      ),
    }))

  onChangeCheckbox = event => {
    this.setState({showPasswords: event.target.checked})
  }

  onChangeSearchInput = event =>
    this.setState({searchInput: event.target.value})

  updateWebsiteUrl = event => this.setState({websiteUrl: event.target.value})

  updateUsername = event => this.setState({username: event.target.value})

  updatePassword = event => this.setState({password: event.target.value})

  getInputField = (
    logoUrl,
    placeholder,
    altText,
    type,
    functionName,
    value,
  ) => (
    <div className="input-field-container">
      <img className="input-field-logos" src={logoUrl} alt={altText} />
      <input
        type={type}
        placeholder={placeholder}
        className="input"
        onChange={functionName}
        value={value}
      />
    </div>
  )

  render() {
    const {
      websiteUrl,
      username,
      password,
      passwordsList,
      showPasswords,
      searchInput,
    } = this.state

    const searchedPasswordsList = passwordsList.filter(eachPsw =>
      eachPsw.websiteUrl.toLowerCase().includes(searchInput.toLowerCase()),
    )
    return (
      <div className="main-bg-container">
        <div className="app-container">
          <div>
            <img className="app-logo" src={APP_LOGO} alt="app logo" />
          </div>
          <div className="top-section">
            <img
              className="top-section-image"
              src={PASSWORD_MANAGER_SM}
              alt="password manager"
            />
            <img
              className="top-section-image-lg"
              src={PASSWORD_MANAGER_LG}
              alt="password manager"
            />
            <form
              className="password-input-container"
              onSubmit={this.addNewPassword}
            >
              <h1 className="add-new-passwd">Add New Password</h1>
              {this.getInputField(
                WEBSITE,
                'Enter Website',
                'website',
                'text',
                this.updateWebsiteUrl,
                websiteUrl,
              )}
              {this.getInputField(
                USERNAME,
                'Enter Username',
                'username',
                'text',
                this.updateUsername,
                username,
              )}
              {this.getInputField(
                PASSWORD,
                'Enter Password',
                'password',
                'password',
                this.updatePassword,
                password,
              )}
              <button type="submit" className="form-button">
                Add
              </button>
            </form>
          </div>
          <div className="bottom-section">
            <div className="your-password-search-container">
              <div className="your-count-container">
                <h1 className="your-password-text">Your Passwords</h1>
                <div className="counter-text">
                  <p>{passwordsList.length}</p>
                </div>
              </div>
              <div className="search-input-container">
                <img className="search-logo" src={SEARCH_ICON} alt="search" />
                <input
                  type="search"
                  placeholder="Search"
                  className="search-input"
                  onChange={this.onChangeSearchInput}
                />
              </div>
            </div>
            <hr className="separator" />
            <div className="checkbox-container">
              <input
                id="showPassword"
                type="checkbox"
                className="checkbox"
                onChange={this.onChangeCheckbox}
              />
              <label htmlFor="showPassword" className="your-password-text">
                Show Passwords
              </label>
            </div>

            {searchedPasswordsList.length > 0 ? (
              <ul className="password-items-list">
                {searchedPasswordsList.map(eachPsw => (
                  <PasswordItem
                    key={eachPsw.id}
                    pswDetails={eachPsw}
                    showPasswords={showPasswords}
                    deletePassword={this.deletePassword}
                  />
                ))}
              </ul>
            ) : (
              <div className="no-password-container">
                <img
                  className="no-passwords-image"
                  src={NO_PASSWORD_IMAGE}
                  alt="no passwords"
                />
                <p className="no-password-text">No Passwords</p>
              </div>
            )}
          </div>
        </div>
      </div>
    )
  }
}

export default PasswordManager
