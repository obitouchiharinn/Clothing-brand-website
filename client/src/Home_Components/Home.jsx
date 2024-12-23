import React from "react";

import Nav from './Navbar'
import Slide from './Center'
import Card from './Card'
import Icon from './IconBanner'
import Footer from './Footer'


const Home = () => {
  return (
    <div>
      <Nav />
      <Slide />
      <Card />
      <Icon />
      <Footer />
    </div>
  );
};

export default Home;
