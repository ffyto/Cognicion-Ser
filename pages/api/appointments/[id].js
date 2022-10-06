import connectDb from '../connectDb';
import { isAuthenticated } from '../auth/auth.service';
import { deleteNonAvailableHour } from '../nonAvailableHours/nonAvailableHours.service';
import {
  getSingleAppointment,
  updateAppointment,
  deleteAppointment,
  findByPaymentIdAndupdateAppointment,
} from './appointments.service';
import { removeAppointmentToUser } from '../users/users.service';
import { sendMail } from '../../../utils/mail';

export default async function handler(req, res) {
  connectDb();
  const { method } = req;
  await isAuthenticated(req, res);

  if (!req.user) {
    return res;
  }

  switch (method) {
    case 'GET': {
      const { id } = req.query;
      try {
        const appointment = await getSingleAppointment(id);
        if (!appointment) {
          console.log(`[WARNING]: Appointment not found`);
          return res
            .status(404)
            .json({ message: 'La cita solicitada no fue encontrada' });
        }
        return res.json(appointment);
      } catch (error) {
        console.error(`[ERROR]: ${error}`);
        return res.status(500).json({ error });
      }
    }

    case 'PATCH': {
      const appointmentUpdate = req.body;
      const { id } = req.query;
      try {
        const appointment = await updateAppointment(id, appointmentUpdate);
        console.log(
          '[SUCCESS]: Appointment id:',
          id,
          'Data updated:',
          appointmentUpdate
        );
        return res
          .status(200)
          .json({ message: 'La cita fue actualizada', appointment });
      } catch (error) {
        console.error(`[ERROR]: ${error}`);
        return res
          .status(500)
          .json({ message: 'Error al intentar actualizar la cita:', error });
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
          '[SUCCESS]: Appointment id:',
          appointment.id,
          'Payment id:',
          id,
          'Data updated:',
          appointmentUpdate
        );
        return res
          .status(200)
          .json({ message: 'La cita fue actualizada', appointment });
      } catch (error) {
        console.error(`[ERROR]: ${error}`);
        return res
          .status(500)
          .json({ message: 'Error al intentar actualizar la cita:', error });
      }
    }

    case 'DELETE': {
      const { id } = req.query;

      try {
        const appointment = await getSingleAppointment(id);
        if (!appointment) {
          console.log('[WARNING]: Appointment not found');
          return res.status(404).json({
            status: 404,
            message: 'La cita solicitada no fue encontrada',
          });
        }

        const { user, nonAvailableHour } = appointment;

        const message = {
          from: 'Cognición & Ser <cognicionyser@gmail.com>',
          to: user.email,
          subject: 'Bienvenido a Cognición & Ser!',
          preheader: 'Active su cuenta ahora.',
          template_id: 'd-314bf86f096a489187d5c2dc6f8dbb55',
          dynamic_template_data: {
            name: user.name,
            lastName: user.lastName,
            appointmentTitle: appointment.title,
            appointmentDate: appointment.date.appointmentDay,
          },
        };

        await sendMail(message);
        await deleteNonAvailableHour(nonAvailableHour);

        await removeAppointmentToUser(user.id, id);
        await deleteAppointment(id);
        console.log(`[SUCCESS]: Appointment ${id} eliminated`);
        return res.status(200).json({
          status: 200,
          message: 'La cita fue cancelada satisfactoriamente',
        });
      } catch (error) {
        console.error(`[ERROR]: ${error}`);
        return res.status(500).json({
          status: 500,
          error,
          message: 'Ha ocurrido un error al intentar cancelar la cita',
        });
      }
    }
  }
}
