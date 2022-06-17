import React from 'react';

const ProfileLink = (props) => {
    return (
        <div onClick={(e) => {
            window.location = 'profile'
        }}>
            <img width={'20px'} height={'20px'} alt={"profile"} src={props.user.photo}/>
        </div>
    );
};

export default ProfileLink;