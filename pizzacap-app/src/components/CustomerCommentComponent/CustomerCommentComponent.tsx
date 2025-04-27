import React, { FC, useState } from 'react';
import starimg from '../../assets/stars.png';
import quotes from '../../assets/Vector.png';

export interface CustomerCommentComponentProps {
    name: string;
    stars: number;
    image_url: string;
    comment: string;
}
const CustomerCommentComponent: React.FC<CustomerCommentComponentProps> = ({
    name,
    stars,
    image_url,
    comment,
}) => {
    return (
        <div className="p-12 pb-8 pt-20 rounded-xl bg-primary mt-12 text-white font-jost  relative">
            <img
                src={image_url}
                alt=""
                className="rounded-full w-24 absolute -top-[2rem]"
            />
            <p className="top-3 absolute left-[9.5rem]">{name}</p>
            <div className="top-8 absolute left-[9.5rem] inline-flex">
                <p className="pr-1">{stars}</p>
                <img src={starimg} alt="" className="w-6 h-6" />
            </div>
            <p className="font-light">{comment}</p>
            <img src={quotes} alt="" className="absolute right-12" />
        </div>
    );
};

export default CustomerCommentComponent;
