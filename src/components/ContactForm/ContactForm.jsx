import React from 'react';
import './ContactForm.css';

const ContactForm = ({ name = '', number = '', handleNameChange, handleNumberChange, addContact }) => {
  return (
    <form className="contact-form" onSubmit={(event) => addContact(event)}>
      <label>
        Name
        <input type="text" value={name} onChange={handleNameChange} required />
      </label>
      <label>
        Number
        <input type="tel" value={number} onChange={handleNumberChange} required />
      </label>
      <button className="button-container" type="submit">Add contact</button>
    </form>
  );
};

export default ContactForm;