import connectDb from '../connectDb';
import { createService, getAllServices } from './services.service';

export default async function handler(req, res) {
  connectDb();
  const { method } = req;

  switch (method) {
    case 'GET': {
      try {
        console.log('Showing all Services');
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
        console.log('Service created successfully', service);
        return res.status(201).json(service);
      } catch (error) {
        console.error(`[ERROR]: ${error}`);
        return res.status(500).json({ error });
      }
    }
  }
}
