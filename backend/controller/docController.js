const { multiDocUpload } = require("../utils/upload")
const multiDocs = require("./../models/Doc")
exports.addDocController = async (req, res) => {

    try {
        multiDocUpload(req, res, async (err) => {
            if (err) {
                return res.status(400).json({
                    success: false,
                    message: "multer err" + err
                })
            }
            if (req.files.dob) {
                req.body.userDob = `dob/${req.files.dob[0].filename}`
            }
            if (req.files.adhar) {
                req.body.userAdhar = `adhar/${req.files.adhar[0].filename}`
            }
            if (req.files.tc) {
                req.body.userTc = `tc/${req.files.tc[0].filename}`
            }
            const result = await multiDocs.create(req.body)
            // const a = req.files.adhar[0].filename
            // console.log(req.files.tc[0].filename);
            // console.log(req.files);
            res.json({
                success: true,
                message: "doc uploaded successfully"
            })
        })
    } catch (error) {
        res.status(400).json({
            success: true,
            message: "error" + error
        })
    }
}

exports.getAlldocsController = async (req, res) => {
    try {
        const result = await multiDocs.find()
        res.json({
            success: true,
            message: "doc fetched successfully",
            result
        })
    } catch (error) {
        res.status(400).json({
            success: false,
            message: "error" + error
        })
    }
}
exports.deleteAlldocsController = async (req, res) => {
    try {
        const result = await multiDocs.deleteMany()
        res.json({
            success: true,
            message: "doc deleted successfully",
        })
    } catch (error) {
        res.status(400).json({
            success: false,
            message: "error" + error
        })
    }
}