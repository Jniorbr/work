import { BrowserRouter , Route , Routes } from 'react-router-dom'

import Home from './pages/Home';
import Filmes from './pages/FIlmes';
import Favoritos from './pages/Favoritos';


import Header from './components/Header';
import Erro from './pages/Erro';

function Routesapp() {
    return (
        <BrowserRouter>
        <Header/>
        <Routes>
            <Route path='/' element ={ <Home/> }/>
            <Route path='/filme/:id' element ={ <Filmes/> }/>
            <Route path='/favoritos' element ={ <Favoritos/> }/>

            <Route path='*' element ={ <Erro/> }/>
        </Routes>
        </BrowserRouter>
    )
}

export default Routesapp;