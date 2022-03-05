import React, { useContext, createContext, useState } from 'react';
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
  const [selectConversationIndex, setSelectConversationIndex] = useState(0);
  const { contacts } = useContacts();

  const createConversations = (recipietns) => {
    setConversations((prevConversations) => {
      return [...prevConversations, { recipietns, messages: [] }];
    });
  };

  const formattedConversations = conversations.map((conversation, index) => {
    const recipients = conversation.recipietns.map((recipient) => {
      const contact = contacts.find((contact) => {
        return contact.id === recipient;
      });

      const name = (contact && contact.name) || recipient;

      return { id: recipient, name };
    });

    const selected = index === selectConversationIndex;

    return { ...conversation, recipients, selected };
  });

  return (
    <ConversationsContext.Provider
      value={{
        conversations: formattedConversations,
        createConversations,
        selectedConversation: formattedConversations[selectConversationIndex],
        selectConversationIndex: setSelectConversationIndex,
      }}
    >
      {children}
    </ConversationsContext.Provider>
  );
}
