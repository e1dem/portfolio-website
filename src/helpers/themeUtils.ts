import ThemeEnum from "../model/Theme";

const setTheme = (theme: ThemeEnum) => {
  if(theme) {
    document.documentElement.setAttribute('theme', theme);
  }
}

const getTheme = () => {
  return document.documentElement.getAttribute('theme');
}

const getThemeIconColour = (theme: ThemeEnum) => {
  return getComputedStyle(document.documentElement).getPropertyValue(`--${theme}-theme-icon-color`);
}

export  { getTheme, setTheme, getThemeIconColour };