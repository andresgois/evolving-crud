module.exports = function ErrorTeste(error, req, res, next) {
        if (error instanceof Error) {
            return res.status(404).json({
                status: 'error',
                message: `${error.message}`,
            })
        }

        return res.status(500).json({
            status: 'error',
            message: `Internal server error - ${error.message}`,
        })
        next();
    }