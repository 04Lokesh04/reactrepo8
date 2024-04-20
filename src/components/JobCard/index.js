import './index.css'

import {Link} from 'react-router-dom'

import {BsFillStarFill, BsFillBagFill} from 'react-icons/bs'

import {FaMapMarkerAlt} from 'react-icons/fa'

const JobCard = props => {
  const {details} = props
  const {
    companyLogoUrl,
    employmentType,
    id,
    jobDescription,
    location,
    packagePerAnnum,
    rating,
    title,
  } = details
  console.log(id)
  return (
    <Link to={`/jobs/${id}`}>
      <li className="joblist">
        <div className="totalcard">
          <div className="section1">
            <img
              className="companylogo"
              src={companyLogoUrl}
              alt="company logo"
            />
            <div className="brandis">
              <h1 className="companytitle">{title}</h1>
              <div className="rate">
                <BsFillStarFill className="starimage" />
                <p className="ratingpara">{rating}</p>
              </div>
            </div>
          </div>
          <div className="section2">
            <div className="arrange">
              <div className="subsection">
                <FaMapMarkerAlt className="iconimage" />
                <p className="subsectionpara">{location}</p>
              </div>
              <div className="subsection">
                <BsFillBagFill className="iconimage" />
                <p className="subsectionpara">{employmentType}</p>
              </div>
            </div>
            <p className="packageparea">{packagePerAnnum}</p>
          </div>
          <hr className="breakline" />
          <h1 className="jobheading">Description</h1>
          <p className="jobpara">{jobDescription}</p>
        </div>
      </li>
    </Link>
  )
}

export default JobCard
