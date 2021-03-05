import React, { createContext, useContext } from 'react';
import './App.css';
import { makeAutoObservable } from "mobx";
import { observer } from "mobx-react";

class Incrementer {
  number = 0;

  constructor() {
    makeAutoObservable(this);
  };

  increase() {
    this.number += 1;
  };

  reset() {
    this.number = 0;
  };
};

const IncrementerContext = createContext<Incrementer | undefined>(undefined);

const Ticker = observer(() => {
  const useIncrementer = useContext(IncrementerContext);
  return (
    <div className="incrementerContainer">
      <div className="buttonContainer">
        <div
          className="button"
          onClick={() => {
            useIncrementer!.increase(); /**only for when you know not undefined */
          }}>Click Me!</div>
        <div
          className="button"
          onClick={() => {
            if (useIncrementer) {
              useIncrementer.reset(); /**Safer way*/
            };
          }}>Reset</div>
      </div>
      <div className="display">The number is {useIncrementer?.number}</div>
    </div>
  );
});

const App = () => {
  const myIncrementer = new Incrementer();
  return (
    <IncrementerContext.Provider value={myIncrementer}>
      <Ticker />
    </IncrementerContext.Provider>
  );
};

export default App;
