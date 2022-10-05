import { Schema, model, models } from 'mongoose';

const AppointmentSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      minLength: 3,
      maxLength: 30,
    },
    image: {
      type: String,
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    pacient: {
      name: { type: String },
      lastName: { type: String },
      age: { type: String },
    },
    professional: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      default: '63320c6674834705d22f939a',
    },
    date: {
      appointmentDay: { type: String, required: true },
      appointmentHour: { type: String, required: true },
    },
    service: {
      type: Schema.Types.ObjectId,
      ref: 'Service',
    },
    paymentId: { type: String },
    payment: {
      type: String,
      default: 'Pendiente',
    },
  },
  {
    timestamps: true,
  }
);

export default models.Appointment || model('Appointment', AppointmentSchema);
