import './index.css'

import Header from '../Header'

const NotFound = () => (
  <>
    <Header />
    <div className="notfound">
      <img
        src="https://assets.ccbp.in/frontend/react-js/jobby-app-not-found-img.png"
        alt="not found"
        className="not-found-img"
      />
      <h1 className="notfoundheading">Page Not Found</h1>
      <p className="notfoundpara">
        We are sorry, the page you requested could not be found
      </p>
    </div>
  </>
)

export default NotFound
