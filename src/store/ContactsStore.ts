import { action, autorun, makeObservable, observable, runInAction } from 'mobx';
import type { contacts as ContactData } from '@prisma/client';
import idRemover from '../helpers/jsonUtils'

export class ContactsStore {
  contacts: ContactData;
  loading: boolean;

  constructor() {
    this.contacts = null;
    this.loading = false;

    makeObservable(this, {
      contacts: observable,
      loadData: action
    });

    autorun(this.logStoreDetails);
    this.loadData();
  }

  loadData = () => {
    this.loading = true;
    fetch('/api/get-contacts')
      .then((res: Response) => {
        if (res.ok) {
          return res.json();
        }

        return res.json().then(err => { throw new Error(err.message) });
      })
      .then((data: ContactData[]) => {
        if (data.length > 0) {
          runInAction(() => {
            this.contacts = data[0];
            console.log("email: " + this.contacts.email);
          })
        }
        this.loading = false;
      })
      .catch((e: Error) => {
        console.error("Error while loading contacts: " + e.message);
        this.loading = false;
      });
  }

  logStoreDetails = () => {
    console.log("Contacts have been (re)loaded: " + JSON.stringify(this.contacts, idRemover));
  }
}