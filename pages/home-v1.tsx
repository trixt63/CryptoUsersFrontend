/* eslint-disable react/no-unknown-property */
import type { NextPage } from 'next';
import Footer from 'src/components/Footer';
import Introduction from 'src/modules/home/Introduction';
// import Product from 'src/modules/home/Product';
// import Register from 'src/modules/home/Register';

const Home: NextPage = () => {
  return (
    <>
      <Introduction />
      {/* <Product />
      <Register /> */}
      <Footer />
    </>
  );
};

export default Home;
