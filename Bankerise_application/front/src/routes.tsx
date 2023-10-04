import { Icon } from '@chakra-ui/react';
import { MdSettings, 
  MdLock, 
  MdFormatListBulletedAdd,
  MdOutlineAddCard,
  MdAccountBalance,
  MdSupervisedUserCircle,
  MdOutlineDomainAdd, 
  MdWork,
  MdFlag } from 'react-icons/md';

import CardProductList from 'views/admin/CardProductList';
import ProfessionList from 'views/admin/ProfessionList';
import ProductList from 'views/admin/ProductList';
import BankList from 'views/admin/BankList';
import IndustryList from 'views/admin/IndustryList';
import CountryList from 'views/admin/CountryList';
import CustomerSegments from 'views/admin/CustomerSegments';
import SwiftAddressList from 'views/admin/SwiftAddressList';
import SignInCentered from 'views/auth/signIn';
import Customer from 'views/admin/Customer';



const routes = [
  {
    name: 'Sign In',
    layout: '/auth',
    path: '/signIn',
    icon: <Icon as={MdLock} width='20px' height='20px' color='inherit' />,
    component: SignInCentered
  },
  {
    name: 'Configuration',
    layout: '/admin',
    group: 'Configuration',
    icon: <Icon as={MdSettings} width='20px' height='20px' color='inherit' />,
    
    subMenu: [
          
      {
        name: 'Product List',
        layout: '/admin',
        path: '/ProductList',
        icon: <Icon as={MdFormatListBulletedAdd} width='20px' height='20px' color='inherit' />,
        component: ProductList
      },
      {
        name: 'Customer Segments',
        layout: '/admin',
        path: '/CustomerSegments',
        icon: <Icon as={MdSupervisedUserCircle} width='20px' height='20px' color='inherit' />,
        component: CustomerSegments
      },
   
      {
        name: 'Bank List',
        layout: '/admin',
        path: '/BankList',
        icon: <Icon as={MdAccountBalance} width='20px' height='20px' color='inherit' />,
        component: BankList
      },
      {
        name: 'Card Products List',
        layout: '/admin',
        path: '/CardProductList',
        icon: <Icon as={MdOutlineAddCard} width='20px' height='20px' color='inherit' />,
        component: CardProductList
      },
      {
        name: 'Industry List',
        layout: '/admin',
        path: '/IndustryList',
        icon: <Icon as={MdOutlineDomainAdd} width='20px' height='20px' color='inherit' />,
        component: IndustryList
      },
      {
        name: 'Profession List',
        layout: '/admin',
        path: '/ProfessionList',
        icon: <Icon as={MdWork} width='20px' height='20px' color='inherit' />,
        component: ProfessionList
      },

      {
        name: 'Country List',
        layout: '/admin',
        path: '/CountryList',
        icon: <Icon as={MdFlag} width='20px' height='20px' color='inherit' />,
        component: CountryList
      },
      {
        name: 'Swift Address List',
        layout: '/admin',
        path: '/SwiftAddressList',
        icon: <Icon as={MdFormatListBulletedAdd} width='20px' height='20px' color='inherit' />,
        component: SwiftAddressList
      },
      {
        name : 'Customer' ,
        layout: '/admin',
        path : '/customer' ,
        icon : <Icon as ={MdWork} width ='20px' height ='20px'></Icon> ,
        component : Customer
      }
   
     
   
    ]
  },
];

export default routes;
