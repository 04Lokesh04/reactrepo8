import './index.css'

import {BsFillStarFill} from 'react-icons/bs'

const SimilarJobCard = props => {
  const {details} = props
  const {
    companyLogoUrl,
    jobDescription,
    rating,
    title,
    employmentType,
    sililarjobloaction,
  } = details

  return (
    <div className="similarjobcard">
      <div className="similarsection1">
        <img
          className="similarcompanylogo"
          src={companyLogoUrl}
          alt="similar job company logo"
        />
        <div className="similarbrandis">
          <h1 className="similarcompanytitle">{title}</h1>
          <div className="similarrate">
            <BsFillStarFill className="similarstarimage" />
            <p className="similarratingpara">{rating}</p>
          </div>
        </div>
      </div>
      <p className="similarpara">{sililarjobloaction}</p>
      <p className="similarpara">{employmentType}</p>
      <h1 className="similarheading">Description</h1>
      <p className="similarpara">{jobDescription}</p>
    </div>
  )
}

export default SimilarJobCard
