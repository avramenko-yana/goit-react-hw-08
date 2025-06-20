import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup'; // Імпортуємо Yup
import { useDispatch } from 'react-redux';
import { register } from '../../redux/auth/operations';
import styles from './RegistrationForm.module.css';

// Створюємо схему валідації
const validationSchema = Yup.object().shape({
  name: Yup.string()
    .min(3, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Required'),
  email: Yup.string()
    .email('Must be a valid email!')
    .required('Required'),
  password: Yup.string()
    .min(8, 'Password must be at least 8 characters!')
    .required('Required'),
});

export const RegistrationForm = () => {
  const dispatch = useDispatch();

  const handleSubmit = (values, actions) => {
    dispatch(register(values));
    actions.resetForm();
  };

  return (
    <Formik
      initialValues={{ name: '', email: '', password: '' }}
      validationSchema={validationSchema} // Додаємо схему до Formik
      onSubmit={handleSubmit}
    >
      <Form className={styles.form} autoComplete="off">
        <label className={styles.label}>
          Username
          <Field type="text" name="name" />
          <ErrorMessage name="name" component="span" className={styles.error} />
        </label>
        <label className={styles.label}>
          Email
          <Field type="email" name="email" />
          <ErrorMessage name="email" component="span" className={styles.error} />
        </label>
        <label className={styles.label}>
          Password
          <Field type="password" name="password" />
          <ErrorMessage name="password" component="span" className={styles.error} />
        </label>
        <button type="submit">Register</button>
      </Form>
    </Formik>
  );
};

