import { useTranslation } from 'react-i18next';
import EducationClass from '../../model/EducationClass';

import './styles.scss';

interface IAboutProps {
  educationalClasses: EducationClass[];
}

const About = (props: IAboutProps) => {
  const { t } = useTranslation();

  return(
    <div className='about_page'>
      <p>
        {t("about.paragraph")}
      </p>
      <h4>
        {t("about.classesHeader").toUpperCase()}
      </h4>
      {props.educationalClasses.map((c, index) => {
          return <div className="class_info" key={index}>
                  {new Date(c.startDate).getFullYear()} - {`${c.classType} ${c.title} ${t("about.taughtByMsg")} ${c.teacher}. ${c.place}`}
                </div>
        })}
    </div>
  );
};

export default About;