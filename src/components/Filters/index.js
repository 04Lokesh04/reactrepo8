import './index.css'

const Filters = props => {
  const {employmentTypesList, salaryRangesList} = props

  return (
    <>
      <div className="employecard">
        <hr className="line" />
        <h1 className="employepara">Types of Employment</h1>
        <ul className="employeList">
          {employmentTypesList.map(each => {
            const {changeemployementType} = props
            const selectemploytype = event => {
              changeemployementType(event.target.value)
            }
            return (
              <li
                className="employelist"
                key={each.employmentTypeId}
                onChange={selectemploytype}
              >
                <input
                  id={`employid ${each.employmentTypeId}`}
                  className="checkinput"
                  type="checkbox"
                  value={each.employmentTypeId}
                />
                <label
                  className="filterlabel"
                  id={`employid ${each.employmentTypeId}`}
                >
                  {each.label}
                </label>
              </li>
            )
          })}
        </ul>
      </div>
      <div className="salarycard">
        <hr className="line" />
        <h1 className="salarypara">Salary Range</h1>
        <ul className="salaryList">
          {salaryRangesList.map(each => {
            const {changesalaryRangesList} = props
            const changesalaryrange = () => {
              changesalaryRangesList(each.salaryRangeId)
            }
            return (
              <li
                className="salarylist"
                key={each.salaryRangeId}
                onClick={changesalaryrange}
              >
                <input
                  id={`salaryid ${each.salaryRangeId}`}
                  className="checkinput"
                  type="radio"
                  name="salary"
                />
                <label
                  className="filterlabel"
                  id={`salaryid ${each.salaryRangeId}`}
                >
                  {each.label}
                </label>
              </li>
            )
          })}
        </ul>
      </div>
    </>
  )
}

export default Filters
