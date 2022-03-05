import React from 'react';
import { ListGroup, ListGroupItem } from 'react-bootstrap';
import { useConversations } from '../context/ConversationsProvider';

export default function Conversations() {
  const { conversations, selectConversationIndex } = useConversations();

  return (
    <ListGroup variant="flush">
      {conversations.map((conversation, index) => {
        return (
          <ListGroupItem
            key={index}
            action
            onClick={() => selectConversationIndex(index)}
            active={conversation.selected}
          >
            {conversation.recipients
              .map((recipient) => recipient.name)
              .join(', ')}
          </ListGroupItem>
        );
      })}
    </ListGroup>
  );
}
