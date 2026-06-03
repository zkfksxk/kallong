import { useContext } from 'react';
import { BridgeContext } from './provider';

export function useBridge() {
  const context = useContext(BridgeContext);

  if (!context) {
    throw new Error('useBridge must be used within BridgeProvider');
  }

  return context;
}
