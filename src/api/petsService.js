import { hideLoader, showLoader } from '../components/Loader/Loader';
import { handleApiResponse } from '../utils/functions/tools';

const API_URL = 'http://localhost:3000/api/v1/pets';
const TOKEN = localStorage.getItem('token');

const HEADER = {
  Authorization: `Bearer ${TOKEN}`
};

export const fetchAvailablePets = async () => {
  try {
    const response = await fetch(`${API_URL}/getAvailablePets/`, {
      headers: HEADER
    });

    if (!response.ok) {
      throw new Error(`Error fetching pets: ${response.statusText}`);
    }

    const data = await handleApiResponse(response);
    return data.availablePets || [];
  } catch (error) {
    console.error('Error fetching available pets:', error);
    return [];
  }
};

export const registerPet = async (formData) => {
  try {
    const response = await fetch(`${API_URL}/registerPet`, {
      method: 'POST',
      headers: HEADER,
      body: formData
    });

    return handleApiResponse(response);
  } catch (error) {
    console.error('Error registrando la mascota:', error);
    throw error;
  }
};

export const deletePet = async (petId) => {
  try {
    showLoader();
    const response = await fetch(`${API_URL}/deletePet/${petId}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${TOKEN}`
      }
    });

    hideLoader();
    return handleApiResponse(response);
  } catch (error) {
    console.error('Error eliminando la mascota:', error);
    throw error;
  }
};

export const getPetById = async (petId) => {
  try {
    const response = await fetch(`${API_URL}/${petId}`, {
      headers: HEADER
    });

    return await handleApiResponse(response);
  } catch (error) {
    console.error('Error fetching pet by ID:', error);
    throw error;
  }
};

export const updatePet = async (petId, formData) => {
  try {
    const response = await fetch(`${API_URL}/editPet/${petId}`, {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${TOKEN}`
      },
      body: formData
    });

    return await handleApiResponse(response);
  } catch (error) {
    console.error('Error updating pet:', error);
    throw error;
  }
};
