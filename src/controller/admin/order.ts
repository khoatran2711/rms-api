import express from "express";
import { badRequest, success } from "../../helpers/res.helper";
import { addOrder, getOrderByID, getOrderWithQuery, updateOrderByID } from "../../models/order";
export const newOrder = async (req: express.Request, res: express.Response) => {
  try {
    const {
      rooms,
      services,
      userID,
      customerName,
      identityNumber,
      phoneNumber,
      members,
      checkInDate,
      checkOutDate,
      orderType,
      totalAmount,
      status,
    } = req.body;
    const user = (req as any).user;
    const { _id } = user._doc;
    const orderData = {
      rooms,
      services,
      userID: _id,
      customerName,
      identityNumber,
      phoneNumber,
      members,
      checkInDate,
      checkOutDate,
      orderType,
      totalAmount,
      status,
    };
    const addNewQuery = await addOrder(orderData);
    return success("", res);
  } catch (error) {
    return badRequest("Internal server!", res, 500);
  }
};
export const AllOrders = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const page = req.query.page || 1;
    const limit = req.query.limit || 6;
    const { start, end, status, orderType } = req.query;
    const searchData = <any>{};
    if (start && end) {
      searchData["created_at"] = { $gte: start, $lte: end };
    }
    if (status) {
      searchData["status"] = status;
    }
    if (orderType) {
      searchData["orderType"] = orderType;
    }
    const queryData = {
      data: searchData || null,
      option: {
        page: page,
        limit: limit,
        sort: { field: "desc", created_at: -1 },
      },
    };
    const user = (req as any).user;
    const { _id, userName  } = user._doc;
    if(userName != "admin"){
      searchData["userID"] = _id;
    }
    const orderData = await getOrderWithQuery(queryData);

    const { docs, ...pageData } = orderData;

    let data = <any>{};
    data["data"] = docs;
    data["pageData"] = pageData;

    success(data, res);
  } catch (error) {
    return badRequest("Internal server !", res, 500);
  }
};

export const updateStatusOrder = async (req: express.Request, res: express.Response) => {

    try {
        const { status, id } = req.body;
        const existingOrder = await getOrderWithQuery({data: {_id: id}});
        if(!existingOrder){
            return badRequest("Order not found !", res, 404);
        }
        if(status === "Waiting" || status === "CheckOuted" || status === "Canceled" || status === "Payment"){
            const data = {
                status
                }
                const updateOrder = await updateOrderByID(id, data);
                return success("", res);
        }
        return badRequest("Status not found !", res, 500);
       
    } catch (error) {
        return badRequest("Internal server !", res, 500);
    }

}
export const getOrder = async (req: express.Request, res: express.Response) => {
    try {
        const { id } = req.query;
        const order = await getOrderByID(id as string);
        if(!order){
            return badRequest("Order not found !", res, 404);
        }
        return success([order], res);
    } catch (error) {
        return badRequest("Internal server !", res, 500);
    }
}