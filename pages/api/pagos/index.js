import connectDb from '../connectDb';
import { updateAppointment } from '../appointments/appointments.service';

export default async function handler(req, res) {
  connectDb();
  const { method, body, query } = req;
  console.log(
    '🚀 ~ file: index.js ~ line 6 ~ handler ~ body, query',
    body,
    query
  );

  if (method === 'POST') {
    try {
      console.log('Showing all Appointments');
      const appointments = await updateAppointment();
      return res.status(200).json(appointments);
    } catch (error) {
      console.error(`[ERROR]: ${error}`);
      return res.status(500).json({ error });
    }
  } else {
    return null;
  }
}
