import React, {useEffect, useState} from 'react';
import Search from "./search";
import ProfileLink from "./profile-link";
import HeaderMenus from "./header-menus";



function Header(props) {

    const USER_API_BASE_URL = "https://jsonplaceholder.typicode.com/users/1";
    const PHOTOS_API_BASE_URL = "https://jsonplaceholder.typicode.com/photos/" + 1;

    async function getUser() {
        const [userRes, photoRes] = await Promise.all([
            fetch(USER_API_BASE_URL),
            fetch(PHOTOS_API_BASE_URL),
        ]);

        const [user,photo]  = await Promise.all([
            userRes.json(),
            photoRes.json(),
        ]);

        const users = {
            id: user.id,
            name: user.name,
            photo: photo.url,
        };

        console.log(users)

        setUser(users);
    }

    const [user, setUser] = useState({
            id: 0,
            name: null,
            photo: null,
        })

    useEffect(()=> {
        getUser();
        console.log(user)
    }, [])



    return (
        <div>
            <Search placeholder={"Search"}/>
            <ProfileLink user={user}/>
            <HeaderMenus user={user}/>

        </div>
    );
}

export default Header;