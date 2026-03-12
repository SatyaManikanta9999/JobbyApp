import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import {FaStar} from 'react-icons/fa'
import {MdLocationOn} from 'react-icons/md'
import {BsBriefcaseFill} from 'react-icons/bs'
import Header from '../Header'
import './index.css'

class JobItemDetails extends Component {
  state = {job: null, similar: [], status: 'LOADING'}

  componentDidMount() {
    this.getDetails()
  }

  getDetails = async () => {
    const {id} = this.props.match.params
    const token = Cookies.get('jwt_token')

    const r = await fetch(`https://apis.ccbp.in/jobs/${id}`, {
      headers: {Authorization: `Bearer ${token}`},
    })

    if (r.ok) {
      const d = await r.json()
      this.setState({
        job: d.job_details,
        similar: d.similar_jobs,
        status: 'SUCCESS',
      })
    } else {
      this.setState({status: 'FAIL'})
    }
  }

  render() {
    const {job, similar, status} = this.state

    return (
      <>
        <Header />

        {status === 'LOADING' && (
          <div className="loader-container" data-testid="loader">
            <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
          </div>
        )}

        {status === 'FAIL' && (
          <div className="fail">
            <img
              src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
              alt="failure view"
            />
            <h1>Oops! Something Went Wrong</h1>
            <button onClick={this.getDetails}>Retry</button>
          </div>
        )}

        {status === 'SUCCESS' && job && (
          <div className="job-bg">
            {/* MAIN CARD */}
            <div className="job-card">
              {/* HEADER */}
              <div className="job-header">
                <img
                  src={job.company_logo_url}
                  alt="job details company logo"
                  className="logo"
                />

                <div>
                  <h2>{job.title}</h2>
                  <p className="rating">
                    {job.rating} <FaStar color="#fbbf24" />
                  </p>
                </div>
              </div>

              {/* INFO */}
              <div className="job-info">
                <div className="left-info">
                  <p>
                    <MdLocationOn /> {job.location}
                  </p>
                  <p>
                    <BsBriefcaseFill /> {job.employment_type}
                  </p>
                </div>
                <p className="salary">{job.package_per_annum}</p>
              </div>

              <hr />

              {/* DESCRIPTION */}
              <div className="desc-row">
                <h3>Description</h3>

                <a
                  href={job.company_website_url}
                  target="_blank"
                  rel="noreferrer"
                >
                  Visit
                </a>
              </div>

              <p>{job.job_description}</p>

              {/* SKILLS */}
              <h3>Skills</h3>

              <ul className="skills-grid">
                {job.skills.map(skill => (
                  <li key={skill.name} className="skill">
                    <img src={skill.image_url} alt={skill.name} />
                    <p>{skill.name}</p>
                  </li>
                ))}
              </ul>

              {/* LIFE */}
              <h3>Life at Company</h3>

              <div className="life">
                <p>{job.life_at_company.description}</p>

                <img
                  src={job.life_at_company.image_url}
                  alt="life at company"
                />
              </div>
            </div>

            {/* SIMILAR JOBS */}
            <h2 className="similar-title">Similar Jobs</h2>

            <ul className="similar-list">
              {similar.map(s => (
                <li key={s.id} className="similar-card">
                  <img
                    src={s.company_logo_url}
                    alt="similar job company logo"
                    className="logo"
                  />

                  <h3>{s.title}</h3>

                  <p>
                    {s.rating} <FaStar color="#fbbf24" />
                  </p>

                  <p>{s.location}</p>
                  <p>{s.employment_type}</p>

                  <h4>Description</h4>
                  <p>{s.job_description}</p>
                </li>
              ))}
            </ul>
          </div>
        )}
      </>
    )
  }
}

export default JobItemDetails
