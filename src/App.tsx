import '@aws-amplify/ui-react/styles.css';
import { Navigate, Route, Routes } from 'react-router-dom';
import Home from './pages/home/Home';
import Account from './pages/account/Account';
import PrivateRoute from './components/privateRoute/PrivateRoute';

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/account" element={<PrivateRoute> <Account /> </PrivateRoute>} />
        <Route path="*" element={<Navigate to="/" replace />}/>
      </Routes>
    </>
  );
}

export default App;
