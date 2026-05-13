import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/layout/Layout';
import Home from './pages/Home';
import Users from './pages/Users';
import Login from './pages/Login';
import Profile from './pages/Profile';

export default function App() {
    return (
        <BrowserRouter>
            <Layout>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/users" element={<Users />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/Profile" element={<Profile />} />

                </Routes>
            </Layout>
        </BrowserRouter>
    );
}