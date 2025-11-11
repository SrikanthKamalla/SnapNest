import { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { saveToLocalStorage } from '../helpers/localstorage';
import { toast } from 'react-toastify';

function GoogleSuccess() {
  const navigate = useNavigate();
  const { search } = useLocation();

  useEffect(() => {
    const params = new URLSearchParams(search);
    const token = params.get('token');

    if (token) {
      saveToLocalStorage(token);
      toast.success('Login Successful!');
      navigate('/');
    } else {
      navigate('/login');
    }
  }, [navigate, search]);

  return <h2>Signing you in...</h2>;
}

export default GoogleSuccess;
