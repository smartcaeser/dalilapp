module.exports.createSuccessResponse = function (res, data) {
    res.status(200).json({
        status: 200,
        data: data
    })
}

module.exports.createNotFoundResponse = function (res) {
    res.status(202).json({
        status: 202
    })
}

module.exports.createCreatedResponse = function (res, data) {
    res.status(201).json({
        status: 201,
        data: data
    })
}

module.exports.createBadRequestResponse = function (res, errors) {
    res.status(400).json({
        status: 400,
        errors: errors
    })
}

module.exports.createInternalErrorResponse = function (res, message) {
    res.status(500).json({
        status: 500,
        message: message && message.message ? message.message : "check server logs"
    })
}