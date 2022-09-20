const mongoose = require('mongoose');

const AppointmentSchema = new mongoose.Schema(
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
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    pacient: {
      type: { name: String, lastName: String, birthday: Date },
      required: true,
    },
    professional: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    date: {
      type: Date,
    },
  },
  {
    timestamps: true,
  }
);

const Appointment = mongoose.model('Appointment', AppointmentSchema);

module.exports = Appointment;
