import { AdoptionButtons } from './AdoptionButtons';
import './AdoptionItem.css';

const USER = JSON.parse(localStorage.getItem('user'));
const USER_ROLE = USER?.role;
const USER_ID = USER?._id;

export const AdoptionItem = (adoption) => {
  if (USER_ROLE !== 'admin' && adoption.user._id !== USER_ID) {
    return null;
  }

  const card = document.createElement('div');
  card.classList.add('card');

  card.innerHTML = `
    <div class="card-img-container">
      <img src="${adoption.pet.imageUrl}" alt="${
    adoption.pet.name
  }" class="card-img">
    </div>
    <div class="card-body">
      <h3 class="card-title">${adoption.pet.name}</h3>
      <p class="card-info"><strong>Tipo:</strong> ${adoption.pet.type}, ${
    adoption.pet.sexo
  }</p>
      <p class="card-info"><strong>Solicitante:</strong> ${
        adoption.user.userName
      } (${adoption.user.email})</p>
      <p class="card-info"><strong>Fecha:</strong> ${new Date(
        adoption.adoptionDate
      ).toLocaleDateString()}</p>
      <p class="card-info"><strong>Estado:</strong> ${adoption.status}</p>
      <p class="card-info"><strong>Comentarios:</strong> ${
        adoption.comments || 'Sin comentarios'
      }</p>
      <div class="status-buttons"></div>
    </div>
  `;

  const buttonContainer = card.querySelector('.status-buttons');
  AdoptionButtons(adoption, buttonContainer);

  return card;
};
