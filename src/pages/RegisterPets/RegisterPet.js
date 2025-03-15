import { PetForm } from '../../components/PetForm/PetForm';
import { registerPet } from '../../api/petsService';
import { routes } from '../../utils/routes/routes';
import { navigate } from '../../utils/functions/tools';
import { ShowAlert } from '../../components/Alert/Alert';
import { hideLoader, showLoader } from '../../components/Loader/Loader';

export const RegisterPet = () => {
  const main = document.querySelector('main');
  main.innerHTML = '';

  const handleSubmit = async (formData, submitButton) => {
    submitButton.disabled = true;
    showLoader();
    try {
      const result = await registerPet(formData);
      if (result) {
        ShowAlert('Mascota registrada correctamente.', 'success', 3000, true);
        setTimeout(() => {
          navigate(
            { preventDefault: () => {} },
            routes.find((route) => route.name === 'Animales')
          );
        }, 2000);
      }
    } catch (error) {
      ShowAlert(error.message, 'error', 3000, true);
      submitButton.disabled = false;
    } finally {
      hideLoader();
    }
  };

  const petForm = PetForm({ mode: 'register', onSubmit: handleSubmit });
  main.appendChild(petForm);
};
