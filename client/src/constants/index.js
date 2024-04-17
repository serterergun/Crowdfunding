import { logo, dashboard, logout, payment, profile, withdraw} from '../icons';

export const navlinks = [

  {
    name: 'logo',
    imgUrl: logo,
    link: '/',
  },
  {
    name: 'dashboard',
    imgUrl: dashboard,
    link: '/',
  },
/*  {
    name: 'payment',
    imgUrl: payment,
    link: '/',
    disabled: true,
  },
  {
    name: 'withdraw',
    imgUrl: withdraw,
    link: '/',
    disabled: true,
  },*/
  {
    name: 'profile',
    imgUrl: profile,
    link: '/profile',
  },
/*  {
    name: 'logout',
    imgUrl: logout,
    link: '/',
    disabled: true,
  },*/
];
