import React from 'react';
import './ContactList.css';

const ContactList = ({ contacts, onDeleteContact }) => {
  return (
    <ul className="list-name">
      {contacts.map((contact) => (
        <li key={contact.id}>
          {contact.name}: {contact.number}
          <button style={{ marginLeft: '10px' }} onClick={() => onDeleteContact(contact.id)}>Delete</button>
        </li>
      ))}
    </ul>
  );
};

export default ContactList;