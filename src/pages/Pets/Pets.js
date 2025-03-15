import './Pets.css';
import { createCard } from '../../components/Card/Card';
import { fetchAvailablePets } from '../../api/petsService';
import { PageTitle } from '../../components/PageTitle/PageTitle';
import { hideLoader, showLoader } from '../../components/Loader/Loader';

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

  if (!pets.length) {
    const emptyMessage = document.createElement('p');
    emptyMessage.textContent = 'No hay mascotas disponibles en este momento.';
    emptyMessage.classList.add('empty-message');
    container.appendChild(emptyMessage);
  } else {
    const petsContainer = container.querySelector('#petscontainer');
    petsContainer.innerHTML = '';

    const cardsPromises = pets.map((pet) =>
      createCard({
        ...pet,
        showAdoptButton: USER_ROLE !== 'admin',
        showDeleteButton: USER_ROLE === 'admin',
        showFavourite: USER_ROLE !== 'admin',
        isLoggedIn: IS_LOGGED_IN
      })
    );

    const cards = await Promise.all(cardsPromises);

    cards.forEach((card) => {
      const li = document.createElement('li');
      li.appendChild(card);
      petsContainer.appendChild(li);
    });
  }
  hideLoader();
  main.append(container);
};
