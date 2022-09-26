import React, { useEffect } from 'react';
import { useMercadopago } from 'react-sdk-mercadopago';

export default function Mercadopago({ preferenceId }) {
  const mercadopago = useMercadopago.v2(`${process.env.NEXT_PUBLIC_KEY}`, {
    locale: 'es-CO',
  });

  useEffect(() => {
    if (mercadopago) {
      mercadopago.checkout({
        preference: {
          id: `${preferenceId}`,
        },
        autoOpen: true,
        render: {
          container: '.cho-container',
          label: 'Pagar',
        },
      });
    }
  }, [mercadopago]);

  return (
    <div>
      <div className='cho-container' />
    </div>
  );
}
