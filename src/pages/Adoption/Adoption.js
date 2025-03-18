import { validateUser } from '../../api/userService';
import { AdoptionList } from '../../components/AdoptionList/AdoptionList';
import { hideLoader, showLoader } from '../../components/Loader/Loader';
import './Adoption.css';

export const Adoption = async () => {
  const user = await validateUser();

  if (!user) {
    ShowAlert(
      'Debes iniciar sesión para consultar adopciones.',
      'error',
      3000,
      true
    );

    navigate(
      { preventDefault: () => {} },
      routes.find((route) => route.name === 'Login')
    );
    return;
  }

  AdoptionList();
};
