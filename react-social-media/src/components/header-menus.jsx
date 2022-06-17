import React, {useEffect, useState} from 'react';

function redirect(link) {
    window.location = link;
    console.log(link);
}

function HeaderMenus(props) {

    const [user,setUser] = useState('');

    useEffect(()=>{
        setUser(props.user.name)
    }, [props])

    const menus = [
        {
            id: 1,
            title: user,
            link: "profile",
        },
        {
            id: 2,
            title: "home",
            link: "home"
        },
        {
            id: 3,
            title: "create",
            link: "create",
        },
    ];

    return (
        <div>
            {menus.map((menu)=> {
                return <div key={menu.id} onClick={(e) => redirect(menu.link)}> {menu.title} </div>
            })}
        </div>
    );
}

export default HeaderMenus;

