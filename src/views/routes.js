import Institute from 'views/InstitutePage';
import Profile from 'views/Profile';
import Contacts from 'views/Contacts';
import MyBooks from 'views/MyBooks';
import BooksWishlist from 'views/BooksWishlist';
import Combinacoes from 'views/CombinationsPage';

export const dashRoutes = [
  {
    path: '/livros',
    name: 'Livros',
    icon: 'library_books',
    component: MyBooks,
    layout: '/app',
    sidebar: true
  },
  {
    path: '/livros/:view/:id?',
    component: MyBooks,
    layout: '/app'
  },
  {
    path: '/contatos',
    name: 'Contatos',
    icon: 'contacts',
    component: Contacts,
    layout: '/app',
    sidebar: true
  },
  {
    path: '/dados-gerais',
    name: 'Dados Gerais',
    icon: 'account_circle',
    component: Profile,
    layout: '/app',
    sidebar: true
  }
];
