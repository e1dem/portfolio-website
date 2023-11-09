import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import About from '../../components/about';
import EducationClass from '../../model/EducationClass';

const AboutContainer = () => {
  const { i18n } = useTranslation();
  const [educationalClasses, setEducationalClasses] = useState([] as EducationClass[]);

  useEffect(() => {
    fetch(`/api/get-classes?lang=${i18n.language}`)
      .then((res: Response) => {
        if (res.ok) {
          return res.json();
        }
        return res.json().then(err => { throw new Error(err.message) });
      })
      .then((data) => {
        return data.map((c) => {
          return new EducationClass(c.title_info.translations[0].translation,
            c.class_type.name_info.translations[0].translation,
            c.online,
            c.start_date,
            c.teacher_info.translations[0].translation,
            c.place_info.translations[0].translation
            );
        })
      })
      .then((classesData: EducationClass[]) => {
        setEducationalClasses(classesData);
      })
      .catch((e: Error) => {
        console.error("Error while loading classes: " + e.message);
      })
  }, [i18n.language]);

  return(
    <About educationalClasses={educationalClasses} />
  );
};

export default AboutContainer;