// Write your code here
import './index.css'

const LanguageFilterItem = props => {
  const {languageDetails, setActiveLanguageFilterId, isActive} = props
  const {language, id} = languageDetails

  const btnClassName = isActive ? 'language-btn active-btn' : 'language-btn'

  const onClickLanguageBtn = () => {
    setActiveLanguageFilterId(id)
  }

  return (
    <li className="item-list">
      <button
        className={btnClassName}
        type="button"
        onClick={onClickLanguageBtn}
      >
        <p className="language-item">{language}</p>
      </button>
    </li>
  )
}
export default LanguageFilterItem
