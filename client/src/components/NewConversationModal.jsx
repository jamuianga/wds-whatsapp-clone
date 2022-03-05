import React, { useState } from 'react';
import { Modal, Form, Button, FormGroup, FormCheck } from 'react-bootstrap';
import { useContacts } from '../context/ContactsProvider';
import { useConversations } from '../context/ConversationsProvider';

export default function NewConversationModal({ closeModal }) {
  const [selectedContactIds, setSelectedContactIds] = useState([]);
  const { contacts } = useContacts();
  const { createConversations } = useConversations();

  const submitHandler = (e) => {
    e.preventDefault();
    createConversations(selectedContactIds);
    closeModal();
  };

  const checkBoxOnChangeHandler = (e) => {
    const contactId = e.target.id;

    setSelectedContactIds((prevSelectedContactIds) => {
      if (prevSelectedContactIds.includes(contactId)) {
        return prevSelectedContactIds.filter((prevId) => {
          return contactId !== prevId;
        });
      } else {
        return [...prevSelectedContactIds, contactId];
      }
    });
  };

  return (
    <>
      <Modal.Header closeButton={closeModal}>Nova conversa</Modal.Header>
      <Modal.Body>
        <Form onSubmit={submitHandler}>
          {contacts.map((contact) => {
            return (
              <FormGroup key={contact.id} controlId={contact.id}>
                <FormCheck
                  type="checkbox"
                  value={selectedContactIds.includes(contact.id)}
                  label={contact.name}
                  onChange={checkBoxOnChangeHandler}
                />
              </FormGroup>
            );
          })}
          <Button type="submit">Iniciar</Button>
        </Form>
      </Modal.Body>
    </>
  );
}
