import { useTranslation } from 'react-i18next';

import { supportedLanguages } from "./config";
import './styles.scss';

const LanguageSwitcher = () => {
 const { i18n } = useTranslation();

  const handleClick = (languageId: string) => {
    i18n.changeLanguage(languageId)
        .catch(() => {console.error("Error while setting the language " + languageId)});
  }

  return <ul className="language_switch">
          {supportedLanguages.map((item, key) => (
            <li key={key} className="language_switch__item">
              <button className={`${i18n.resolvedLanguage === item.id ? "active" : ""}`} onClick={() => {handleClick(item.id)}} >
                {item.label}
              </button>
            </li>))}
        </ul>;
};

export default LanguageSwitcher;