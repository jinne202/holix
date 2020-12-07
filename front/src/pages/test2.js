import React, { useState } from 'react';
import CheckBox from '../components/CheckTest';


function testt() {
  const [check, setCheck] = useState(false);
  const onChange = e => {
    setCheck(e.target.checked);
  };
  return (
    <div>
      <div style={{height : "5000px"}}>
        <CheckBox onChange={onChange} checked={check}/>
        <p>
          <b>check: </b>
          {check ? 'true' : 'false'}
        </p>
      </div>
    </div>
  );
}

export default testt;