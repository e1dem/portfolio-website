import { useContext } from 'react';
// import {FaInstagram, FaPinterest, FaRegEnvelope} from 'react-icons/fa';
import {ImInstagram, ImPinterest, ImMail, ImMail2, ImMail4} from 'react-icons/im';
import { observer } from 'mobx-react-lite';
import { RootStore, rootStoreContext } from '../../store/RootStore';

import './styles.scss';

interface ISocialsButtonsProps {
  buttonSize: number;
  includeEmail: boolean;
}

const SocialsButtons = (props: ISocialsButtonsProps) => {
  const { contactsStore } = useContext<RootStore>(rootStoreContext);
  return  <>
            { contactsStore.contacts != null &&
              <div className="socials-buttons">
                {props.includeEmail &&
                  <a href={`mailto:email@${contactsStore.contacts.email}`}>
                    <ImMail4 size={props.buttonSize} />
                  </a>
                }
                <a href={contactsStore.contacts.instagram} target="_blank">
                  <ImInstagram size={props.buttonSize} />
                </a>
                <a href={contactsStore.contacts.pinterest} target="_blank">
                  <ImPinterest size={props.buttonSize} />
                </a>
              </div>
            }
        </>
};

export default observer(SocialsButtons);