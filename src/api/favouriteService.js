import { hideLoader, showLoader } from '../components/Loader/Loader';
import { navigate } from '../utils/functions/tools';
import { routes } from '../utils/routes/routes';

const API_URL = 'https://proyecto-10-backend.onrender.com/api/v1/users';

export const addFavourite = async (petId) => {
  showLoader();
  const token = localStorage.getItem('token');
  const USER = JSON.parse(localStorage.getItem('user'));
  if (!USER) {
    navigate(
      { preventDefault: () => {} },
      routes.find((route) => route.name === 'Login')
    );
    return;
  }

  try {
    const response = await fetch(`${API_URL}/setFavourite/${petId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      }
    });

    const data = await response.json();
    return { success: response.ok, message: data.message };
  } catch (error) {
    console.error('Error en la solicitud:', error);
    return { success: false, message: 'Error en la solicitud' };
  } finally {
    hideLoader();
  }
};

export const removeFavourite = async (petId) => {
  showLoader();
  const token = localStorage.getItem('token');

  try {
    const response = await fetch(`${API_URL}/removeFavourite/${petId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      }
    });

    const data = await response.json();
    return { success: response.ok, message: data.message };
  } catch (error) {
    console.error('Error en la solicitud:', error);
    return { success: false, message: 'Error en la solicitud' };
  } finally {
    hideLoader();
  }
};

export const getCurrentUser = async () => {
  showLoader();
  const token = localStorage.getItem('token');
  if (!token) return null;

  try {
    const response = await fetch(`${API_URL}/me`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      }
    });

    if (!response.ok) {
      throw new Error('Error fetching user data');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error obteniendo usuario:', error);
    return null;
  } finally {
    hideLoader();
  }
};
