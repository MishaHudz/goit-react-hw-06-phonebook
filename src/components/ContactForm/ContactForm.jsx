import { useState } from 'react';
import { FormStyles, ContactButton, Input } from './ContactForm.styles';
import { useDispatch } from 'react-redux';
import { customAlphabet } from 'nanoid';
import { addContact } from 'store/usersSlice';

const nanoid = customAlphabet('1234567890', 10);

export function ContactForm() {
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');

  const dispatch = useDispatch();

  const onSubmitForm = evt => {
    evt.preventDefault();

    dispatch(addContact({ name, number, id: nanoid() }));
    resetInputs();
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
