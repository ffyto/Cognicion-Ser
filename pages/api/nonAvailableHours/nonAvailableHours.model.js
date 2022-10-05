import { Schema, model, models } from 'mongoose';

const NonAvailableHoursSchema = new Schema(
  {
    day: {
      type: String,
      required: true,
    },
    hour: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export default models.NonAvailableHour ||
  model('NonAvailableHour', NonAvailableHoursSchema);
