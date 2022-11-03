import { ErrorRequestHandler } from 'express';

const handleError:ErrorRequestHandler  = (err,req,res,next) => {
    console.log(err);
    res.status(500).json({
        message: 'server error'
    });
};

export default handleError;
