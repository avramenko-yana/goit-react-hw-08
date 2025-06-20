import { useSelector } from 'react-redux';
import Contact from '../Contact/Contact';
import styles from './ContactList.module.css';

// Оновлений шлях до селекторів
import { selectFilteredContacts } from '../../redux/contacts/selectors';

export default function ContactList() {
  // Використовуємо мемоізований селектор для отримання відфільтрованих контактів
  const visibleContacts = useSelector(selectFilteredContacts);

  // Рендеримо повідомлення, якщо контакти відсутні (або не відповідають фільтру)
  if (visibleContacts.length === 0) {
    return <p className={styles.message}>No contacts found.</p>;
  }

  // Рендеримо список контактів
  return (
    <ul className={styles.list}>
      {visibleContacts.map(contact => (
        <Contact
          key={contact.id}
          id={contact.id}
          name={contact.name}
          number={contact.number}
        />
      ))}
    </ul>
  );
}