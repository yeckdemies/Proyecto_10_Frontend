import './Pets.css';
import { createCard } from '../../components/Card/Card';
import { hideLoader, showLoader } from '../../components/Loader/Loader';
import { fetchAvailablePets } from '../../api/petsService';
import { PageTitle } from '../../components/PageTitle/PageTitle';

const USER = JSON.parse(localStorage.getItem('user'));
const USER_ROLE = USER?.role;
const IS_LOGGED_IN = USER !== null;

export const Pets = async () => {
  const main = document.querySelector('main');
  main.innerHTML = '';

  const titleComponent = PageTitle('Mascotas en Adopción');
  main.appendChild(titleComponent);

  const container = document.createElement('section');
  container.id = 'pets';

  const ul = document.createElement('ul');
  ul.id = 'petscontainer';
  container.appendChild(ul);

  showLoader();
  const pets = await fetchAvailablePets();

  hideLoader();

  if (!pets.length) {
    const emptyMessage = document.createElement('p');
    emptyMessage.textContent = 'No hay mascotas disponibles en este momento.';
    emptyMessage.classList.add('empty-message');
    container.appendChild(emptyMessage);
  } else {
    const petsContainer = container.querySelector('#petscontainer');
    petsContainer.innerHTML = '';

    for (const pet of pets) {
      const li = document.createElement('li');

      const card = await createCard({
        ...pet,
        showAdoptButton: USER_ROLE !== 'admin',
        showDeleteButton: USER_ROLE === 'admin',
        showFavourite: USER_ROLE !== 'admin',
        isLoggedIn: IS_LOGGED_IN
      });

      li.appendChild(card);
      petsContainer.append(li);
    }
  }

  main.append(container);
};
