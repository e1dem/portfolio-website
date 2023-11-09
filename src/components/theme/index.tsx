import { useContext, useEffect, useState } from "react";
import { useTranslation } from 'react-i18next';
import { ImCog } from "react-icons/im"
import { observer } from 'mobx-react-lite';
import { getThemeIconColour, setTheme } from "../../helpers/themeUtils";
import ThemeEnum from "../../model/Theme";
import { RootStore, rootStoreContext } from '../../store/RootStore';

import './styles.scss';

const Theme = () => {
  const { uiStore } = useContext<RootStore>(rootStoreContext);
  const { t } = useTranslation();

  const [toggle, setToggle] = useState(false);

  const handleToggleTheme = (theme: ThemeEnum) => {
    uiStore.setTheme(theme);
    setToggle(false);
  };

  useEffect(() => {
    setTheme(uiStore.theme);
  }, [uiStore.theme]);

  const themeIconArray = Object.values(ThemeEnum).map((theme: ThemeEnum) => {
    const iconTitle = t("themeMenu.iconTitles." + theme);
    return {id: theme, bgColor: getThemeIconColour(theme), title: iconTitle};
  });

  return(
    <div className={`theme-wrapper ${toggle ? "active" : ""}`}>
      <div className="theme-wrapper__toggle-icon">
        <ImCog onClick={() => {setToggle(!toggle)}} size={30} />
      </div>
      <div className="theme-wrapper__menu">
        <h4>{t("themeMenu.header").toUpperCase()}</h4>
        <ul>
          {
            themeIconArray.map((item, key) => (
              <li key={key}
                  onClick={()=>handleToggleTheme(item.id)}
                  style={{backgroundColor: item.bgColor}}
                  title={item.title}
              />
            ))
          }
        </ul>
      </div>
    </div>
  );
};

export default observer(Theme);