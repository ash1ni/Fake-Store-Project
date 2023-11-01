import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store/store';
import Home from './pages/Home';
import Cart from './pages/Cart';
import Navbar from './components/Navbar';
import AddProduct from './components/AddProduct';
import ProductDetails from './pages/Details';

function App() {
    return (
        <div className="App">
            <Provider store={store}>
                <BrowserRouter>
                    <Navbar />
                    <Routes>
                        <Route path="/" element={<Home />}></Route>
                        <Route path="/cart" element={<Cart />}></Route>
                        <Route path="/add-product" render={(props) => <AddProduct {...props} />} element={<AddProduct />}></Route>
                        <Route path='/product/:id' element={<ProductDetails/>}></Route>
                    </Routes>
                </BrowserRouter>
            </Provider>
        </div>
    );
}

export default App;
