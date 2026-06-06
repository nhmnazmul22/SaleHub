export const userMinifiedProjectPipeline = [
    {
        $project: {
            _id: 1,
            firstName: 1,
            lastName: 1,
            email: 1,
            role: 1
        }
    }
]