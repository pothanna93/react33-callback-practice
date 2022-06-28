import {Component} from 'react'
import Loader from 'react-loader-spinner'
import LanguageFilterItem from '../LanguageFilterItem'
import RepositoryItem from '../RepositoryItem'

import './index.css'

const languageFiltersData = [
  {id: 'ALL', language: 'All'},
  {id: 'JAVASCRIPT', language: 'Javascript'},
  {id: 'RUBY', language: 'Ruby'},
  {id: 'JAVA', language: 'Java'},
  {id: 'CSS', language: 'CSS'},
]

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class GithubPopularRepos extends Component {
  state = {
    websiteLists: [],
    apiStatus: apiStatusConstants.initial,
    activeLanguageFilterId: languageFiltersData[0].id,
  }

  componentDidMount() {
    this.getListItems()
  }

  getListItems = async () => {
    const {activeLanguageFilterId} = this.state
    this.setState({apiStatus: apiStatusConstants.inProgress})

    const url = `https://apis.ccbp.in/popular-repos?language=${activeLanguageFilterId}`
    const response = await fetch(url)
    if (response.ok === true) {
      const data = await response.json()
      const fetchedData = data.popular_repos.map(eachList => ({
        id: eachList.id,
        name: eachList.name,
        avatarUrl: eachList.avatar_url,
        forksCount: eachList.forks_count,
        issuesCount: eachList.issues_count,
        starsCount: eachList.stars_count,
      }))
      this.setState({
        websiteLists: fetchedData,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({
        apiStatus: apiStatusConstants.failure,
      })
    }
  }

  renderLoadingView = () => (
    <div testid="loader">
      <Loader color="#0284c7" height={80} width={80} type="ThreeDots" />
    </div>
  )

  renderFailureView = () => (
    <div className="failure-view-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/api-failure-view.png"
        alt="failure view"
        className="failure-img"
      />
      <h1 className="went-wrong-title">Something Went Wrong</h1>
    </div>
  )

  renderWebSiteList = () => {
    const {websiteLists} = this.state
    return (
      <ul className="web-list-container">
        {websiteLists.map(eachWeb => (
          <RepositoryItem key={eachWeb.id} websiteDetails={eachWeb} />
        ))}
      </ul>
    )
  }

  renderRepositoryItems = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderWebSiteList()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      case apiStatusConstants.inProgress:
        return this.renderLoadingView()
      default:
        return null
    }
  }

  setActiveLanguageFilterId = newFilterId => {
    this.setState({activeLanguageFilterId: newFilterId}, this.getListItems)
  }

  renderLanguageListItems = () => {
    const {activeLanguageFilterId} = this.state

    return (
      <ul className="language-list-items">
        {languageFiltersData.map(eachItem => (
          <LanguageFilterItem
            key={eachItem.id}
            languageDetails={eachItem}
            setActiveLanguageFilterId={this.setActiveLanguageFilterId}
            isActive={eachItem.id === activeLanguageFilterId}
          />
        ))}
      </ul>
    )
  }

  render() {
    return (
      <div className="app-container">
        <h1 className="heading">Popular</h1>
        {this.renderLanguageListItems()}
        {this.renderRepositoryItems()}
      </div>
    )
  }
}
export default GithubPopularRepos
