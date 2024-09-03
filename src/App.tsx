import '@aws-amplify/ui-react/styles.css';
import { Navigate, Route, Routes } from 'react-router-dom';
import Account from './pages/account/Account';
import { Authenticator } from '@aws-amplify/ui-react';
import Home from './pages/home/Home';
import Navbar from './components/navbar/Navbar';
import PrivateRoute from './components/privateRoute/PrivateRoute';

function App() {
  return (
    <>
      <Authenticator.Provider>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/account" element={<PrivateRoute> <Account /> </PrivateRoute>} />
          <Route path="*" element={<Navigate to="/" replace />}/>
        </Routes>
      </Authenticator.Provider>
    </>
  );
}

export default App;
