import React from 'react';
import Header from './headerr';
import Button from './button';
import Icons from './icons';
import Linkbutton from './linkbutton';
import Testimonials from './testimonials';
import Footer from './Footer';

const Homepage: React.FC = () => {
  const homepageStyle: React.CSSProperties = {
    marginTop: '50px',
    padding: '50px',
  };

  return (
    <div style={homepageStyle}>
      <Header />
      <Button />
      <Icons />
      <Linkbutton />
      <Testimonials />
      <Footer />
    </div>
  );
};

export default Homepage;
