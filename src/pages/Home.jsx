import React from 'react'
import { useNavigate } from 'react-router-dom'
import { logout } from '../services/config';

const Home = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate("/login");
    };

    return (
        <div>
            <h2>Home Page!</h2>
            <p>
                Lorem ipsum dolor sit, amet consectetur adipisicing elit. Modi at enim dolorem molestias odit amet quia, eligendi quasi libero esse hic dicta necessitatibus aliquam accusantium, tenetur consectetur quidem autem accusamus!
            </p>
            <button className="flex mx-auto px-12 bg-[#0E345A] text-white py-2 rounded-lg hover:bg-[#0e345ade] transition-colors mb-5" onClick={handleLogout}>Logout</button>
        </div>
    )
}

export default Home