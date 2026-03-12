import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import {Link} from 'react-router-dom'
import {FaStar} from 'react-icons/fa'
import {BsSearch, BsBriefcaseFill} from 'react-icons/bs'
import {MdLocationOn} from 'react-icons/md'
import {employmentTypesList, salaryRangesList} from '../../App'
import Header from '../Header'

import './index.css'

class Jobs extends Component {
  state = {
    profile: null,
    profileFail: false,
    jobs: [],
    search: '',
    emp: [],
    salary: '',
    status: 'LOADING',
  }

  componentDidMount() {
    this.getProfile()
    this.getJobs()
  }

  getProfile = async () => {
    const token = Cookies.get('jwt_token')

    const r = await fetch('https://apis.ccbp.in/profile', {
      headers: {Authorization: `Bearer ${token}`},
    })

    if (r.ok) {
      const d = await r.json()
      this.setState({profile: d.profile_details, profileFail: false})
    } else {
      this.setState({profileFail: true})
    }
  }

  getJobs = async () => {
    this.setState({status: 'LOADING'})

    const {search, emp, salary} = this.state
    const token = Cookies.get('jwt_token')

    const url = `https://apis.ccbp.in/jobs?employment_type=${emp.join(
      ',',
    )}&minimum_package=${salary}&search=${search}`

    const r = await fetch(url, {
      headers: {Authorization: `Bearer ${token}`},
    })

    if (r.ok) {
      const d = await r.json()
      this.setState({jobs: d.jobs, status: 'SUCCESS'})
    } else {
      this.setState({status: 'FAIL'})
    }
  }

  toggleEmp = id => {
    this.setState(p => {
      const arr = p.emp.includes(id)
        ? p.emp.filter(x => x !== id)
        : [...p.emp, id]
      return {emp: arr}
    }, this.getJobs)
  }

  setSalary = id => {
    this.setState({salary: id}, this.getJobs)
  }

  render() {
    const {profile, profileFail, jobs, status} = this.state

    return (
      <>
        <Header />

        <div className="jobs-layout">
          {/* LEFT SIDEBAR */}
          <div className="left">
            {profile && (
              <div className="profile">
                <img src={profile.profile_image_url} alt="profile" />
                <h1>{profile.name}</h1>
                <p>{profile.short_bio}</p>
              </div>
            )}

            {profileFail && (
              <button type="button" onClick={this.getProfile}>
                Retry
              </button>
            )}

            <h1>Type of Employment</h1>
            <ul>
              {employmentTypesList.map(e => (
                <li key={e.employmentTypeId}>
                  <input
                    id={e.employmentTypeId}
                    type="checkbox"
                    onChange={() => this.toggleEmp(e.employmentTypeId)}
                  />
                  <label htmlFor={e.employmentTypeId}>{e.label}</label>
                </li>
              ))}
            </ul>

            <h1>Salary Range</h1>
            <ul>
              {salaryRangesList.map(s => (
                <li key={s.salaryRangeId}>
                  <input
                    id={s.salaryRangeId}
                    type="radio"
                    name="salary"
                    onChange={() => this.setSalary(s.salaryRangeId)}
                  />
                  <label htmlFor={s.salaryRangeId}>{s.label}</label>
                </li>
              ))}
            </ul>
          </div>

          {/* RIGHT SIDE */}
          <div className="right">
            {/* SEARCH BOX */}
            <div className="search-box">
              <input
                type="search"
                placeholder="Search"
                className="search-input"
                onChange={e => this.setState({search: e.target.value})}
              />

              <button
                type="button"
                data-testid="searchButton"
                className="search-btn"
                onClick={this.getJobs}
              >
                <BsSearch />
              </button>
            </div>

            {/* LOADER */}
            {status === 'LOADING' && (
              <div className="loader-container" data-testid="loader">
                <Loader
                  type="ThreeDots"
                  color="#ffffff"
                  height="50"
                  width="50"
                />
              </div>
            )}

            {/* FAILURE */}
            {status === 'FAIL' && (
              <div className="no">
                <img
                  src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
                  alt="failure view"
                />
                <h1>Oops! Something Went Wrong</h1>
                <button onClick={this.getJobs}>Retry</button>
              </div>
            )}

            {/* JOB LIST */}
            {status === 'SUCCESS' && jobs.length > 0 && (
              <ul>
                {jobs.map(j => (
                  <li key={j.id} className="card">
                    <Link to={`/jobs/${j.id}`} className="job-link">
                      {/* LOGO + TITLE + RATING */}
                      <div className="job-header">
                        <img
                          src={j.company_logo_url}
                          alt="company logo"
                          className="company-logo"
                        />

                        <div className="header-text">
                          <h3>{j.title}</h3>

                          <p className="rating">
                            {j.rating} <FaStar color="#fbbf24" />
                          </p>
                        </div>
                      </div>

                      {/* LOCATION + TYPE + SALARY */}
                      <div className="job-info">
                        <div className="left-info">
                          <p>
                            <MdLocationOn /> {j.location}
                          </p>

                          <p>
                            <BsBriefcaseFill /> {j.employment_type}
                          </p>
                        </div>

                        <p className="salary">{j.package_per_annum}</p>
                      </div>

                      <hr className="divider" />

                      <h4>Description</h4>
                      <p>{j.job_description}</p>
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </>
    )
  }
}

export default Jobs
