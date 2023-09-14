import { BrowserRouter } from 'react-router-dom';
import './App.css';
import { listen } from './redux/listener';
import { useEffect } from 'react';
import AppRoutes from './routes';

function App() {
  useEffect(() => {
    listen()
  }, [])

  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  );
}

export default App;
