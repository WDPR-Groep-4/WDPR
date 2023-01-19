import React, { Component } from "react";
import { Route, Routes } from "react-router-dom";
import AppRoutes from "./AppRoutes";
import "./custom.css";
import Navbar from "./components/navbar/Navbar";
import { useQuery } from "@tanstack/react-query";
import { getVoorstellingen } from "./services/FetchFunctions";

export default function App() {
    const { status, data, error } = useQuery({
        queryKey: ["voorstellingen"],
        queryFn: getVoorstellingen,
    });

    return (
        <div>
            <Navbar />
            <Routes>
                {AppRoutes.map((route, index) => {
                    const { element, ...rest } = route;
                    return <Route key={index} {...rest} element={element} />;
                })}
            </Routes>
        </div>
    );
}
