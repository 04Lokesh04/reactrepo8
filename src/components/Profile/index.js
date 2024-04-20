import './index.css'

import Cookies from 'js-cookie'

import Loader from 'react-loader-spinner'

import {Component} from 'react'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class Profile extends Component {
  state = {
    profiledata: [],
    profileapiStatus: apiStatusConstants.initial,
  }

  componentDidMount() {
    this.getProfiledetails()
  }

  getProfiledetails = async () => {
    this.setState({profileapiStatus: apiStatusConstants.inProgress})
    const url = 'https://apis.ccbp.in/profile'
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
      const formattedprofiledata = {
        name: data.profile_details.name,
        profileImageUrl: data.profile_details.profile_image_url,
        shortBio: data.profile_details.short_bio,
      }
      this.setState({
        profiledata: formattedprofiledata,
        profileapiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({profileapiStatus: apiStatusConstants.failure})
    }
  }

  fetchProfileAgain = () => {
    this.getProfiledetails()
  }

  render() {
    const {profiledata, profileapiStatus} = this.state
    const {name, profileImageUrl, shortBio} = profiledata
    switch (profileapiStatus) {
      case 'FAILURE':
        return (
          <button
            className="profileretry"
            type="button"
            onClick={this.fetchProfileAgain}
          >
            Retry
          </button>
        )
      case 'SUCCESS':
        return (
          <div className="profilecard">
            <img className="profileImage" src={profileImageUrl} alt="profile" />
            <h1 className="profileHeading">{name}</h1>
            <p className="profilepara">{shortBio}</p>
          </div>
        )
      case 'IN_PROGRESS':
        return (
          <div className="loader-container" data-testid="loader">
            <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
          </div>
        )
      default:
        return null
    }
  }
}

export default Profile
