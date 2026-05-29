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
import MyCollection from './pages/MyCollection';

import Games from './pages/Games';
import Game from './pages/Game';
import CreateUpdateGame from './pages/CreateUpdateGame';
import VerifyMySetup from './components/game/VerifyMySetup';
import Article from './pages/Article';
import Articles from './pages/Articles';
import ArticleForm from './pages/ArticleForm';

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
                    <Route path="/game/verify-setup/:id" element={<VerifyMySetup />} />

                    <Route path="/profile/collection" element={<MyCollection />} />
                    <Route path="/articles/:id" element={<Article />} />
                    <Route path="/articles" element={<Articles />} />

                    <Route path="/articles/create" element={<ArticleForm />} />
                    <Route path="/articles/:id/edit" element={<ArticleForm />} />
                </Routes>
            </Layout>
        </BrowserRouter>
    );
}