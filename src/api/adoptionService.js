import { showLoader } from '../components/Loader/Loader';

const API_URL = 'http://localhost:3000/api/v1/adoptions';
const TOKEN = localStorage.getItem('token');
const HEADER = {
  Authorization: `Bearer ${TOKEN}`,
  'Content-Type': 'application/json'
};

export const fetchAdoptions = async () => {
  try {
    const response = await fetch(API_URL, {
      headers: HEADER
    });
    return await response.json();
  } catch (error) {
    console.error('Error fetching adoptions:', error);
    return [];
  }
};

export const updateAdoption = async (adoptionId, newStatus) => {
  try {
    showLoader();
    const response = await fetch(`${API_URL}/editAdoption/${adoptionId}`, {
      method: 'PUT',
      headers: HEADER,
      body: JSON.stringify({ status: newStatus })
    });
    return response.ok;
  } catch (error) {
    console.error('Error updating adoption:', error);
    return false;
  }
};

export const deleteAdoption = async (adoptionId) => {
  try {
    showLoader();
    const response = await fetch(`${API_URL}/deleteAdoption/${adoptionId}`, {
      method: 'DELETE',
      headers: HEADER
    });
    return response.ok;
  } catch (error) {
    console.error('Error deleting adoption:', error);
    return false;
  }
};

export const createAdoption = async (petId) => {
  try {
    showLoader();
    const response = await fetch(`${API_URL}/registerAdoption`, {
      method: 'POST',
      headers: HEADER,
      body: JSON.stringify({
        petId,
        comments: 'Solicitud de adopción'
      })
    });

    const result = await response.json();
    return response.ok ? result : false;
  } catch (error) {
    console.error('Error al solicitar adopción:', error);
    return false;
  }
};
