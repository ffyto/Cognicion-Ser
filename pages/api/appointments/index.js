import connectDb from '../connectDb';
import { createAppointment, getAllAppointments } from './appointments.service';
import { addAppointmentToUser, findUserByEmail } from '../users/users.service';
import { verifyToken } from '../auth/auth.service';

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
      const auth = req.headers?.authorization;

      if (!auth) {
        console.log('User Unauthorized');
        return res.status(401).json({ message: 'Unauthorized' });
      }
      const token = auth.split(' ')[1];
      const decoded = verifyToken(token);

      if (!decoded) {
        return res.status(401).json({ message: 'unAuthorized' });
      }
      const { email } = decoded;
      const user = await findUserByEmail(email);

      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }

      console.log(`${user} authenticated`);

      let appointmentData = req.body;
      appointmentData = { ...appointmentData, user: user.id };

      try {
        const appointment = await createAppointment(appointmentData);
        await addAppointmentToUser(user.id, appointment.id);
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
