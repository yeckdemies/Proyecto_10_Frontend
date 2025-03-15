import './Favourites.css';
import { createCard } from '../../components/Card/Card';
import { hideLoader, showLoader } from '../../components/Loader/Loader';
import { getUserFavourites } from '../../api/userService';
import { PageTitle } from '../../components/PageTitle/PageTitle';

const USER = JSON.parse(localStorage.getItem('user'));
const USER_ROLE = USER?.role;
const IS_LOGGED_IN = USER !== null;

export const Favourites = async () => {
  const main = document.querySelector('main');
  main.innerHTML = '';

  const titleComponent = PageTitle('Mascotas Favoritas');
  main.appendChild(titleComponent);

  const container = document.createElement('section');
  container.id = 'favourites';

  const ul = document.createElement('ul');
  ul.id = 'favourites-container';
  container.appendChild(ul);

  showLoader();
  const favouritePets = await getUserFavourites();

  if (!favouritePets.length) {
    const emptyMessage = document.createElement('p');
    emptyMessage.textContent =
      'No hay adopciones disponibles para este filtro.';
    emptyMessage.classList.add('empty-message');
    container.appendChild(emptyMessage);
  } else {
    const favouritesContainer = container.querySelector(
      '#favourites-container'
    );
    favouritesContainer.innerHTML = '';

    for (const pet of favouritePets) {
      const li = document.createElement('li');

      const card = await createCard({
        ...pet,
        showAdoptButton: USER_ROLE !== 'admin',
        showDeleteButton: USER_ROLE === 'admin',
        showFavourite: USER_ROLE !== 'admin',
        isLoggedIn: IS_LOGGED_IN
      });

      li.appendChild(card);
      favouritesContainer.append(li);
    }
  }

  hideLoader();
  main.append(container);
};
