import React from 'react';
import {Star} from "lucide-react";


const Rating = ({rating}: { rating: number }) => {

    const getColor = (index: number) => {
        return index < Math.floor(rating) ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'
    }

    return (
        <div className={"flex gap-0.5 items-center"}>
            {Array.from({length: 5}).map((_, i) => (
                <span key={i}>
                    <Star className={`${getColor(i)} w-4 h-4`}/>
                </span>
            ))}
        </div>
    )
};

export default Rating;