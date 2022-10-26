import React, { useEffect } from 'react';
import { PropTypes } from 'prop-types';
import { useMercadopago } from 'react-sdk-mercadopago';
import { updateAppointment } from '../services/appointments';

export default function Mercadopago({ preferenceId, appointmentId }) {
  const mercadopago = useMercadopago.v2(`${process.env.NEXT_PUBLIC_KEY}`, {
    locale: 'es-CO',
  });

  useEffect(() => {
    const appointmentUpdate = async () => {
      await updateAppointment(appointmentId, { paymentId: preferenceId });
    };
    if (mercadopago) {
      mercadopago.checkout({
        preference: {
          id: `${preferenceId}`,
        },
        autoOpen: true,
      });
    }
    appointmentUpdate();
  }, [mercadopago]);

  return <div />;
}

Mercadopago.propTypes = {
  preferenceId: PropTypes.string,
  appointmentId: PropTypes.string,
};
Mercadopago.defaultProps = {
  preferenceId: '',
  appointmentId: '',
};
