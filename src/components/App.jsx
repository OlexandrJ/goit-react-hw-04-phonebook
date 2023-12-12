import React, { Component } from 'react';
import { nanoid } from 'nanoid';
import ContactForm from './ContactForm/ContactForm';
import ContactList from './ContactList/ContactList';
import Filter from './Filter/Filter';

class App extends Component {
  state = {
    contacts: [],
    name: '',
    number: '',
    filter: '',
  };

  componentDidMount() {
    const storedContacts = localStorage.getItem('contacts');
    if (storedContacts) {
      this.setState({ contacts: JSON.parse(storedContacts) });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.contacts !== this.state.contacts) {
      localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
    }
  }

  handleNameChange = (event) => {
    this.setState({ name: event.target.value });
  };

  handleNumberChange = (event) => {
    this.setState({ number: event.target.value });
  };

  handleFilterChange = (event) => {
    this.setState({ filter: event.target.value });
  };

  addContact = (event) => {
    event.preventDefault();

    const { name, number, contacts } = this.state;

    if (!name.trim() || !number.trim()) return;

    const isNameExist = contacts.some((contact) => contact.name.toLowerCase() === name.toLowerCase());

    if (isNameExist) {
      alert(`${name} is already in contacts.`);
      return;
    }

    const newContact = { id: nanoid(), name, number };
    this.setState({ contacts: [...contacts, newContact], name: '', number: '' });
  };

  deleteContact = (id) => {
    const updatedContacts = this.state.contacts.filter((contact) => contact.id !== id);
    this.setState({ contacts: updatedContacts });
  };

  getFilteredContacts() {
    return this.state.contacts.filter((contact) =>
      contact.name && contact.name.toLowerCase().includes((this.state.filter || '').toLowerCase())
    );
  }

  render() {
    return (
      <div>
        <h1>Phonebook</h1>
        <ContactForm
          name={this.state.name}
          number={this.state.number}
          handleNameChange={this.handleNameChange}
          handleNumberChange={this.handleNumberChange}
          addContact={this.addContact}
        />

        <h2>Contacts</h2>
        <Filter filter={this.state.filter} handleFilterChange={this.handleFilterChange} />
        <ContactList contacts={this.getFilteredContacts()} onDeleteContact={this.deleteContact} />
      </div>
    );
  }
}

export default App;