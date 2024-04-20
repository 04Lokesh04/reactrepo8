import './index.css'

import {Link} from 'react-router-dom'

import Header from '../Header'

const Home = () => (
  <>
    <Header />
    <div className="homecard">
      <h1 className="homeHeading">Find The Job That Fits Your Life</h1>
      <p className="homePara">
        Millions of people are searching for jobs, salary information, company
        reviews. Find the job that fits your abilities and potential.
      </p>
      <Link to="/jobs">
        <button className="homeButton" type="button">
          Find Jobs
        </button>
      </Link>
    </div>
  </>
)

export default Home
