import connectDb from '../connectDb';
import {
  getSingleAppointment,
  updateAppointment,
  deleteAppointment,
  findByPaymentIdAndupdateAppointment,
} from './appointments.service';
import { removeAppointmentToUser } from '../users/users.service';

export default async function handler(req, res) {
  connectDb();
  const { method } = req;

  switch (method) {
    case 'GET': {
      const { id } = req.query;
      try {
        const appointment = await getSingleAppointment(id);
        if (!appointment) {
          return res.status(404).json({ message: 'Appointment not found' });
        }
        return res.json(appointment);
      } catch (error) {
        return res.status(500).json({ error });
      }
    }

    case 'PATCH': {
      const appointmentUpdate = req.body;
      const { id } = req.query;
      try {
        const appointment = await updateAppointment(id, appointmentUpdate);
        console.log('Appointment id:', id, 'Data updated:', appointmentUpdate);
        return res
          .status(200)
          .json({ message: 'Appointment updated', appointment });
      } catch (error) {
        console.error(`[ERROR]: ${error}`);
        return res
          .status(500)
          .json({ message: 'Error updating Appointment', error });
      }
    }

    case 'PUT': {
      const appointmentUpdate = req.body;
      const { id } = req.query;

      try {
        const appointment = await findByPaymentIdAndupdateAppointment(
          id,
          appointmentUpdate
        );
        console.log(
          'Appointment id:',
          appointment.id,
          'Payment id:',
          id,
          'Data updated:',
          appointmentUpdate
        );
        return res
          .status(200)
          .json({ message: 'Appointment updated', appointment });
      } catch (error) {
        console.error(`[ERROR]: ${error}`);
        return res
          .status(500)
          .json({ message: 'Error updating Appointment', error });
      }
    }

    case 'DELETE': {
      const { id } = req.query;
      const { user } = req;
      try {
        const appointment = await getSingleAppointment(id);
        if (!appointment) {
          console.log('Appointment not found');
          return res.status(404).json({ message: 'Appointment not found' });
        }
        await removeAppointmentToUser(user.id, id);
        await deleteAppointment(id);
        console.log(`Appointment ${id} eliminated`);
        return res.status(200).json({ message: 'Appointment eliminated' });
      } catch (error) {
        console.error(`[ERROR]: ${error}`);
        return res.status(500).json({ error });
      }
    }
  }
}
