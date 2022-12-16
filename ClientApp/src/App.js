import React, { Component } from "react";
import { Route, Routes } from "react-router-dom";
import AppRoutes from "./AppRoutes";
import "./custom.css";
import Navbar from "./components/navbar/Navbar";

export default class App extends Component {
    static displayName = App.name;

    render() {
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
}
