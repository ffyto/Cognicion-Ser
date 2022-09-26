import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Mercadopago from '../../components/mercadopago';
import { createPayment } from '../../services/payments';

function Pagos() {
  const router = useRouter();
  const { id } = router.query;
  const [preferenceId, setPreferenceId] = useState('');

  useEffect(() => {
    const pago = async () => {
      let result = await createPayment(id);
      setPreferenceId(result.id);
    };
    if (id) {
      pago();
    }
  }, [id]);

  return (
    <div>
      {preferenceId ? <Mercadopago preferenceId={preferenceId} /> : null}
    </div>
  );
}

export default Pagos;
