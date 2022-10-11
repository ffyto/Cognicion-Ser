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
          type: String,
        },
        sessions: {
          type: String,
        },
        id: {
          type: String,
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

export default models.Service || model('Service', ServiceSchema);
