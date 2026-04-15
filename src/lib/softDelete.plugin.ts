/* eslint-disable @typescript-eslint/no-explicit-any */
import { ObjectId, Query, type Schema } from "mongoose";

export function softDeletePlugin(schema: Schema) {
  schema.add({
    deletedAt: { type: Date, default: null },
  });

  // Fetch non softDeleted data
  schema.pre(/^find/, function (this: Query<any, any>) {
    if (!this.getOptions().includeDeleted) {
      this.where({ deletedAt: null });
    }
  });

  // Handle softDelete
  schema.pre(
    ["deleteOne", "findOneAndDelete"],
    { document: false, query: true },
    async function () {
      const filter = this.getFilter();
      await this.model.updateOne(
        { ...filter, deletedAt: null },
        { deletedAt: new Date() },
      );
      this.setQuery({ _id: null });
    },
  );

  // Handle Restore
  schema.statics.restore = function (id: ObjectId) {
    return this.updateOne({ _id: id }, { deletedAt: null });
  };

  // Force delete
  schema.statics.forceDelete = function (id: ObjectId) {
    return this.collection.deleteOne({ _id: id });
  };

  // Only deleted data
  schema.statics.onlyDeleted = function () {
    return this.find()
      .setOptions({ includeDeleted: true })
      .where({
        deletedAt: { $ne: null },
      });
  };

  // With deletedAt
  schema.statics.withDeleted = function () {
    return this.find().setOptions({ includeDeleted: true });
  };
}
