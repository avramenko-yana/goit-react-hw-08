import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { addContact } from '../../redux/contacts/operations';
import { selectContacts } from '../../redux/contacts/selectors';
import styles from './ContactForm.module.css';

// Схема валідації для полів форми
const ContactSchema = Yup.object().shape({
  name: Yup.string()
    .min(3, 'Name must be at least 3 characters long')
    .max(50, 'Name must be no more than 50 characters long')
    .required('Name is required'),
  number: Yup.string()
    .min(3, 'Number must be at least 3 characters long')
    .max(50, 'Number must be no more than 50 characters long')
    .required('Number is required'),
});

export default function ContactForm() {
  const dispatch = useDispatch();
  const contacts = useSelector(selectContacts);

  const handleSubmit = (values, actions) => {
    // Перевірка на дублікати
    const isDuplicate = contacts.find(
      (contact) => contact.name.toLowerCase() === values.name.toLowerCase()
    );

    if (isDuplicate) {
      alert(`${values.name} is already in contacts.`);
      return;
    }

    // Відправка дії для додавання нового контакту
    dispatch(addContact({ name: values.name, number: values.number }));
    actions.resetForm();
  };

  return (
    <Formik
      initialValues={{ name: '', number: '' }}
      validationSchema={ContactSchema}
      onSubmit={handleSubmit}
    >
      <Form className={styles.form} autoComplete="off">
        <label className={styles.label}>
          Name
          <Field type="text" name="name" className={styles.input} />
          <ErrorMessage name="name" component="span" className={styles.error} />
        </label>

        <label className={styles.label}>
          Number
          <Field type="tel" name="number" className={styles.input} />
          <ErrorMessage name="number" component="span" className={styles.error} />
        </label>

        <button type="submit" className={styles.button}>Add contact</button>
      </Form>
    </Formik>
  );
}