import { createContext } from 'react';
import { ContactsStore } from './ContactsStore';
import { UiStore } from './UiStore';

export class RootStore {
  contactsStore: ContactsStore;
  uiStore: UiStore;

  constructor() {
      this.contactsStore = new ContactsStore();
      this.uiStore = new UiStore();
  }
}

export const rootStoreContext = createContext<RootStore>(null);