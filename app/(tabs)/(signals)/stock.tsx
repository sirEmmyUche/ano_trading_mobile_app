import React from 'react';
import LiveSignal from "../../../components/liveSignals";
import { getStockSignals} from '../../../APIs';

function Stock() {
  return (
    <LiveSignal signalAPI={getStockSignals} />
  );
}

export default Stock;
