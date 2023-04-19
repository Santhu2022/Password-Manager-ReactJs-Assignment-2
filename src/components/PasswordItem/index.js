import './index.css'

const PasswordItem = props => {
  const {pswDetails, showPasswords, deletePassword} = props
  const {websiteUrl, username, password, id} = pswDetails
  const onClickDeleteIcon = () => {
    deletePassword(id)
  }
  return (
    <li className="password-item">
      <div className="password-item-logo">{websiteUrl[0].toUpperCase()}</div>
      <div>
        <p className="item-text">{websiteUrl}</p>
        <p className="item-text">{username}</p>

        {showPasswords ? (
          <p className="item-text">{password}</p>
        ) : (
          <img
            className="stars-image"
            src="https://assets.ccbp.in/frontend/react-js/password-manager-stars-img.png"
            alt="stars"
          />
        )}
      </div>
      <button
        type="button"
        className="delete-button"
        data-testid="delete"
        onClick={onClickDeleteIcon}
      >
        <img
          className="delete-icon"
          src="https://assets.ccbp.in/frontend/react-js/password-manager-delete-img.png"
          alt="delete"
        />
      </button>
    </li>
  )
}

export default PasswordItem
