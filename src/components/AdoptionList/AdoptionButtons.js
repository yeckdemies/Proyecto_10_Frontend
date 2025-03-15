import { updateAdoption, deleteAdoption } from '../../api/adoptionService';
import { AdoptionList } from './AdoptionList';
import './AdoptionButtons.css';

const handleUpdate = async (adoptionId, newStatus) => {
  if (await updateAdoption(adoptionId, newStatus)) {
    AdoptionList();
  }
};

const handleDelete = async (adoptionId) => {
  if (await deleteAdoption(adoptionId)) {
    AdoptionList();
  }
};

const USER = JSON.parse(localStorage.getItem('user'));
const USER_ROLE = USER?.role;

export const AdoptionButtons = (adoption, container) => {
  if (USER_ROLE === 'admin') {
    ['Pending', 'Approved', 'Rejected'].forEach((status) => {
      const button = document.createElement('button');
      button.textContent = status;
      button.disabled = adoption.status === status;
      button.addEventListener('click', () =>
        handleUpdate(adoption._id, status)
      );
      container.appendChild(button);
    });
  } else {
    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Cancelar solicitud';
    deleteButton.addEventListener('click', () => handleDelete(adoption._id));
    container.appendChild(deleteButton);
  }
};
