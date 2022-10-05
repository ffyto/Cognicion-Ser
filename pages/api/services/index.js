import connectDb from '../connectDb';
import { createService, getAllServices } from './services.service';
import { isAuthenticated } from '../auth/auth.service';

export default async function handler(req, res) {
  connectDb();
  const { method } = req;

  await isAuthenticated(req, res);

  if (!req.user) {
    return res;
  }

  if (req.user.rol === 'professional') {
    switch (method) {
      case 'GET': {
        try {
          console.log('[SUCCESS]: Showing all Services');
          const Services = await getAllServices();
          return res.status(200).json(Services);
        } catch (error) {
          console.error(`[ERROR]: ${error}`);
          return res.status(500).json({ error });
        }
      }

      case 'POST': {
        const serviceData = req.body;
        try {
          const service = await createService(serviceData);
          console.log('[SUCCESS]: Service created successfully', service);
          return res.status(201).json({
            service,
            message: 'El servicio fue creado de forma satisfactoria',
          });
        } catch (error) {
          console.error(`[ERROR]: ${error}`);
          return res.status(500).json({
            error,
            message: 'Ha ocurrido un error al intentar crear el servicio',
          });
        }
      }
    }
  }
}
