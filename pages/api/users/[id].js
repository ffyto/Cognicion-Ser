import connectDb from '../connectDb';
import { getSingleUser, updateUser, deleteUser } from './users.service';

export default async function handler(req, res) {
  await connectDb();
  const { method } = req;

  switch (method) {
    case 'GET': {
      const { id } = req.params;
      try {
        const user = await getSingleUser(id);
        if (!user) {
          return res.status(404).json({ message: 'User not found' });
        }
        return res.json(user);
      } catch (error) {
        return res.status(500).json({ error });
      }
    }

    case 'POST': {
      const userUpdate = req.body;
      const { id } = req.user;
      try {
        const user = await updateUser(id, userUpdate);
        console.log('User id:', id, 'Data updated:', userUpdate);
        return res
          .status(200)
          .json({ message: 'User updated', profile: user.profile });
      } catch (error) {
        console.error(`[ERROR]: ${error}`);
        return res.status(500).json({ message: 'Error updating user', error });
      }
    }

    case 'DELETE': {
      const { id } = req.user;
      try {
        await deleteUser(id);
        console.log(`User ${id} eliminated`);
        return res.status(200).json({ message: 'User eliminated' });
      } catch (error) {
        console.error(`[ERROR]: ${error}`);
        return res.status(500).json({ error });
      }
    }
  }
}
