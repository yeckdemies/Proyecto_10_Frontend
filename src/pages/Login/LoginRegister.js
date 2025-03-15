import { submitLogin, submitRegister } from '../../api/userService';
import { Button } from '../../components/Button/Button';
import { cerrarFormulario } from '../../utils/functions/tools';
import './LoginRegister.css';

export const LoginRegister = () => {
  const main = document.querySelector('main');
  main.innerHTML = '';

  const loginDiv = document.createElement('div');
  loginDiv.classList.add('login-overlay');

  Login(loginDiv);

  loginDiv.id = 'login';

  main.append(loginDiv);
};

const Login = (elementoPadre) => {
  const container = document.createElement('div');
  container.classList.add('login-page');

  const form = document.createElement('form');
  form.classList.add('login-form');

  const h2 = document.createElement('h2');
  h2.textContent = 'Iniciar Sesión';

  const inputUser = document.createElement('input');
  const inputEmail = document.createElement('input');
  const inputPassword = document.createElement('input');
  const acceder = Button('Acceder');
  const cancelar = Button('Cancelar');
  const p = document.createElement('p');

  acceder.type = 'submit';
  acceder.classList.add('login-btn');

  cancelar.type = 'button';
  cancelar.classList.add('cancel-btn');
  cancelar.textContent = 'Cancelar';

  p.classList.add('register-text');
  p.textContent = '¿No tienes cuenta?';

  const registerLink = document.createElement('a');
  registerLink.href = '#';
  registerLink.id = 'register-link';
  registerLink.textContent = 'Regístrate';

  const loginText = document.createElement('p');
  loginText.classList.add('login-text');
  loginText.innerHTML =
    '¿Ya tienes cuenta? <a href="#" id="login-link">Inicia sesión</a>';
  loginText.style.display = 'none';

  const loginLink = loginText.querySelector('#login-link');

  inputUser.type = 'text';
  inputUser.placeholder = 'Nombre de usuario';
  inputUser.required = true;
  inputUser.classList.add('login-input');

  inputEmail.type = 'email';
  inputEmail.placeholder = 'Correo electrónico';
  inputEmail.required = false;
  inputEmail.classList.add('login-input', 'hidden');

  inputPassword.type = 'password';
  inputPassword.placeholder = 'Contraseña';
  inputPassword.required = true;
  inputPassword.classList.add('login-input');

  form.append(h2);
  form.append(inputUser);
  form.append(inputEmail);
  form.append(inputPassword);
  form.append(acceder);
  form.append(cancelar);
  form.append(p);
  form.append(registerLink);
  form.append(loginText);

  container.append(form);
  elementoPadre.append(container);

  let isRegisterMode = false;

  form.addEventListener('submit', (event) => {
    event.preventDefault();
    if (isRegisterMode) {
      submitRegister(
        inputUser.value,
        inputEmail.value,
        inputPassword.value,
        form
      );
    } else {
      submitLogin(inputUser.value, inputPassword.value, form);
    }
  });

  cancelar.addEventListener('click', (event) => {
    event.preventDefault();
    cerrarFormulario();
  });

  registerLink.addEventListener('click', (event) => {
    event.preventDefault();
    isRegisterMode = true;
    h2.textContent = 'Regístrate';
    inputEmail.classList.remove('hidden');
    inputEmail.required = true;
    registerLink.style.display = 'none';
    p.style.display = 'none';
    loginText.style.display = 'block';
    acceder.textContent = 'Registrarse';
  });

  loginLink.addEventListener('click', (event) => {
    event.preventDefault();
    isRegisterMode = false;
    h2.textContent = 'Iniciar Sesión';
    inputEmail.classList.add('hidden');
    inputEmail.required = false;
    registerLink.style.display = 'block';
    p.style.display = 'block';
    acceder.textContent = 'Acceder';
    loginText.style.display = 'none';
  });
};
