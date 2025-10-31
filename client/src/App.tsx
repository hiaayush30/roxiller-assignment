import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
// Import useEffect
import { useEffect } from 'react';
import { useAuthStore } from './store/useAuthStore';
import Signup from './pages/Signup';
import Login from './pages/Login';
import Layout from './Layout';
import { FullPageLoader } from './components/Loader';
import Home from './pages/Home';
import Landing from './pages/Landing';

const App = () => {
  const { user, isLoading, fetchUser } = useAuthStore();

  // Call fetchUser once when the component mounts
  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  if (isLoading) {
    return <FullPageLoader />
  }


  return (
    <>
      <BrowserRouter>
        {/* Unauthenticated Routes */}
        {!user &&
          <Routes>
            <Route path='/' element={<Landing />} />
            <Route path='/signup' element={<Signup />} />
            <Route path='/login' element={<Login />} />
            {/* Redirect any bad path to login if unauthorized */}
            <Route path='*' element={<Navigate to={'/login'} replace />} />
          </Routes>}

        {/* Authenticated Routes */}
        {user &&
          <Routes>
            <Route path='/' element={<Layout />}>
              <Route index element={<Navigate to={'home'} replace={true} />} />
              <Route path='home' element={<Home />} />
              {/* Add other authenticated routes here */}
            </Route>
            {/* Redirect any bad path to home if authorized */}
            <Route path='*' element={<Navigate to={'/home'} replace />} />
          </Routes>}
        <ToastContainer />
      </BrowserRouter>
    </>
  )
}

export default App
