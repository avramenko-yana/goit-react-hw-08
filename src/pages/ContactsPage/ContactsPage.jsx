import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ContactList from '../../components/ContactList/ContactList';
import ContactForm from '../../components/ContactForm/ContactForm';
import SearchBox from '../../components/SearchBox/SearchBox';
import { fetchContacts } from '../../redux/contacts/operations';
import { selectLoading, selectError } from '../../redux/contacts/selectors';
import styles from './ContactsPage.module.css';

export default function ContactsPage() {
  const dispatch = useDispatch();
  const loading = useSelector(selectLoading);
  const error = useSelector(selectError);

  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);

  return (
    <div className={styles.container}>
      <h1>Your Phonebook</h1>
      
      {/* --- ОСЬ ТУТ МАЄ БУТИ ФОРМА --- */}
      <ContactForm />
      {/* ----------------------------- */}

      <SearchBox />
      
      {loading && !error && <b>Request in progress...</b>}
      {error && <b>Error: {error}</b>}

      <ContactList />
    </div>
  );
}