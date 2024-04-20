import './index.css'

import Cookies from 'js-cookie'

import Loader from 'react-loader-spinner'

import {Component} from 'react'

import {BsSearch} from 'react-icons/bs'

import JobCard from '../JobCard'

import Filters from '../Filters'

import Header from '../Header'

import Profile from '../Profile'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

const employmentTypesList = [
  {
    label: 'Full Time',
    employmentTypeId: 'FULLTIME',
  },
  {
    label: 'Part Time',
    employmentTypeId: 'PARTTIME',
  },
  {
    label: 'Freelance',
    employmentTypeId: 'FREELANCE',
  },
  {
    label: 'Internship',
    employmentTypeId: 'INTERNSHIP',
  },
]

const salaryRangesList = [
  {
    salaryRangeId: '1000000',
    label: '10 LPA and above',
  },
  {
    salaryRangeId: '2000000',
    label: '20 LPA and above',
  },
  {
    salaryRangeId: '3000000',
    label: '30 LPA and above',
  },
  {
    salaryRangeId: '4000000',
    label: '40 LPA and above',
  },
]

class Jobs extends Component {
  state = {
    jobitemList: [],
    apistatus: apiStatusConstants.initial,
    employementType: [],
    minimumPackage: 0,
    search: '',
  }

  componentDidMount() {
    this.getJobsList()
  }

  getJobsList = async () => {
    this.setState({apistatus: apiStatusConstants.inProgress})
    const {employementType, minimumPackage, search} = this.state

    const url = `https://apis.ccbp.in/jobs?employment_type=${employementType.join()}&minimum_package=${minimumPackage}&search=${search}`
    const jwtToken = Cookies.get('jwt_token')
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }

    const response = await fetch(url, options)

    if (response.ok === true) {
      const data = await response.json()
      const fetcheddata = data.jobs.map(each => ({
        companyLogoUrl: each.company_logo_url,
        employmentType: each.employment_type,
        id: each.id,
        jobDescription: each.job_description,
        location: each.location,
        packagePerAnnum: each.package_per_annum,
        rating: each.rating,
        title: each.title,
      }))

      this.setState({
        jobitemList: fetcheddata,
        apistatus: apiStatusConstants.success,
      })
    } else {
      this.setState({apistatus: apiStatusConstants.failure})
    }
  }

  changeemployementType = id => {
    const {employementType} = this.state
    if (employementType.includes(id) === false) {
      this.setState(
        prevState => ({
          employementType: [...prevState.employementType, id],
        }),

        this.getJobsList,
      )
    } else {
      const removeemployment = employementType.filter(each => each.id !== id)

      this.setState({employementType: removeemployment}, this.getJobsList)
    }
  }

  changesalaryRangesList = id => {
    this.setState({minimumPackage: id}, this.getJobsList)
  }

  renderFiltersCard = () => (
    <Filters
      employmentTypesList={employmentTypesList}
      salaryRangesList={salaryRangesList}
      changeemployementType={this.changeemployementType}
      changesalaryRangesList={this.changesalaryRangesList}
    />
  )

  searchJobs = event => {
    this.setState({search: event.target.value})
  }

  entersearch = event => {
    if (event.key === 'Enter') {
      this.getJobsList()
    }
  }

  applysearched = () => {
    this.getJobsList()
  }

  rendersuccessjobs = () => {
    const {jobitemList, search} = this.state
    const renderjobscardlists = jobitemList.length > 0
    return renderjobscardlists ? (
      <div className="jobsCard">
        <div className="searchcard">
          <input
            className="searchjob"
            type="search"
            placeholder="Search"
            value={search}
            onChange={this.searchJobs}
            onKeyDown={this.entersearch}
          />
          <button
            type="button"
            className="searchbutton"
            data-testid="searchButton"
            onClick={this.applysearched}
          >
            <BsSearch className="search-icon" />.
          </button>
        </div>

        <ul className="jobscardlist">
          {jobitemList.map(each => (
            <JobCard details={each} key={each.id} />
          ))}
        </ul>
      </div>
    ) : (
      <div className="emptyjoblist">
        <div className="searchcard">
          <input
            className="searchjob"
            type="search"
            placeholder="Search"
            value={search}
            onChange={this.searchJobs}
            onKeyDown={this.entersearch}
          />
          <button
            type="button"
            className="searchbutton"
            data-testid="searchButton"
            onClick={this.applysearched}
          >
            <BsSearch className="search-icon" />.
          </button>
        </div>
        <img
          className="emptylistimage"
          src="https://assets.ccbp.in/frontend/react-js/no-jobs-img.png"
          alt="no jobs"
        />
        <h1 className="emptylistheading">No Jobs Found</h1>
        <p className="emptylistpara">
          We could not find any jobs. Try other filters
        </p>
      </div>
    )
  }

  fetchjobitem = () => {
    this.getJobsList()
  }

  renderfailurejobs = () => (
    <div className="failurejobcard">
      <img
        className="failurejobImage"
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
        alt="failure view"
      />
      <h1 className="failurejobheading">Oops! Something Went Wrong</h1>
      <p className="failurejobpara">
        We cannot seem to find the page you are looking for
      </p>
      <button
        className="failurejobbutton"
        type="button"
        onClick={this.fetchjobitem}
      >
        Retry
      </button>
    </div>
  )

  renderjobs = () => {
    const {apistatus} = this.state
    switch (apistatus) {
      case apiStatusConstants.failure:
        return this.renderfailurejobs()
      case apiStatusConstants.success:
        return this.rendersuccessjobs()
      case apiStatusConstants.inProgress:
        return (
          <div className="loader-container" data-testid="loader">
            <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
          </div>
        )
      default:
        return null
    }
  }

  render() {
    return (
      <>
        <Header />
        <div className="jobsmain">
          <div className="filterCard">
            <Profile />
            <div>{this.renderFiltersCard()}</div>
          </div>
          <div>{this.renderjobs()}</div>
        </div>
      </>
    )
  }
}

export default Jobs
