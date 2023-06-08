import { useState } from 'react';
import PropTypes from 'prop-types';

import { FormStyles, ContactButton, Input } from './ContactForm.styles';

export function ContactForm({ addUser }) {
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');

  const onSubmitForm = evt => {
    evt.preventDefault();

    const flag = addUser({ name, number });
    if (flag) resetInputs();
  };

  const resetInputs = () => {
    setName('');
    setNumber('');
  };

  const handleChange = ({ target: { name, value } }) => {
    switch (name) {
      case 'name':
        setName(value);
        break;

      case 'number':
        setNumber(value);
        break;

      default:
        break;
    }
  };

  return (
    <FormStyles onSubmit={onSubmitForm}>
      <label>
        Name
        <Input
          type="text"
          name="name"
          pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
          title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
          required
          onChange={handleChange}
          value={name}
        />
      </label>

      <label>
        Number
        <Input
          type="tel"
          name="number"
          pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
          title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
          required
          onChange={handleChange}
          value={number}
        />
      </label>
      <ContactButton>Add contact</ContactButton>
    </FormStyles>
  );
}

ContactForm.propTypes = {
  addUser: PropTypes.func.isRequired,
};
