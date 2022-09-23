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
      type: { name: String, lastName: String, birthday: Date },
      required: true,
    },
    professional: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
    date: {
      type: Date,
    },
    services: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Service',
      },
    ],
  },
  {
    timestamps: true,
  }
);

export default models.Appointment || model('Appointment', AppointmentSchema);
