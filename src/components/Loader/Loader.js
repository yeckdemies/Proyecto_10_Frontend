import './Loader.css';

let loaderCounter = 0;

export const showLoader = () => {
  loaderCounter++;

  let loader = document.querySelector('.loader-overlay');
  if (!loader) {
    loader = document.createElement('div');
    loader.classList.add('loader-overlay');
    loader.innerHTML = `<div class="loader"></div>`;
    document.body.appendChild(loader);
  }
};

export const hideLoader = () => {
  loaderCounter--;
  if (loaderCounter <= 0) {
    loaderCounter = 0;
    const loader = document.querySelector('.loader-overlay');
    if (loader) loader.remove();
  }
};
