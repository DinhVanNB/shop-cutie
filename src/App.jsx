
import {createBrowserRouter, RouterProvider} from 'react-router-dom';
import Layout from './layouts/Layout';
import {Home , CategoriesPage, Detail, CartPage, SearchPage} from './pages';


const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout/>,
    children:[
      {
        path:'/',
        element: <Home/>
      },
      {
        path: '/product/:product',
        element: <Detail/>
      },
      {
        path: '/:number/:categories/:id',
        element: <CategoriesPage/>
      },
      {
        path: '/cart',
        element: <CartPage/>
      },
      {
        path: '/search/:keyWord',
        element: <SearchPage/>
      },
    ]
  }
])

const App=()=> <RouterProvider router={router}/>

export default App;
