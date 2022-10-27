import connectDb from '../connectDb';
import { getSingleUser, updateUser, deleteUser } from './users.service';
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
        const user = await getSingleUser(id);
        if (!user) {
          console.log(`[WARNING]: User not found`);
          return res.status(404).json({ message: 'Usuario no encontrado' });
        }
        console.log(`[SUCCESS]: Showing User ${user}`);
        return res.json(user);
      } catch (error) {
        console.error(`[ERROR]: ${error}`);
        return res.status(500).json({ error });
      }
    }

    case 'PATCH': {
      const userUpdate = req.body;
      const { id } = req.user;
      try {
        const user = await updateUser(id, userUpdate);
        console.log(
          '[SUCCESS]: User updated. id:',
          id,
          'Data updated:',
          userUpdate
        );
        return res
          .status(200)
          .json({ message: 'Usuario actualizado', profile: user.profile });
      } catch (error) {
        console.error(`[ERROR]: ${error}`);
        return res
          .status(500)
          .json({ message: 'Error al intentar actualizar el usuario', error });
      }
    }

    case 'DELETE': {
      const { id } = req.user;
      try {
        await deleteUser(id);
        console.log(`[SUCCESS]: User ${id} eliminated`);
        return res.status(200).json({ message: 'Usuario eliminado' });
      } catch (error) {
        console.error(`[ERROR]: ${error}`);
        return res.status(500).json({ error });
      }
    }
    default:
      return null;
  }
}
