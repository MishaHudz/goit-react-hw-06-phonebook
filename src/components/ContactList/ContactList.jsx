import { ContactsListStyle, ContactItem, Delete } from './ContactList.style';
import { useDispatch, useSelector } from 'react-redux';
import { removeContact } from 'store/usersSlice';

export function ContactList() {
  const dispatch = useDispatch();

  const filter = useSelector(state => state.filter);
  const contacts = useSelector(state => state.contacts.items);

  const filteredContacts = contacts.filter(contact =>
    contact.name.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <>
      <ContactsListStyle>
        {filteredContacts.map(contact => (
          <ContactItem key={contact?.id}>
            {contact?.name} <span>{contact?.number} </span>
            <Delete onClick={() => dispatch(removeContact(contact?.id))}>
              Delete
            </Delete>
          </ContactItem>
        ))}
      </ContactsListStyle>
    </>
  );
}
