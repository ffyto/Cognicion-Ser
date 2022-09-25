export default function handler(req, res) {
  const { method } = req;

  if (method === 'POST') {
    console.log(req.body);
    res.status(200).send('Pago recibido');
  }
}
