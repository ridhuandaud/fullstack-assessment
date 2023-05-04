import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import {
    createBrowserRouter,
    RouterProvider,
} from "react-router-dom";
import CreateProduct from './pages/CreateProduct.tsx';
import EditProduct from './pages/editProduct.tsx';

const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
    },
    {
        path: "/create",
        element: <CreateProduct />,
    },
    {
        path: "/edit/:id",
        element: <EditProduct />,
    },
]);

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(<RouterProvider router={router} />)
