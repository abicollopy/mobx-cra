import React from 'react';
import './App.css';
import { makeAutoObservable } from "mobx";
import { observer } from "mobx-react";

class Incrementer {
  number = 0

  constructor() {
      makeAutoObservable(this)
  };

  increase() {
      this.number += 1
  };

  reset() {
      this.number = 0
  };
};

const Ticker = observer(({ myIncrementer }: { myIncrementer:Incrementer }) => {
  return (
    <div className="body">
      <div className="buttonContainer">
        <div
          className="button"
          onClick={() => {
            myIncrementer.increase();
          }}>Click Me!</div>
          <div
          className="button"
          onClick={() => {
            myIncrementer.reset();
          }}>Reset</div>
      </div>
      <div className="display">The number is {myIncrementer.number}</div>
    </div>
  );
});

const App = () => {
  const myIncrementer = new Incrementer();
  return(
    <Ticker myIncrementer={myIncrementer} />
  );
};

export default App;
