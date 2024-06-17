import express from 'express';
import authentication from './admin/authentication';
const router = express.Router();

export default (): express.Router => {
    authentication(router);
    return router
}