import './index.css'

const RepositoryItem = props => {
  const {websiteDetails} = props
  const {avatarUrl, forksCount, issuesCount, starsCount, name} = websiteDetails
  return (
    <li className="web-item">
      <img src={avatarUrl} alt={name} className="web-image" />
      <h1 className="name">{name}</h1>
      <div className="icon-container">
        <img
          src="https://assets.ccbp.in/frontend/react-js/stars-count-img.png"
          className="star-icon"
          alt="stars"
        />
        <p className="stars-count">{starsCount}</p>
      </div>
      <div className="icon-container">
        <img
          src="https://assets.ccbp.in/frontend/react-js/forks-count-img.png"
          className="fork-icon"
          alt="forks"
        />
        <p className="stars-count">{forksCount}</p>
      </div>

      <div className="icon-container">
        <img
          src="https://assets.ccbp.in/frontend/react-js/issues-count-img.png"
          className="issue-icon"
          alt="open issues"
        />
        <p className="stars-count">{issuesCount}</p>
      </div>
    </li>
  )
}
export default RepositoryItem
