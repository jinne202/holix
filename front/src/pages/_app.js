import React from 'react';
import Head from 'next/head';
import '../styles/global.css';
import wrapper from '../store/configureStore';

const Holix = ({ Component }) => {

  return (
    <>
      <Head>
        <title>HOLIX</title>
      </Head>
      <div>
            <div style={{height : "100vh"}}>
            <Component />
            </div>
      </div>
    </>
  );
};

// HOLIX.propTypes = {
//   Component: PropTypes.elementType.isRequired,
// };

export default wrapper.withRedux(Holix);