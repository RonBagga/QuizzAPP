import React, { useState } from "react";
import About from "../components/About";
import Home from "../components/Home";


const HomePage = () => {
    return(
        <div>
            <Home />
            <About />
        </div>
    );
}

export default HomePage;