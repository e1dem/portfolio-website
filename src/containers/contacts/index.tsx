import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import emailjs from '@emailjs/browser';
import { EmailJSResponseStatus } from '@emailjs/browser/es/models/EmailJSResponseStatus';
import Contacts from '../../components/contacts';

const ContactsComponent = () => {
  const form = useForm();
  const [sentSuccessfully, setSentSuccessfully] = useState<boolean | null>(null);

  const templateId = process.env.EMAILJS_TEMPLATE_ID;
  const serviceId = process.env.EMAILJS_SERVICE_ID;
  const publicKey = process.env.EMAILJS_PUBLIC_KEY;

  useEffect(() => {
    if (form.formState.isSubmitSuccessful) {
      form.reset();
    }
  }, [form.formState.isSubmitSuccessful, form.reset]);

  const sendEmail = (data) => {
    console.log(data);
    setSentSuccessfully(null);
    console.info("Sending email...");
    emailjs.send(serviceId, templateId, data, publicKey)
      .then(() => {
        console.info("The message has been sent successfully");
        setSentSuccessfully(true);
      })
      .catch ((error: EmailJSResponseStatus) => {
        console.error("Error while sending a message: " + error.text);
        setSentSuccessfully(false);
      })
      .catch((error) => {
        console.error("Error while sending a message: " + error);
        setSentSuccessfully(false);
      });
  };

  return(
    <Contacts form={form} sentSuccessfully={sentSuccessfully} sendEmail={sendEmail} />
  );
};

export default ContactsComponent;