import express from 'express';
import admin_route from './admin_route';
// import common_route from './common_route';
const router = express.Router();

export default (): express.Router => {
    admin_route(router)
    //common_route(router)
    return router
}