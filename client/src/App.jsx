import React from 'react';
import useLocalStorage from './hooks/useLocalStorage';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import { ContactsProvider } from './context/ContactsProvider';

function App() {
  const [id, setId] = useLocalStorage('id');

  const dashboard = (
    <ContactsProvider>
      <Dashboard id={id} />
    </ContactsProvider>
  );

  return id ? dashboard : <Login onIdSubmit={setId} />;
}

export default App;
