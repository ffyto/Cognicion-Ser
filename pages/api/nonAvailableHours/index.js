import connectDb from '../connectDb';
import {
  createNonAvailableHour,
  getAllNonAvailableHours,
} from './nonAvailableHours.service';

export default async function handler(req, res) {
  connectDb();
  const { method } = req;

  switch (method) {
    case 'GET': {
      try {
        console.log('Showing all nonAvailableHours');
        const nonAvailableHours = await getAllNonAvailableHours();
        return res.status(200).json(nonAvailableHours);
      } catch (error) {
        console.error(`[ERROR]: ${error}`);
        return res.status(500).json({ error });
      }
    }

    case 'POST': {
      const nonAvailableHourData = req.body;
      try {
        const nonAvailableHour = await createNonAvailableHour(
          nonAvailableHourData
        );
        console.log('nonAvailableHour created successfully', nonAvailableHour);
        return res.status(201).json(nonAvailableHour);
      } catch (error) {
        console.error(`[ERROR]: ${error}`);
        return res.status(500).json({ error });
      }
    }
  }
}
