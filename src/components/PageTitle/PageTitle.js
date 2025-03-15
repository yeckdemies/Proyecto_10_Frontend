import './PageTitle.css';

export const PageTitle = (title) => {
  const titleContainer = document.createElement('div');
  titleContainer.className = 'page-title-container';

  const titleElement = document.createElement('h1');
  titleElement.className = 'page-title';
  titleElement.textContent = title;

  titleContainer.appendChild(titleElement);
  return titleContainer;
};
