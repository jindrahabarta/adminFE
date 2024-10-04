import './App.css'
import Home from './pages/Home'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Admin from './pages/Admin'
import Navbar from './components/global/ui/Navbar'
import Dashboard from './components/admin/Dashboard'
import AddProduct from './components/admin/AddProduct'
import { AuthContext } from './providers/AuthProvider'
import { useContext } from 'react'
import PageNotFound from './pages/PageNotFound'
import { Toaster } from 'react-hot-toast'
import Products from './pages/Products'
import ProductsManager from './components/admin/ProductsManager'
import ProductsManagerDetail from './components/admin/ProductsManagerDetail'
import ProductDetail from './components/products/ProductDetail'
import CategoriesManager from './components/admin/CategoriesManager'

const routesForAuth = [
    { path: 'dashboard', element: <Dashboard></Dashboard> },
    { path: 'addproduct', element: <AddProduct></AddProduct> },
    {
        path: 'products',
        element: <ProductsManager></ProductsManager>,
    },
    {
        path: 'products/:id',
        element: <ProductsManagerDetail></ProductsManagerDetail>,
    },
    {
        path: 'categories',
        element: <CategoriesManager></CategoriesManager>,
    },
]

function App() {
    const { auth } = useContext(AuthContext)

    return (
        <BrowserRouter>
            <Toaster position='bottom-right' />
            <Navbar></Navbar>
            <div className='px-4 pt-16  min-h-screen max-w-7xl mx-auto overflow-hidden'>
                <Routes>
                    <Route path='/' element={<Home></Home>}></Route>
                    <Route
                        path='/products'
                        element={<Products></Products>}
                    ></Route>
                    <Route
                        path='/products/:id'
                        element={<ProductDetail></ProductDetail>}
                    ></Route>
                    <Route
                        path='*'
                        element={<PageNotFound></PageNotFound>}
                    ></Route>

                    <Route path='admin' element={<Admin></Admin>}>
                        {auth.isVerified &&
                            routesForAuth.map((route) => (
                                <Route
                                    key={route.path}
                                    path={route.path}
                                    element={route.element}
                                ></Route>
                            ))}
                    </Route>
                </Routes>
            </div>
        </BrowserRouter>
    )
}

export default App
