import React from 'react';
import Banner from '../../components/Banner/Banner';
import About from '../../components/About/About';
import Packages from '../../components/Packages/Packages';
import { Helmet } from 'react-helmet';

const Home = () => {
    return (
        <div>
            <Helmet>
                <title>Asset Management || Home</title>
            </Helmet>
            <Banner></Banner>
            <About></About>
            <Packages></Packages>
        </div>
    );
};

export default Home;