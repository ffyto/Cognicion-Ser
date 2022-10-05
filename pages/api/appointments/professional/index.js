import connectDb from '../../connectDb';
import { getAllProfessionalAppointments } from '../appointments.service';
import { isAuthenticated } from '../../auth/auth.service';

export default async function getAllProfessionalAppointmentsHandler(req, res) {
  connectDb();
  await isAuthenticated(req, res);

  if (!req.user) {
    return res;
  }
  const { id } = req.user;
  try {
    const professionalAppointments = await getAllProfessionalAppointments(id);
    console.log('[SUCCESS]: Showing all Professional Appointments');
    return res.status(200).json(professionalAppointments);
  } catch (error) {
    console.error(`[ERROR]: ${error}`);
    return res.status(501).json({ error });
  }
}
