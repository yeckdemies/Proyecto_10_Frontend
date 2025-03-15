import { routes } from '../routes/routes';

export const navigate = (e, route) => {
  e.preventDefault();
  window.history.pushState({}, '', route.path);
  renderPage(route);
};

const renderPage = (route) => {
  document.querySelector('main').innerHTML = '';
  route.page();
};

window.onpopstate = () => {
  const path = window.location.pathname;
  const route = routes.find((r) => r.path === path);
  if (route) {
    renderPage(route);
  } else {
    document.querySelector('main').innerHTML = '<h2>404 Not Found</h2>';
  }
};

export const cerrarFormulario = () => {
  const loginOverlay = document.querySelector('.login-overlay');
  if (loginOverlay) {
    loginOverlay.remove();
  }

  const homeRoute = routes.find((route) => route.name === 'Animales');
  if (homeRoute) {
    navigate({ preventDefault: () => {} }, homeRoute);
  } else {
    console.error('Not Found');
  }
};

export const handleApiResponse = async (response) => {
  if (response.ok) {
    const data = await response.json();
    return data;
  } else {
    const errorResponse = await response.json();
    throw new Error(errorResponse.message || `Error: ${response.statusText}`);
  }
};
