import connectDb from '../connectDb';
import {
  getSingleService,
  updateService,
  deleteService,
} from './services.service';
import { isAuthenticated } from '../auth/auth.service';

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
        const service = await getSingleService(id);
        if (!service) {
          console.log(`[WARNING]: Service not found`);
          return res.status(404).json({ message: 'Servicio no encontrado' });
        }
        console.log(`[SUCCESS]: Showing service ${service}`);
        return res.json(service);
      } catch (error) {
        console.error(`[ERROR]: ${error}`);
        return res.status(500).json({ error });
      }
    }

    case 'PATCH': {
      const serviceUpdate = req.body;
      const { id } = req.query;
      try {
        const service = await updateService(id, serviceUpdate);
        console.log(
          '[SUCCESS]: Service updated. id:',
          id,
          'Data updated:',
          serviceUpdate
        );
        return res
          .status(200)
          .json({ message: 'Servicio actualizado:', service });
      } catch (error) {
        console.error(`[ERROR]: ${error}`);
        return res
          .status(500)
          .json({ message: 'Error al intentar actualizar el servicio', error });
      }
    }

    case 'DELETE': {
      const { id } = req.query;
      try {
        await deleteService(id);
        console.log(`[SUCCESS]: Service ${id} eliminated`);
        return res.status(200).json({ message: 'Servicio eliminado' });
      } catch (error) {
        console.error(`[ERROR]: ${error}`);
        return res.status(500).json({ error });
      }
    }
  }
}
