import '@aws-amplify/ui-react/styles.css';
import { Authenticator } from '@aws-amplify/ui-react';
import { Navigate, Route, Routes } from 'react-router-dom';
import Home from './pages/home/Home';
import Account from './pages/account/Account';
import PrivateRoute from './components/privateRoute/PrivateRoute';
import Navbar from './components/navbar/Navbar';

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
