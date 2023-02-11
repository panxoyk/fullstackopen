const errorHandler = (error, request, response, next) => {
    console.log(error.message)

    if (error.name === 'ValidationError') {
        return response.status(400).json({ error: error.message })
    } else if (error.name === 'JsonWebTokenError') {
        return response.status(401).json({ error: 'invalid token' })
    }

    next(error)
}

const tokenExtractor = async (request, response, next) => {
    const authorization = request.get("authorization")

    if ( authorization && authorization.toLowerCase().startsWith("bearer ") ) {
        request.token = authorization.substring(7)
    } else {
        request.token = null
    }

    next()
}

module.exports = { errorHandler, tokenExtractor }