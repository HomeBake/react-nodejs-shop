import React, {useEffect} from 'react';
import RateStar from "./svg/RateStar";
import {useState} from "react";
import {setDeviceRating} from "../http/deviceAPI";

const RatingStars = ({setRates,rate, initUserRate, setInitUserRate}) => {
    const [userRate, setUserRate] = useState(0)
    const rating = [1,2,3,4,5]
    const inActiveStar = {
        fill: "white",
        stroke: "black",
    }
    const inActiveUserStar = {
        fill: "#ffe69d",
    }
    const activeStar = {
        fill: "#ff9800",
    }
    const activeUserStar = {
        fill: "#ffc107"
    }
    const RateStarProps = {
        setUserRate: setUserRate,
        setInitUserRate: setInitUserRate,
        setRates: setRates,
    }

    useEffect(()=>{
        setUserRate(initUserRate)
        }, [initUserRate]
    )

    return (
        <div className={'d-flex'} onMouseLeave={() => setUserRate(initUserRate)}>
            {rating.map((key)=>
                <div key={key}>
                    {(key > rate) && (key > userRate) &&
                        <RateStar style={inActiveStar} star={key} {...RateStarProps}/>
                    }
                    {(key > rate) && (key <= userRate) &&
                        <RateStar style={inActiveUserStar} star={key} {...RateStarProps}/>
                    }
                    {(key <= rate) && (key > userRate) &&
                        <RateStar style={activeStar} star={key} {...RateStarProps}/>
                    }
                    {(key <= rate) && (key <= userRate) &&
                        <RateStar style={activeUserStar} star={key} {...RateStarProps}/>
                    }
                </div>
            )}
        </div>
    );
};

export default RatingStars;