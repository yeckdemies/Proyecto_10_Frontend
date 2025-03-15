import { cerrarFormulario } from '../utils/functions/tools';

const API_URL = 'http://localhost:3000/api/v1/users';

export const submitLogin = async (userName, password, form) => {
  try {
    const objetoFinal = JSON.stringify({ userName, password });

    const opciones = {
      method: 'POST',
      body: objetoFinal,
      headers: { 'Content-Type': 'application/json' }
    };

    const res = await fetch(`${API_URL}/login`, opciones);
    await handleResponse(res, form, 'login');
  } catch (error) {
    console.error('Error en la solicitud:', error);
    return { success: false, message: 'Error en la solicitud' };
  }
};

export const submitRegister = async (userName, email, password, form) => {
  try {
    const objetoFinal = JSON.stringify({ userName, email, password });

    const opciones = {
      method: 'POST',
      body: objetoFinal,
      headers: { 'Content-Type': 'application/json' }
    };

    const res = await fetch(`${API_URL}/register`, opciones);

    if (!res.ok) {
      return handleErrorResponse(res, form);
    }

    const respuestaFinal = await res.json();

    await submitLogin(respuestaFinal.user.userName, password, form);
  } catch (error) {
    console.error('Error en la solicitud:', error);
    return { success: false, message: 'Error en la solicitud' };
  }
};

const handleResponse = async (res, form, operationType) => {
  if (!res.ok) {
    return handleErrorResponse(res, form);
  }

  const respuestaFinal = await res.json();

  localStorage.setItem('token', respuestaFinal.token);
  localStorage.setItem('user', JSON.stringify(respuestaFinal.user));

  cerrarFormulario();
  location.reload();
};

const handleErrorResponse = async (res, form) => {
  let errorMessage = 'Error en la solicitud';

  try {
    const errorData = await res.json();
    errorMessage = errorData.message || errorMessage;
  } catch {
    errorMessage = 'Error desconocido';
  }

  const existingError = form.querySelector('.errorlogin');
  if (existingError) {
    existingError.remove();
  }

  const pError = document.createElement('p');
  pError.classList.add('errorlogin');
  pError.textContent = errorMessage;
  pError.style.color = 'red';

  form.append(pError);
};

export const validateUser = async () => {
  const token = localStorage.getItem('token');
  if (!token) return null;

  try {
    const response = await fetch(`${API_URL}/me`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });

    if (!response.ok) throw new Error('Token inválido');

    return await response.json();
  } catch (error) {
    console.error(error);
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    return null;
  }
};

export const getUserFavourites = async () => {
  const token = localStorage.getItem('token');
  if (!token) return [];

  try {
    const response = await fetch(`${API_URL}/favourites`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });

    if (!response.ok) throw new Error('Error fetching favourites');

    const data = await response.json();
    return data.favourites;
  } catch (error) {
    console.error('Error fetching favourites:', error);
    return [];
  }
};
