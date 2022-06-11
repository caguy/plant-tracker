import mongoose from "mongoose";

export default async function paginate<T>(
  model: mongoose.Model<T>,
  { page = 1, perPage = 10 }: { page?: number; perPage?: number },
) {
  const items = await model.find({}, null, {
    skip: perPage * (page - 1),
    limit: perPage,
  });
  const total = await model.estimatedDocumentCount();
  return {
    items,
    perPage,
    page,
    total,
    totalPages: Math.ceil(total / perPage),
  };
}
