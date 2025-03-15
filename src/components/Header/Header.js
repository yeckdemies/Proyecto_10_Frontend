import { validateUser } from '../../api/userService';
import { Favourites } from '../../pages/Favourites/Favourites';
import { navigate } from '../../utils/functions/tools';
import { routes } from '../../utils/routes/routes';
import { checkStoredAlert } from '../Alert/Alert';
import './Header.css';

export const Header = async () => {
  const header = document.createElement('header');
  const logo = document.createElement('div');
  const title = document.createElement('span');
  const nav = document.createElement('nav');
  const ul = document.createElement('ul');
  const button = document.createElement('button');
  const userContainer = document.createElement('div');

  checkStoredAlert();

  ul.className = 'nav-menu';
  button.className = 'menu-toggle';
  button.setAttribute('aria-label', 'Toggle Menu');
  button.textContent = '☰';
  nav.appendChild(button);
  button.addEventListener('click', () => {
    ul.classList.toggle('open');
  });

  logo.className = 'logo';

  const a = document.createElement('a');
  const img = document.createElement('img');
  img.src =
    'https://res.cloudinary.com/dszffglcl/image/upload/v1739986326/PetAdopt%20Images/m1b9eaa8bikoc0ouv9ca.png';
  img.alt = 'PetAdopt Logo';
  a.href = routes[0].path;
  a.appendChild(img);
  logo.appendChild(a);

  title.className = 'logo-title';
  title.textContent = 'Pet Adopt';
  logo.appendChild(title);

  a.addEventListener('click', (e) =>
    navigate(
      e,
      routes.find((route) => route.name === 'Animales')
    )
  );

  const user = await validateUser();
  const isAuthenticated = !!user;
  const isAdmin = user?.role === 'admin';

  userContainer.className = 'user-container';

  const visibleRoutes = routes.filter((route) => {
    if (!isAuthenticated) {
      return route.name === 'Animales' || route.name === 'Login';
    }
    if (!isAdmin && route.name === 'Registrar Mascota') {
      return false;
    }
    if (route.name === 'Editar Mascota') {
      return false;
    }
    if (isAdmin && route.name === 'Favoritos') {
      return false;
    }
    return route.name !== 'Login';
  });

  for (const route of visibleRoutes) {
    const li = document.createElement('li');
    const a = document.createElement('a');
    a.href = route.path;
    a.textContent = route.name;

    a.addEventListener('click', (e) => navigate(e, route));

    li.appendChild(a);
    ul.appendChild(li);
  }

  if (isAuthenticated) {
    const welcomeText = document.createElement('span');
    welcomeText.textContent = `Bienvenid@, ${user.userName || 'Usuario'}`;
    welcomeText.className = 'welcome-text';

    const logoutBtn = document.createElement('button');
    logoutBtn.textContent = 'Desconectar';
    logoutBtn.className = 'logout-button';

    logoutBtn.addEventListener('click', () => {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      location.reload();
    });

    userContainer.appendChild(welcomeText);
    userContainer.appendChild(logoutBtn);
    nav.appendChild(userContainer);
  }

  header.appendChild(logo);
  header.appendChild(nav);
  nav.appendChild(ul);

  app.appendChild(header);
};
