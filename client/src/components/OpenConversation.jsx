import React, { useState } from 'react';
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
      <div className="flex-grow-1 overflow-auto">hahsh</div>
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
