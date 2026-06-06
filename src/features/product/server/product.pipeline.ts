export const productPipeline = (query?: Record<string, unknown>) => {
  return [
    { $match: query || {} },
    {
      $lookup: {
        from: "categories",
        let: {
          categoryId: "$categoryId",
        },
        pipeline: [
          {
            $match: {
              $expr: {
                $and: [
                  { $eq: ["$_id", "$$categoryId"] },
                  { $eq: ["$isActive", true] },
                ],
              },
            },
          },
        ],
        as: "category",
      },
    },
    {
      $lookup: {
        from: "brands",
        let: {
          brandId: "$brandId",
        },
        pipeline: [
          {
            $match: {
              $expr: {
                $and: [
                  { $eq: ["$_id", "$$brandId"] },
                  { $eq: ["$isActive", true] },
                ],
              },
            },
          },
        ],
        as: "brand",
      },
    },
    {
      $lookup: {
        from: "units",
        let: {
          unitId: "$unitId",
        },
        pipeline: [
          {
            $match: {
              $expr: {
                $and: [
                  { $eq: ["$_id", "$$unitId"] },
                  { $eq: ["$isActive", true] },
                ],
              },
            },
          },
        ],
        as: "unit",
      },
    },
    {
      $lookup: {
        from: "users",
        localField: "createdBy",
        foreignField: "_id",
        as: "created",
      },
    },
    { $unwind: "$category" },
    { $unwind: "$brand" },
    { $unwind: "$unit" },
    { $unwind: "$created" },
    {
      $project: {
        categoryId: 0,
        brandId: 0,
        unitId: 0,
        deletedAt: 0,
        createdBy: 0,
        "category.deletedAt": 0,
        "category.createdAt": 0,
        "category.updatedAt": 0,
        "brand.deletedAt": 0,
        "brand.createdAt": 0,
        "brand.updatedAt": 0,
        "unit.deletedAt": 0,
        "unit.createdAt": 0,
        "unit.updatedAt": 0,
        "created.password": 0,
        "created.lastLogin": 0,
        "created.deletedAt": 0,
        "created.createdAt": 0,
        "created.updatedAt": 0,
      },
    },
  ];
};

export const productMinifiedProjectPipeline = [
  {
    $project: {
      _id: 1,
      name: 1,
      slug: 1,
      image: 1
    }
  }
]