import { useContext } from 'react';
import { useTranslation, Trans } from 'react-i18next';
import { UseFormReturn } from 'react-hook-form';
import { observer } from 'mobx-react-lite';
import SocialsButtons from '../../components/socialsButtons';
import { RootStore, rootStoreContext } from '../../store/RootStore';

import './styles.scss';

interface IContactsProps {
  form: UseFormReturn;
  sentSuccessfully?: boolean;
  sendEmail: (any) => void;
}

// The value is taken from docs https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/email#validation
const emailPattern = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;

const Contacts = (props: IContactsProps) => {
  const { contactsStore } = useContext<RootStore>(rootStoreContext);
  const { t } = useTranslation();

  return(
    <>
      { contactsStore.contacts !== null &&
        <div className="contacts-page">
          <div className="common-info">
            <div className='common-info__msg'>
              <Trans i18nKey="contacts.explanatoryMsg"
                     values={{ email: contactsStore.contacts.email}}
                     components={{ link1: <a href={`mailto:email@${contactsStore.contacts.email}`} /> }}
              />
            </div>
            <SocialsButtons buttonSize={25} includeEmail={false} />
          </div>
          <div className="contact-form-wrapper">
          <form onSubmit={props.form.handleSubmit(props.sendEmail)} className="contact-form">
            <div className="contact-form__group">
              <label className="contact-form__group__label">
                {t('contacts.contactForm.name')}:
              </label>
              <input type="text" name="user_name" className="contact-form__group__input" {...props.form.register("user_name")}/>
            </div>
            <div className="contact-form__group">
              <div className="contact-form__group__info">
                <label className="contact-form__group__label">
                  {t('contacts.contactForm.email')}*:
                </label>
                {props.form.formState.errors.user_email?.type === 'required' && <label className="error-message">{t('errors.requiredField')}</label>}
                {props.form.formState.errors.user_email?.type === 'pattern' && <label className="error-message">{t('errors.invalidEmail')}</label>}
              </div>
              <input type="text" name="user_email" className="contact-form__group__input" {...props.form.register("user_email", { required: true, pattern: emailPattern })} />

            </div>
            <div className="contact-form__group">
              <label className="contact-form__group__label">
                {t('contacts.contactForm.subject')}:
              </label>
              <input type="text" name="subject" className="contact-form__group__input" {...props.form.register("subject")} />
            </div>
            <div className="contact-form__group">
              <div className="contact-form__group__info">
                <label className="contact-form__group__label">
                  {t('contacts.contactForm.message')}*:
                </label>
                {props.form.formState.errors.message?.type === 'required' && <label className="error-message">{t('errors.requiredField')}</label>}
              </div>
              <textarea name="message" className="contact-form__group__input__textarea" {...props.form.register("message", { required: true})} />
            </div>
            <input type="submit" value={t('contacts.contactForm.sendButtonMsg')} className='contact-form__button' />
            {props.sentSuccessfully &&
              <div className="submit-success" data-submit="">
                {t('contacts.contactForm.submissionMessage.success.header')} {t('contacts.contactForm.submissionMessage.success.message')}
              </div>
            }
            {props.sentSuccessfully != null && props.sentSuccessfully === false &&
              <div className="submit-error" data-submit="">
                {t('contacts.contactForm.submissionMessage.error.header')} {t('contacts.contactForm.submissionMessage.error.message')}
              </div>
            }
          </form>
          </div>
        </div>
      }
    </>
  );
};

export default observer(Contacts);