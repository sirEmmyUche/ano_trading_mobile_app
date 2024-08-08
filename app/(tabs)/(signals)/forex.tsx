import React from 'react';
import LiveSignal from "../../../components/liveSignals";
import { getForexSignals } from '../../../APIs';

function Forex() {
  return (
    <LiveSignal signalAPI={getForexSignals} />
  );
}

export default Forex;
