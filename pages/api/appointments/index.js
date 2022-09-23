import connectDb from '../connectDb';
import { createAppointment, getAllAppointments } from './appointments.service';
import { addAppointmentToUser } from '../users/users.service';

export default async function handler(req, res) {
  connectDb();
  const { method } = req;

  switch (method) {
    case 'GET': {
      try {
        console.log('Showing all Appointments');
        const appointments = await getAllAppointments();
        return res.status(200).json(appointments);
      } catch (error) {
        console.error(`[ERROR]: ${error}`);
        return res.status(500).json({ error });
      }
    }

    case 'POST': {
      const appointmentData = req.body;
      const userId = req.query;
      try {
        const appointment = await createAppointment(appointmentData);
        await addAppointmentToUser(userId, appointment.id);
        console.log('Appointment created successfully', appointment);
        return res.status(201).json(appointment);
      } catch (error) {
        console.error(`[ERROR]: ${error}`);
        return res.status(500).json({ error });
      }
    }
  }
}
