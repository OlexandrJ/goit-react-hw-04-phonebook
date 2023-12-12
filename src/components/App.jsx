import React, { useState, useEffect, useCallback } from 'react';
import { nanoid } from 'nanoid';
import ContactForm from './ContactForm/ContactForm';
import ContactList from './ContactList/ContactList';
import Filter from './Filter/Filter';

const App = () => {
  const [contacts, setContacts] = useState([]);
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');
  const [filter, setFilter] = useState('');

  useEffect(() => {
    const storedContacts = localStorage.getItem('contacts');
    if (storedContacts) {
      setContacts(JSON.parse(storedContacts));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  const handleNameChange = useCallback((event) => {
    setName(event.target.value);
  }, []);

  const handleNumberChange = useCallback((event) => {
    setNumber(event.target.value);
  }, []);

  const handleFilterChange = useCallback((event) => {
    setFilter(event.target.value);
  }, []);

  const addContact = useCallback((event) => {
    event.preventDefault();

    if (!name.trim() || !number.trim()) return;

    const isNameExist = contacts.some((contact) => contact.name.toLowerCase() === name.toLowerCase());

    if (isNameExist) {
      alert(`${name} is already in contacts.`);
      return;
    }

    const newContact = { id: nanoid(), name, number };
    setContacts((prevContacts) => [...prevContacts, newContact]);
    setName('');
    setNumber('');
  }, [name, number, contacts]);

  const deleteContact = useCallback((id) => {
    setContacts((prevContacts) => prevContacts.filter((contact) => contact.id !== id));
  }, []);

  const getFilteredContacts = useCallback(() => {
    return contacts.filter((contact) =>
      contact.name && contact.name.toLowerCase().includes((filter || '').toLowerCase())
    );
  }, [contacts, filter]);

  return (
    <div>
      <h1>Phonebook</h1>
      <ContactForm
        name={name}
        number={number}
        handleNameChange={handleNameChange}
        handleNumberChange={handleNumberChange}
        addContact={addContact}
      />

      <h2>Contacts</h2>
      <Filter filter={filter} handleFilterChange={handleFilterChange} />
      <ContactList contacts={getFilteredContacts()} onDeleteContact={deleteContact} />
    </div>
  );
};

export default App;