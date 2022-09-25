import connectDb from '../connectDb';
import { createAppointment, getAllAppointments } from './appointments.service';
import { addAppointmentToUser, findUserByEmail } from '../users/users.service';
import { isAuthenticated } from '../auth/auth.service';

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
      await isAuthenticated(req, res);

      if (!req.user) {
        return res;
      }

      const { id } = req.user;

      let appointmentData = req.body;
      appointmentData = { ...appointmentData, user: id };

      try {
        const appointment = await createAppointment(appointmentData);
        await addAppointmentToUser(id, appointment.id);
        console.log('Appointment created successfully', appointment);
        return res.status(201).json({
          data: appointment,
          message: 'Su cita fue separada de forma satisfactoria',
        });
      } catch (error) {
        console.error(`[ERROR]: ${error}`);
        return res.status(500).json({ error });
      }
    }
  }
}
