import './Alert.css';

export const ShowAlert = (
  message,
  type = 'success',
  duration = 3000,
  persist = false
) => {
  if (persist) {
    localStorage.setItem(
      'alertMessage',
      JSON.stringify({ message, type, duration })
    );
  }

  const existingAlert = document.querySelector('.alert-container');
  if (existingAlert) existingAlert.remove();

  const alertContainer = document.createElement('div');
  alertContainer.classList.add('alert-container', type);

  const alertMessage = document.createElement('p');
  alertMessage.textContent = message;
  alertContainer.appendChild(alertMessage);

  const closeButton = document.createElement('button');
  closeButton.textContent = '✖';
  closeButton.classList.add('close-btn');
  closeButton.addEventListener('click', () => {
    alertContainer.remove();
    localStorage.removeItem('alertMessage');
  });
  alertContainer.appendChild(closeButton);

  document.body.appendChild(alertContainer);

  if (type !== 'error') {
    setTimeout(() => {
      alertContainer.remove();
      localStorage.removeItem('alertMessage');
    }, duration);
  }
};

export const checkStoredAlert = () => {
  const storedAlert = localStorage.getItem('alertMessage');
  if (storedAlert) {
    const { message, type, duration } = JSON.parse(storedAlert);
    ShowAlert(message, type, duration);
    localStorage.removeItem('alertMessage');
  }
};
