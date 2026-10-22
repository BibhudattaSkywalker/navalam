/**
 * Mongoose plugin: serialises documents the way the clients expect
 * (string `id`, no `_id`, `__v` or password hashes).
 */
export function clientJson(schema) {
  schema.set("toJSON", {
    virtuals: true,
    versionKey: false,
    transform(_doc, ret) {
      ret.id = String(ret._id);
      delete ret._id;
      delete ret.passwordHash;
      return ret;
    },
  });
}
