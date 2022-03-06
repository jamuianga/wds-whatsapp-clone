import React, { useState, useCallback } from 'react';
import {
  Button,
  Form,
  FormControl,
  FormGroup,
  InputGroup,
} from 'react-bootstrap';
import { useConversations } from '../context/ConversationsProvider';

export default function OpenConversation() {
  const [text, setText] = useState('');
  const setRef = useCallback((node) => {
    if (node) {
      node.scrollIntoView({ smooth: true });
    }
  }, []);
  const { sendMessage, selectedConversation } = useConversations();

  const submitHandler = (e) => {
    e.preventDefault();

    sendMessage(
      selectedConversation.recipients.map((recipient) => recipient.id),
      text,
    );
    setText('');
  };

  return (
    <div className="d-flex flex-column flex-grow-1">
      <div className="flex-grow-1 overflow-auto">
        <div className="d-flex flex-column align-itemns-start justify-content-end px-3">
          {selectedConversation.messages.map((message, index) => {
            const lastMessage =
              selectedConversation.messages.length - 1 === index;

            return (
              <div
                ref={lastMessage ? setRef : null}
                key={index}
                className={`my-1 d-flex flex-column ${
                  message.fromMe ? 'align-self-end aling-items-end' : 'align-items-start'
                }`}
              >
                <div
                  className={`rounded px-2 py-1 ${
                    message.fromMe ? 'bg-primary text-white' : 'border'
                  }`}
                >
                  {message.text}
                </div>
                <div
                  className={`text-muted small ${
                    message.fromMe ? 'text-right' : ''
                  }`}
                >
                  {message.fromMe ? 'Eu' : message.senderName}
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <Form onSubmit={submitHandler}>
        <FormGroup className="m-2">
          <InputGroup>
            <FormControl
              as="textarea"
              required
              value={text}
              onChange={(e) => setText(e.target.value)}
              style={{ height: '75px', resize: 'none' }}
            ></FormControl>
            <InputGroup.Append>
              <Button type="submit">Enviar</Button>
            </InputGroup.Append>
          </InputGroup>
        </FormGroup>
      </Form>
    </div>
  );
}
