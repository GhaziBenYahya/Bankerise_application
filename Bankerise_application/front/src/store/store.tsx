import { createStore, applyMiddleware,combineReducers } from 'redux';
import bankReducer from './Bank/bankReducer';
import thunk from 'redux-thunk';
import authReducer from './login/reducer';
import professionReducer from './Profession/ProfessionReducer';
import countryReducer from './Country/CountryReducer';
import customerSettingsReducer from './CustomerSegments/CustomerSegmentsReducer';
import swiftAddressReducer from './SwiftAdress/SwiftAdressReducer';
import productListReducer from './ProductList/ProductListReducer';
import cardProductListReducer from './CardProductList/CardProductListReducer';
import customerReducer from './Customer/CustomerReducer';

const rootReducer = combineReducers({
  auth: authReducer, 
  banks: bankReducer,
  professions: professionReducer,
  countries: countryReducer,
  cardProductLists: cardProductListReducer,
  customersSettings: customerSettingsReducer,
  swiftAddresses: swiftAddressReducer,
  productlists : productListReducer,
  customers:customerReducer
});

export type RootState = ReturnType<typeof rootReducer>;

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;