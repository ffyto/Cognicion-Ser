import sendgrid from '@sendgrid/mail';

export function sendMail(data) {
  sendgrid.setApiKey(process.env.SENDGRID_API_KEY);

  return sendgrid.send(data);
}
