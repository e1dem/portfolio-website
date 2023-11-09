import { useTranslation } from 'react-i18next';
import SocialsButtons from '../socialsButtons';

import './styles.scss';

const Footer = () => {
  const { t } = useTranslation();

  return <div className="footer">
          <div className="rights-info">
            {t('footer.copyright')}
          </div>
          <div className='socials-buttons-wrapper'>
            <SocialsButtons buttonSize={25} includeEmail={false} />
          </div>
        </div>
};

export default Footer;