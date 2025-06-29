const routeNotFound = (req,res,next)=>{
    const error = new Error(`Route not Found ${req.OriginUrl}`);
    res.status(404);
    next(error)
}


const errorHandler = (err, req, res , next )=>{
    let statusCode = res.statusCode===200?500 : res.statusCode;
    let message = err.message;
    if(err.name === "CastError" && err.kind === "ObjectId"){
        statusCode = 404;
        message = "Resource Not Found"
    }

    res.status(statusCode).json({
        message: message,
        stack: process.env.NODE_ENV !== "Production" ? null : err.stack,
    })

}

export {routeNotFound , errorHandler}