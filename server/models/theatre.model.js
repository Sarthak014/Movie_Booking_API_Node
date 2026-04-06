import mongoose from "mongoose";

const theatreSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    description: {
      type: String,
      trim: true,
    },

    address: {
      street: String,
      city: {
        type: String,
        trim: true,
        required: true,
      },
      state: String,
      country: {
        type: String,
        trim: true,
        default: 'India',
      },
      pincode: String,
    },

    location: {
      type: {
        type: String,
        enum: ['Point'],
        default: 'Point',
      },
      coordinates: {
        type: [Number], // [longitude, latitude]
      },
    },

    // screens: [
    //   {
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: 'Screen',
    //   },
    // ],

    // amenities: [
    //   {
    //     type: String,
    //     enum: ['parking', 'food_court', 'wheelchair_access', 'dolby', 'imax'],
    //   },
    // ],

    contactDetails: {
      phone: String,
      email: String,
    },

    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

// update mongoose toJSON transform to hide version key and map _id to id
theatreSchema.set('toJSON', {
  versionKey: false,
  virtuals: true,
  transform: (doc, ret) => {
    ret.id = ret._id;
    delete ret._id;
  }
});

const THEATRE = mongoose.model('THEATRE', theatreSchema);

export default THEATRE;
