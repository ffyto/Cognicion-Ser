import { Schema, model, models } from 'mongoose';

const ServiceSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    modality: {
      type: String,
      required: true,
      unique: true,
    },
    price: {
      type: Number,
      required: true,
    },
    includedServices: [
      {
        name: {
          type: String,
        },
        description: {
          type: Array,
        },
        sessions: {
          type: Number,
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

export default models.Service || model('Service', ServiceSchema);
