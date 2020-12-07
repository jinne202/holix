import React from 'react';
import Head from 'next/head';
import '../styles/global.css';
import Scrollbar from 'react-smooth-scrollbar';
import wrapper from '../store/configureStore';

const Holix = ({ Component }) => {
  return (
    <>
      <Head>
        <title>HOLIX</title>
      </Head>
      <div>
        <Scrollbar style={{height : "100vh"}}
          damping={0.08}
          thumbMinSize={40}
        >
          <div>
            <Component />
            </div>
        </Scrollbar>
      </div>
    </>
  );
};

// HOLIX.propTypes = {
//   Component: PropTypes.elementType.isRequired,
// };

export default wrapper.withRedux(Holix);