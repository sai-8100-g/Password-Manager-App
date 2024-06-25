import './index.css'

const PasswordItem = props => {
  const {passwordObj, deletePassword, isShowPassword} = props
  const {webSiteName, userName, password, id} = passwordObj
  const initial = webSiteName.slice(0, 1)
  const deleting = () => {
    deletePassword(id)
  }

  return (
    <li>
      <div className="initial">
        <p>{initial}</p>
      </div>
      <div className="detailsCard">
        <p className="web">{webSiteName}</p>
        <p className="user">{userName}</p>
        {isShowPassword ? (
          <p className="code">{password}</p>
        ) : (
          <img
            src="https://assets.ccbp.in/frontend/react-js/password-manager-stars-img.png"
            alt="stars"
            className="stars"
          />
        )}
      </div>
      <div className="deleteIcon">
        <button type="button" data-testid="delete" onClick={deleting}>
          <img
            src="https://assets.ccbp.in/frontend/react-js/password-manager-delete-img.png "
            alt="delete"
          />
        </button>
      </div>
    </li>
  )
}

export default PasswordItem
