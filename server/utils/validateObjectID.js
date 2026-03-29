// Validate ObjectId
export const validateObjectID = (id) => mongoose.Types.ObjectId.isValid(id);
