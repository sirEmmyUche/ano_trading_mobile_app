import React from 'react';
import LiveSignal from "./liveSignals";
import { getForexSignals } from '../APIs';

function Forex() {
  return (
    <LiveSignal signalAPI={getForexSignals} />
  );
}

export default Forex;
