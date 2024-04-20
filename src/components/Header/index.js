import './index.css'

import {Link, withRouter} from 'react-router-dom'

import Cookies from 'js-cookie'

const Header = props => {
  const onClickLogout = () => {
    Cookies.remove('jwt_token')
    const {history} = props
    history.replace('/login')
  }
  return (
    <nav className="navheader">
      <div className="Headercard">
        <ul className="navmenu">
          <li>
            <Link to="/">
              <img
                className="websitelogo"
                src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
                alt="website logo"
              />
            </Link>
          </li>
          <li className="navlink">
            <Link to="/">Home</Link>
          </li>
          <li className="navlink">
            <Link to="/jobs">Jobs</Link>
          </li>
        </ul>
        <button
          type="button"
          className="logout-desktop-btn"
          onClick={onClickLogout}
        >
          Logout
        </button>
      </div>
    </nav>
  )
}

export default withRouter(Header)
