import connectDb from '../connectDb';
import {
  getSingleService,
  updateService,
  deleteService,
} from './services.service';

export default async function handler(req, res) {
  connectDb();
  const { method } = req;

  switch (method) {
    case 'GET': {
      const { id } = req.query;
      try {
        const service = await getSingleService(id);
        if (!service) {
          return res.status(404).json({ message: 'Service not found' });
        }
        return res.json(Service);
      } catch (error) {
        return res.status(500).json({ error });
      }
    }

    case 'PATCH': {
      const serviceUpdate = req.body;
      const { id } = req.query;
      try {
        const service = await updateService(id, serviceUpdate);
        console.log('Service id:', id, 'Data updated:', serviceUpdate);
        return res.status(200).json({ message: 'Service updated', service });
      } catch (error) {
        console.error(`[ERROR]: ${error}`);
        return res
          .status(500)
          .json({ message: 'Error updating Service', error });
      }
    }

    case 'DELETE': {
      const { id } = req.query;
      try {
        await deleteService(id);
        console.log(`Service ${id} eliminated`);
        return res.status(200).json({ message: 'Service eliminated' });
      } catch (error) {
        console.error(`[ERROR]: ${error}`);
        return res.status(500).json({ error });
      }
    }
  }
}
