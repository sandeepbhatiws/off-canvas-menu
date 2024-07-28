import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Link,
} from "react-router-dom";
import Home from './Home';
import ProductListing from './ProductListing';
import ProductDetails from './ProductDetails';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home/>,
  },
  {
    path: "products",
    element: <ProductListing/>,
  },
  {
    path: "products/:category",
    element: <ProductListing/>,
  },
  {
    path: "products/product-details/:id",
    element: <ProductDetails/>,
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
