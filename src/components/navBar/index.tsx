import { useState } from "react"
import { useTranslation } from 'react-i18next';
import { FaReact, FaBars } from "react-icons/fa";
import { HiX } from "react-icons/hi";
import { Link, NavLink  } from "react-router-dom";

import { navMenus } from "./config";
import LanguageSwitch from "../languageSwitcher/index"
import './styles.scss';

const NavBar = () => {
  const { t } = useTranslation();

  const [click, setClick] = useState(false);
  const handleClick = () =>  setClick(!click);
  const closeDropDownMenu = () => setClick(false);

  return(
    <>
      <nav className="navbar">
        <div className="navbar__container">
          <Link to={"/"}>
            <FaReact className="navbar__container__logo" size={30}/>
          </Link>
          <ul className={`navbar__container__menu ${click ? "active" : ""}`}>
            {navMenus.map((item, key) => (
              <li key={key} className="navbar__container__menu__item">
                <NavLink to={item.to}
                      className="navbar__container__menu__item__link"
                      onClick={closeDropDownMenu}>
                  {(t("navbar." + item.label)).toUpperCase()}
                </NavLink>
              </li>
            ))}
          </ul>
          <div className="navbar__container__lang_switcher">
            <LanguageSwitch />
          </div>
          <div className="nav-icon" onClick={handleClick}>
            {
              click ? <HiX size={30}/> : <FaBars size={30}/>
            }
          </div>
        </div>
      </nav>
    </>
  );
};

export default NavBar;