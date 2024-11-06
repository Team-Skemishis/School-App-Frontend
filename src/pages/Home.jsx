import React from 'react'
import { useNavigate } from 'react-router-dom'
import { logout } from '../services/config';
import GetUsersComponent from './admin/GetUsersComponent';

const Home = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate("/login");
    };

    return (
        <div className="p-5">
            <h2>Home Page!</h2>
            <GetUsersComponent />
            <p>
                Lorem ipsum dolor sit, amet consectetur adipisicing elit. Modi at enim dolorem molestias odit amet quia, eligendi quasi libero esse hic dicta necessitatibus aliquam accusantium, tenetur consectetur quidem autem accusamus!
            </p>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.</p>
            <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Provident ex, voluptate maxime, dolor id dolorem quia autem quis tenetur hic, eligendi dicta. Optio nemo cumque sunt aut distinctio temporibus impedit.
                Aperiam, officiis! Maxime tenetur placeat iure veniam excepturi aliquid quidem dignissimos dicta? Incidunt tempore inventore velit, vitae hic, omnis eos temporibus sequi eveniet ad, voluptas in ullam architecto. Explicabo, optio?
                Qui est quis quasi vel tempore esse tenetur architecto quisquam facilis eligendi. Reiciendis eaque, incidunt doloribus neque numquam aliquid placeat, eveniet repellendus maiores unde fuga veritatis, beatae blanditiis culpa. Dolorem?
                Incidunt deserunt architecto nihil dolorum dolor error possimus sunt excepturi labore? In iste labore culpa delectus quos aperiam, sint ducimus veniam neque eveniet illum laborum voluptatem, amet a est qui!</p>
            <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Provident ex, voluptate maxime, dolor id dolorem quia autem quis tenetur hic, eligendi dicta. Optio nemo cumque sunt aut distinctio temporibus impedit.
                Aperiam, officiis! Maxime tenetur placeat iure veniam excepturi aliquid quidem dignissimos dicta? Incidunt tempore inventore velit, vitae hic, omnis eos temporibus sequi eveniet ad, voluptas in ullam architecto. Explicabo, optio?
                Qui est quis quasi vel tempore esse tenetur architecto quisquam facilis eligendi. Reiciendis eaque, incidunt doloribus neque numquam aliquid placeat, eveniet repellendus maiores unde fuga veritatis, beatae blanditiis culpa. Dolorem?
                Incidunt deserunt architecto nihil dolorum dolor error possimus sunt excepturi labore? In iste labore culpa delectus quos aperiam, sint ducimus veniam neque eveniet illum laborum voluptatem, amet a est qui!</p>
            <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Provident ex, voluptate maxime, dolor id dolorem quia autem quis tenetur hic, eligendi dicta. Optio nemo cumque sunt aut distinctio temporibus impedit.
                Aperiam, officiis! Maxime tenetur placeat iure veniam excepturi aliquid quidem dignissimos dicta? Incidunt tempore inventore velit, vitae hic, omnis eos temporibus sequi eveniet ad, voluptas in ullam architecto. Explicabo, optio?
                Qui est quis quasi vel tempore esse tenetur architecto quisquam facilis eligendi. Reiciendis eaque, incidunt doloribus neque numquam aliquid placeat, eveniet repellendus maiores unde fuga veritatis, beatae blanditiis culpa. Dolorem?
                Incidunt deserunt architecto nihil dolorum dolor error possimus sunt excepturi labore? In iste labore culpa delectus quos aperiam, sint ducimus veniam neque eveniet illum laborum voluptatem, amet a est qui!</p>
            <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Provident ex, voluptate maxime, dolor id dolorem quia autem quis tenetur hic, eligendi dicta. Optio nemo cumque sunt aut distinctio temporibus impedit.
                Aperiam, officiis! Maxime tenetur placeat iure veniam excepturi aliquid quidem dignissimos dicta? Incidunt tempore inventore velit, vitae hic, omnis eos temporibus sequi eveniet ad, voluptas in ullam architecto. Explicabo, optio?
                Qui est quis quasi vel tempore esse tenetur architecto quisquam facilis eligendi. Reiciendis eaque, incidunt doloribus neque numquam aliquid placeat, eveniet repellendus maiores unde fuga veritatis, beatae blanditiis culpa. Dolorem?
                Incidunt deserunt architecto nihil dolorum dolor error possimus sunt excepturi labore? In iste labore culpa delectus quos aperiam, sint ducimus veniam neque eveniet illum laborum voluptatem, amet a est qui!</p>
            <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Provident ex, voluptate maxime, dolor id dolorem quia autem quis tenetur hic, eligendi dicta. Optio nemo cumque sunt aut distinctio temporibus impedit.
                Aperiam, officiis! Maxime tenetur placeat iure veniam excepturi aliquid quidem dignissimos dicta? Incidunt tempore inventore velit, vitae hic, omnis eos temporibus sequi eveniet ad, voluptas in ullam architecto. Explicabo, optio?
                Qui est quis quasi vel tempore esse tenetur architecto quisquam facilis eligendi. Reiciendis eaque, incidunt doloribus neque numquam aliquid placeat, eveniet repellendus maiores unde fuga veritatis, beatae blanditiis culpa. Dolorem?
                Incidunt deserunt architecto nihil dolorum dolor error possimus sunt excepturi labore? In iste labore culpa delectus quos aperiam, sint ducimus veniam neque eveniet illum laborum voluptatem, amet a est qui!</p>
            <button className="flex mx-auto px-12 bg-[#0E345A] text-white py-2 rounded-lg hover:bg-[#0e345ade] transition-colors mb-5" onClick={handleLogout}>Logout</button>
        </div>
    )
}

export default Home