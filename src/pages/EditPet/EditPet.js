import { PetForm } from '../../components/PetForm/PetForm';
import { routes } from '../../utils/routes/routes';
import { navigate } from '../../utils/functions/tools';
import { getPetById, updatePet } from '../../api/petsService';
import { ShowAlert } from '../../components/Alert/Alert';
import { PageTitle } from '../../components/PageTitle/PageTitle';
import { hideLoader, showLoader } from '../../components/Loader/Loader';

export const EditPet = async (petId) => {
  const main = document.querySelector('main');
  main.innerHTML = '';

  const petData = await getPetById(petId);
  if (!petData) {
    ShowAlert('No se encontró la mascota.', 'error', 3000, true);
    navigate(
      { preventDefault: () => {} },
      routes.find((route) => route.name === 'Animales')
    );
    return;
  }

  const handleSubmit = async (formData) => {
    showLoader();
    const updated = await updatePet(petId, formData);
    if (updated) {
      ShowAlert('Mascota actualizada correctamente.', 'success', 3000, true);
      navigate(
        { preventDefault: () => {} },
        routes.find((route) => route.name === 'Animales')
      );
    } else {
      ShowAlert('Error al actualizar la mascota.', 'error', 3000, true);
    }
  };

  const petForm = PetForm({ mode: 'edit', petData, onSubmit: handleSubmit });
  main.appendChild(petForm);
  hideLoader();
};
