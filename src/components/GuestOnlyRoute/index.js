import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

export default function GuestOnlyRoute({children}){
    let {token} = useSelector((state) => state.auth)

    if(token) return <Navigate to='/' replace={true}/>

    return children || <Outlet />
}