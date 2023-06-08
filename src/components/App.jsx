import { useEffect, useState } from 'react';
import { nanoid } from 'nanoid';
import { ContactForm } from './ContactForm/ContactForm';
import { ContactList } from './ContactList/ContactList';
import { Filter } from './Filter/Filter';
import { Section } from './Section/Section';

export function App() {
  const [contacts, setContacts] = useState(
    () => JSON.parse(localStorage.getItem('contacts')) ?? []
  );
  const [filter, setFilter] = useState('');

  useEffect(() => {
    localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  const addUser = data => {
    if (
      contacts.find(
        contact => data.name.toLowerCase() === contact.name.toLowerCase()
      )
    ) {
      alert(`${data.name} is already in contacts`);
      return false;
    }

    setContacts(prevContacts => [...prevContacts, { ...data, id: nanoid() }]);

    return true;
  };

  const deleteUser = id => {
    setContacts(prevContacts =>
      prevContacts.filter(contact => contact.id !== id)
    );
  };

  const filterContacts = () => {
    if (filter) {
      return contacts.filter(contact =>
        contact.name.toLowerCase().includes(`${filter.toLowerCase()}`)
      );
    }

    return contacts;
  };

  const handleChange = ({ target: { value } }) => {
    setFilter(value);
  };

  return (
    <Section>
      <div>
        <h1>Phonebook</h1>
        <ContactForm addUser={addUser} />

        <h2>Contacts</h2>
        <Filter handleChange={handleChange} filter={filter} />

        <ContactList contacts={filterContacts()} deleteUser={deleteUser} />
      </div>
    </Section>
  );
}
