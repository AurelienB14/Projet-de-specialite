import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './index.css'
import Layout from './components/layout/Layout';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Profile from './pages/Profile';
import Users from './pages/Users';
import Setups from './pages/Setups';
import AddSetup from './components/profile/AddSetup';

import Games from './pages/Games';
import Game from './pages/Game';
import CreateUpdateGame from './pages/CreateUpdateGame';

export default function App() {
    return (
        <BrowserRouter>
            <Layout>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/profile" element={<Profile />} />
                    <Route path="/users" element={<Users />} />
                    <Route path="/games" element={<Games />} />
                    <Route path="/game/:id" element={<Game />} />
                    <Route path="/createupdategame" element={<CreateUpdateGame />} />
                    <Route path="/createupdategame/:id" element={<CreateUpdateGame />} />
                    <Route path="/setups" element={<Setups />} />
                    <Route path="/profile/setup" element={<AddSetup />} />

                </Routes>
            </Layout>
        </BrowserRouter>
    );
}