import { action, makeObservable, observable } from "mobx";
import Theme from "../model/Theme";

export class UiStore {
    theme: Theme;

    constructor() {
      this.theme = Theme.Day;

      makeObservable(this, {
        theme: observable,
        setTheme: action
      });
    }

    setTheme = (theme: Theme) => {
      this.theme = theme;
    }
}