import './Loader.css';

export const showLoader = () => {
  let loader = document.querySelector('.loader-overlay');
  if (!loader) {
    loader = document.createElement('div');
    loader.classList.add('loader-overlay');
    loader.innerHTML = `<div class="loader"></div>`;
    document.body.appendChild(loader);
  }
};

export const hideLoader = () => {
  const loader = document.querySelector('.loader-overlay');
  if (loader) {
    loader.remove();
  }
};
