import React, { useContext, createContext } from 'react';
import useLocalStorage from '../hooks/useLocalStorage';
import { useContacts } from './ContactsProvider';

const ConversationsContext = createContext();

export function useConversations() {
  return useContext(ConversationsContext);
}

export function ConversationsProvider({ children }) {
  const [conversations, setConversations] = useLocalStorage(
    'conversations',
    [],
  );
  const { contacts } = useContacts();

  const createConversations = (recipietns) => {
    setConversations((prevConversations) => {
      return [...prevConversations, { recipietns, messages: [] }];
    });
  };

  const formattedConversations = conversations.map((conversation) => {
    const recipients = conversation.recipietns.map((recipient) => {
      const contact = contacts.find((contact) => {
        return contact.id === recipient;
      });

      const name = (contact && contact.name) || recipient;

      return { id: recipient, name };
    });

    return { ...conversation, recipients };
  });

  return (
    <ConversationsContext.Provider
      value={{ conversations: formattedConversations, createConversations }}
    >
      {children}
    </ConversationsContext.Provider>
  );
}
