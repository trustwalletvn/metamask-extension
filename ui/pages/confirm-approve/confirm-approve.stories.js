/* eslint-disable react/prop-types */
import React, { useEffect } from 'react';
import { text } from '@storybook/addon-knobs';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { updateMetamaskState } from '../../store/actions';
import { currentNetworkTxListSelector } from '../../selectors/transactions';
import { store } from '../../../.storybook/preview';

import {
  currentNetworkTxListSample,
  domainMetadata,
} from '../../../.storybook/initial-states/approval-screens/token-approval';
import ConfirmApprove from '.';

export default {
  title: 'Confirmation Screens',
};

// transaction ID, maps to entry in state.metamask.currentNetworkTxList
const txId = 7900715443136469;

const PageSet = ({ children }) => {
  const origin = text('Origin', 'https://metamask.github.io');
  const domainIconUrl = text(
    'Icon URL',
    'https://metamask.github.io/test-dapp/metamask-fox.svg',
  );
  const state = store.getState();
  const currentNetworkTxList = useSelector(currentNetworkTxListSelector);
  const transaction = currentNetworkTxList.find(({ id }) => id === txId);

  useEffect(() => {
    transaction.origin = origin;
    const newState = Object.assign(state.metamask, { currentNetworkTxList: [transaction] })
    store.dispatch(
      updateMetamaskState(newState),
    );

  }, [origin, transaction]);

  useEffect(() => {
    const newState = Object.assign(state.metamask, { domainMetadata: {
      [origin]: {
        icon: domainIconUrl,
      },
    }})
    store.dispatch(
      updateMetamaskState(newState),
    );

    
  }, [domainIconUrl, origin]);

  const params = useParams();
  params.id = txId;
  return children;
};

export const ApproveTokens = () => {
  const state = store.getState()
  const newState = Object.assign(state.metamask, { domainMetadata })
  store.dispatch(
    updateMetamaskState(newState),
  );
  return (
    <PageSet>
      <ConfirmApprove />
    </PageSet>
  );
};
