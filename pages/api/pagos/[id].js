import mercadopago from 'mercadopago';
import connectDb from '../connectDb';
import { getSingleAppointment } from '../appointments/appointments.service';
import { isAuthenticated } from '../auth/auth.service';

export default async function pagos(req, res) {
  connectDb();
  const { method } = req;
  const { id } = req.query;
  const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

  if (method === 'POST') {
    await isAuthenticated(req, res);

    if (!req.user) {
      return res;
    }

    const user = req.user;

    const appointment = await getSingleAppointment(id);

    mercadopago.configure({
      access_token: `${process.env.NEXT_PROD_ACCESS_TOKEN}`,
    });

    let preference = {
      items: [
        {
          id: appointment.id,
          title: appointment.title,
          unit_price: appointment.price,
          quantity: 1,
        },
      ],
      back_urls: {
        success: `${BASE_URL}/userhome/${user.name}-${user.lastName}`,
        failure: `${BASE_URL}/userhome/${user.name}-${user.lastName}`,
        pending: `${BASE_URL}/userhome/${user.name}-${user.lastName}`,
      },
      auto_return: 'approved',
      /*      notification_url: `${BASE_URL}/api/pagos`, */
      date_of_expiration: '2022-10-30T23:59:59.000-04:00',
    };

    mercadopago.preferences
      .create(preference)
      .then(function (response) {
        global.id = response.body.id;
        return res.status(200).json({
          id: response.body.id,
          data: preference,
          message: 'Puede proceder con el pago',
        });
      })
      .catch(function (error) {
        console.log(error);
        return res.status(500).json({ error });
      });
  }
}

export const config = {
  api: {
    externalResolver: true,
  },
};
