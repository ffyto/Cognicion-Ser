import React from 'react';
import { InlineWidget } from 'react-calendly';

function Calendly() {
  return (
    <div className='App'>
      <InlineWidget url='https://calendly.com/cognicion-y-ser' />
    </div>
  );
}

export default Calendly;
