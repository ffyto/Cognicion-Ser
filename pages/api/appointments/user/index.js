import connectDb from '../../connectDb';
import { getAllUserAppointments } from '../appointments.service';
import { isAuthenticated } from '../../auth/auth.service';

export default async function getAllUserAppointmentsHandler(req, res) {
  connectDb();
  await isAuthenticated(req, res);

  if (!req.user) {
    return res;
  }
  const { id } = req.user;
  try {
    const userAppointments = await getAllUserAppointments(id);
    console.log('Showing all User boards');
    return res.status(200).json(userAppointments);
  } catch (error) {
    console.error(`[ERROR]: ${error}`);
    return res.status(501).json({ error });
  }
}
