import './Card.css';
import { FavouriteButton } from '../FavouriteButton/FavouriteButton';
import { Button } from '../Button/Button';
import { navigate } from '../../utils/functions/tools';
import { routes } from '../../utils/routes/routes';
import { createAdoption } from '../../api/adoptionService';
import { deletePet } from '../../api/petsService';
import { hideLoader } from '../Loader/Loader';
import { EditPet } from '../../pages/EditPet/EditPet';
import { ShowAlert } from '../Alert/Alert';

export const createCard = async (pet) => {
  const card = document.createElement('div');
  card.classList.add('card');

  const USER = JSON.parse(localStorage.getItem('user'));
  const isAdmin = USER?.role === 'admin';
  const isLogged = !!USER;

  if (pet.showFavourite) {
    const div = document.createElement('div');
    div.classList.add('favourite-container');
    card.appendChild(div);
  }

  const img = document.createElement('img');
  img.src = pet.imageUrl;
  img.alt = pet.name;
  img.classList.add('card-img');
  card.appendChild(img);

  const cardBody = document.createElement('div');
  cardBody.classList.add('card-body');
  card.appendChild(cardBody);

  const h3 = document.createElement('h3');
  h3.classList.add('card-title');
  h3.textContent = pet.name;
  cardBody.appendChild(h3);

  const p1 = document.createElement('p');
  p1.classList.add('card-info');
  p1.textContent = `Chip: ${pet.chip}`;
  cardBody.appendChild(p1);

  const p2 = document.createElement('p');
  p2.classList.add('card-info');
  p2.textContent = `Edad: ${pet.age} años`;
  cardBody.appendChild(p2);

  const p3 = document.createElement('p');
  p3.classList.add('card-info');
  p3.textContent = `Sexo: ${pet.sexo}`;
  cardBody.appendChild(p3);

  const p4 = document.createElement('p');
  p4.classList.add('card-info');
  p4.textContent = `Tamaño: ${pet.size}`;
  cardBody.appendChild(p4);

  const p5 = document.createElement('p');
  p5.classList.add('card-info');
  p5.textContent = `Especie: ${pet.type}`;
  cardBody.appendChild(p5);

  const buttonContainer = document.createElement('div');
  buttonContainer.classList.add('button-container');
  cardBody.appendChild(buttonContainer);

  if (isAdmin && pet.showDeleteButton) {
    card.classList.add('clickable');
    card.addEventListener('click', (e) => {
      if (!e.target.closest('.button-container')) {
        navigate(
          { preventDefault: () => {} },
          { path: `/editPet/${pet._id}`, page: () => EditPet(pet._id) }
        );
      }
    });

    const deleteButton = Button('Eliminar Mascota');
    deleteButton.classList.add('delete-pet-btn');

    deleteButton.addEventListener('click', async (e) => {
      e.stopPropagation();
      const confirmDelete = confirm(
        `¿Seguro que quieres eliminar a ${pet.name}?`
      );
      if (!confirmDelete) return;

      const deleted = await deletePet(pet._id);
      hideLoader();
      if (deleted) {
        ShowAlert(`${pet.name} ha sido eliminada.`, 'success', 3000, true);
        location.reload();
      } else {
        ShowAlert(
          `La mascota ${pet.name} no ha sido eliminada.`,
          'error',
          3000,
          true
        );
      }
    });

    buttonContainer.append(deleteButton);
  }

  if (!isAdmin && pet.showAdoptButton) {
    const adoptButton = Button('Adoptar');
    adoptButton.classList.add('adopt-btn');

    adoptButton.addEventListener('click', async (e) => {
      e.stopPropagation();
      if (!isLogged) {
        navigate(
          { preventDefault: () => {} },
          routes.find((route) => route.name === 'Login')
        );
        return;
      }

      try {
        const response = await createAdoption(pet._id);
        hideLoader();
        if (response) {
          navigate(
            { preventDefault: () => {} },
            routes.find((route) => route.name === 'Adopciones')
          );
        } else {
          ShowAlert('No se pudo completar la adopción.', 'error', 3000, true);
          navigate(
            { preventDefault: () => {} },
            routes.find((route) => route.name === 'Animales')
          );
        }
      } catch (error) {
        console.error('Error en la adopción:', error);
        ShowAlert('No se pudo completar la adopción.', 'error', 3000, true);
        navigate(
          { preventDefault: () => {} },
          routes.find((route) => route.name === 'Animales')
        );
      }
    });

    buttonContainer.append(adoptButton);
  }

  if (pet.showFavourite) {
    const favouriteContainer = card.querySelector('.favourite-container');
    const favouriteButton = await FavouriteButton(pet);
    favouriteContainer.append(favouriteButton);
  }

  return card;
};
