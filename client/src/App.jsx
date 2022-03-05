import React from 'react';
import useLocalStorage from './hooks/useLocalStorage';
import Login from './components/Login';
import Dashboard from './components/Dashboard';

function App() {
  const [id, setId] = useLocalStorage('id');

  return id ? <Dashboard id={id} /> : <Login onIdSubmit={setId} />;
}

export default App;
