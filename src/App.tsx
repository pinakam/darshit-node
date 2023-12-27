import React, { useState } from 'react';
import Component1 from './Component/Component1';
import Component2 from './Component/Component2';
import Component3 from './Component/Component3';
import Component4 from './Component/Component4';
import Component5 from './Component/Component5';
import { useSelector, useDispatch } from "react-redux";
import { RootState } from './store/store';
import { setCurrentComponent,updateComponentData } from './slice/component1Slice'; 
const App = () => {
  const dispatch = useDispatch();
  const currentComponent = useSelector((state:RootState) => state.slice1.currentComponent)
  const handleNext = () => {
    if (currentComponent < 5) {
      dispatch(setCurrentComponent(currentComponent + 1))
    }
  }

  const handlePrevious = () => {
    if (currentComponent > 1) {
      dispatch(setCurrentComponent(currentComponent - 1));
    }
  }

  return (
    <div className='container justify-content-center mt-20px'>
      {currentComponent === 1 && <Component1 />}
      {currentComponent === 2 && <Component2 />}
      {currentComponent === 3 && <Component3 />}
      {currentComponent===4 && <Component4/>}
      {currentComponent===5 && <Component5/>}

      <button onClick={handlePrevious} disabled={currentComponent === 1}>
        Previous
      </button>
      <button onClick={handleNext} disabled={currentComponent === 5}>
        Next
      </button>
    </div>
  );
};

export default App;
