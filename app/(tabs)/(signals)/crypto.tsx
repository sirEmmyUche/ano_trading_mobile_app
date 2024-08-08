import React from 'react';
import LiveSignal from "../../../components/liveSignals";
import { getCryptoSignals } from '../../../APIs';

function Crypto() {
  return (
    <LiveSignal signalAPI={getCryptoSignals} />
  );
}

export default Crypto;
