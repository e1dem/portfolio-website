import { Trans, useTranslation } from 'react-i18next';
import './styles.scss';

const Home = () => {
  const { t } = useTranslation();

  return (
    <section className="home" id="home">
      <div className="home__text-wrapper">
        <h1><Trans i18nKey="home.header"/></h1>
      </div>
      <div className="contact-me">
        <div className="contact-me__buttons-wrapper">
          <button>{t('home.hireButton')}</button>
          <a href='/'>{t('home.downloadCvButton')}</a>
        </div>
      </div>
    </section>
  );
};

export default Home;