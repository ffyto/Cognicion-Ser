import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Mercadopago from '../../components/mercadopago';
import { createPayment } from '../../services/payments';

function Pagos() {
  const router = useRouter();
  const { id } = router.query;
  const [preferenceId, setPreferenceId] = useState('');
  const [appointmentId, setAppointmentId] = useState('');

  useEffect(() => {
    const pago = async () => {
      let result = await createPayment(id);
      setPreferenceId(result.id);
      setAppointmentId(id);
    };
    if (id) {
      pago();
    }
  }, [id]);

  return (
    <div>
      {preferenceId ? (
        <Mercadopago
          preferenceId={preferenceId}
          appointmentId={appointmentId}
        />
      ) : null}
    </div>
  );
}

export default Pagos;
