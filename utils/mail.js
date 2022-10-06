import sendgrid from '@sendgrid/mail';

export async function sendMail(data) {
  sendgrid.setApiKey(process.env.SENDGRID_API_KEY);

  return sendgrid.send(data);
}
