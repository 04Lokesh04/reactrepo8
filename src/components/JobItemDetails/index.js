import './index.css'

import Cookies from 'js-cookie'

import {Component} from 'react'

import Loader from 'react-loader-spinner'

import {BsFillStarFill, BsFillBagFill} from 'react-icons/bs'

import {FaMapMarkerAlt, FaExternalLinkAlt} from 'react-icons/fa'

import SimilarJobCard from '../SimilarJobCard'
import Header from '../Header'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}
class JobItemDetails extends Component {
  state = {
    jobDetails: {},
    skills: [],
    companylife: {},
    similarJobs: [],
    apistatusIs: apiStatusConstants.initial,
  }

  componentDidMount() {
    this.getJobDetails()
  }

  getJobDetails = async () => {
    this.setState({apistatusIs: apiStatusConstants.inProgress})
    const {match} = this.props
    const {params} = match
    const {id} = params
    console.log(id)
    const jwtToken = Cookies.get('jwt_token')
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const url = `https://apis.ccbp.in/jobs/${id}`
    const response = await fetch(url, options)
    console.log(response)
    if (response.ok === true) {
      const data = await response.json()
      const formatJobdetails = {
        companyLogoUrl: data.job_details.company_logo_url,
        companyWebsiteUrl: data.job_details.company_website_url,
        employmentType: data.job_details.employment_type,
        id: data.job_details.id,
        jobDescription: data.job_details.job_description,
        companyLocation: data.job_details.location,
        companyPackagePerAnnum: data.job_details.package_per_annum,
        companyrating: data.job_details.rating,
        companytitle: data.job_details.title,
      }
      const formatskills = data.job_details.skills.map(each => ({
        imageUrl: each.image_url,
        name: each.name,
      }))
      const formatlifetAtCompany = {
        lifeAtCompanydescription: data.job_details.life_at_company.description,
        lifeAtCompanyimageUrl: data.job_details.life_at_company.image_url,
      }
      const formatsimilarJobs = data.similar_jobs.map(each => ({
        companyLogoUrl: each.company_logo_url,
        employmentType: each.employment_type,
        id: each.id,
        jobDescription: each.job_description,
        sililarjobloaction: each.location,
        rating: each.rating,
        title: each.title,
      }))

      this.setState({
        jobDetails: formatJobdetails,
        skills: formatskills,
        companylife: formatlifetAtCompany,
        similarJobs: formatsimilarJobs,
        apistatusIs: apiStatusConstants.success,
      })
    } else {
      this.setState({apistatusIs: apiStatusConstants.failure})
    }
  }

  fetchjobitem = () => {
    this.getJobDetails()
  }

  renderLoader = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  renderFailure = () => (
    <>
      <Header />
      <div className="failurecard">
        <img
          className="failureImage"
          src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
          alt="failure view"
        />
        <h1 className="failureheading">Oops! Something Went Wrong</h1>
        <p className="failurepara">
          We cannot seem to find the page you are looking for
        </p>
        <button
          className="failurebutton"
          type="button"
          onClick={this.fetchjobitem}
        >
          Retry
        </button>
      </div>
    </>
  )

  rendersuccess = () => {
    const {jobDetails, skills, companylife, similarJobs} = this.state
    const {
      companyLogoUrl,
      companyWebsiteUrl,
      employmentType,
      jobDescription,
      companyLocation,
      companyPackagePerAnnum,
      companyrating,
      companytitle,
    } = jobDetails
    const {lifeAtCompanydescription, lifeAtCompanyimageUrl} = companylife

    return (
      <>
        <Header />
        <div className="jobitembackground">
          <div className="aboutjobdetails">
            <div className="aboutjobsection1">
              <img
                className="jobcompanylogo"
                src={companyLogoUrl}
                alt=" job details company logo"
              />
              <div className="jobbrandis">
                <h1 className="jobcompanytitle">{companytitle}</h1>
                <div className="jobrate">
                  <BsFillStarFill className="jobstarimage" />
                  <p className="jobratingpara">{companyrating}</p>
                </div>
              </div>
            </div>
            <div className="jobsection2">
              <div className="jobsubsection">
                <FaMapMarkerAlt className="jobiconimage" />
                <p className="jobsubsectionpara">{companyLocation}</p>
              </div>
              <div className="jobsubsection">
                <BsFillBagFill className="jobiconimage" />
                <p className="jobsubsectionpara">{employmentType}</p>
              </div>
              <p className="jobpackageparea">{companyPackagePerAnnum}</p>
            </div>
            <hr className="jobbreakline" />
            <div className="jobdescriptionscard">
              <h1 className="jobdetailsheading">Description</h1>
              <a className="website" href={companyWebsiteUrl}>
                Visit <FaExternalLinkAlt />
              </a>
            </div>
            <p className="jobdetailspara">{jobDescription}</p>
            <h1 className="jobskillsheading">Skills</h1>
            <ul className="skillLists">
              {skills.map(each => (
                <li className="skillsection" key={each.name}>
                  <img
                    className="skillsimage"
                    src={each.imageUrl}
                    alt={each.name}
                  />
                  <p className="skillspara">{each.name}</p>
                </li>
              ))}
            </ul>
            <div className="lifeatcompanycard">
              <div className="lifeatcompanytext">
                <h1 className="lifeatcompanyheading">Life at Company</h1>
                <p className="lifeatcompanypara">{lifeAtCompanydescription}</p>
              </div>
              <img
                className="lifeatcompanyimage"
                src={lifeAtCompanyimageUrl}
                alt=" life at company"
              />
            </div>
          </div>
          <div className="similarjobsdetails">
            <h1 className="simialaerheading">Similar Jobs</h1>
            <ul className="similarjobsList">
              {similarJobs.map(each => (
                <SimilarJobCard details={each} key={each.id} />
              ))}
            </ul>
          </div>
        </div>
      </>
    )
  }

  renderany = () => {
    const {apistatusIs} = this.state
    switch (apistatusIs) {
      case 'SUCCESS':
        return this.rendersuccess()
      case 'FAILURE':
        return this.renderFailure()
      case 'IN_PROGRESS':
        return this.renderLoader()
      default:
        return null
    }
  }

  render() {
    return this.renderany()
  }
}

export default JobItemDetails
