import { Adoption } from '../../pages/Adoption/Adoption';
import { EditPet } from '../../pages/EditPet/EditPet';
import { LoginRegister } from '../../pages/Login/LoginRegister';
import { Pets } from '../../pages/Pets/Pets';
import { RegisterPet } from '../../pages/RegisterPets/RegisterPet';
import { Favourites } from '../../pages/Favourites/Favourites';

export const routes = [
  {
    path: '/Pets',
    name: 'Animales',
    page: Pets
  },
  {
    path: '/Adoption',
    name: 'Adopciones',
    page: Adoption
  },
  {
    path: '/Login',
    name: 'Login',
    page: LoginRegister
  },
  {
    path: '/RegisterPet',
    name: 'Registrar Mascota',
    page: RegisterPet
  },
  {
    path: '/editPet/:id',
    name: 'Editar Mascota',
    page: (id) => EditPet(id)
  },
  {
    path: '/Favourites',
    name: 'Favoritos',
    page: Favourites
  }
];
