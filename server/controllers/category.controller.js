const ParentCategory = require("../models/parent_category.model")

const getGroupedCategories = async (req, res) => {
    try {
        let data = await ParentCategory.aggregate([
            {
                $lookup: {
                    from: 'categories',
                    localField: '_id',
                    foreignField: 'parent_category',
                    as: 'sub_categories',
                    pipeline: [{
                        $limit: 3
                    }]
                },
            },
            {
                $project: {
                    title: 1,
                    sub_categories: {
                        _id: 1,
                        title: 1,
                        students: 1
                    }
                }
            }
        ])
        res.send(data)
    }
    catch (err) {
        res.status(500).send({
            status: 'failed',
            reason: err.toString()
        })
    }
}

module.exports = { getGroupedCategories }