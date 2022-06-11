import S, { ExtendedSchema, ObjectSchema } from "fluent-json-schema";

export const paginatedSchema = S.object()
  .prop("total", S.number())
  .prop("page", S.number())
  .prop("totalPages", S.number())
  .prop("perPage", S.number());

export const paginateSchema = (schema: ObjectSchema | ExtendedSchema) =>
  paginatedSchema.extend(S.object().prop("items", S.array().items(schema)));

export const metaSchema = S.object()
  .prop("_id", S.string().required())
  .prop("updatedAt", S.string().required())
  .prop("createdAt", S.string().required());

export const addMeta = (schema: ObjectSchema | ExtendedSchema) =>
  metaSchema.extend(schema);
