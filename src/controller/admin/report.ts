import express from "express";
import { success, badRequest } from "../../helpers/res.helper";
import { countOrdersByDay, listOrders } from "../../models/order";
import moment from "moment";

export const getOverviewData = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const today = moment().startOf("day").unix();
    const orderList = await listOrders({});
    const totalOrder = orderList.filter(
      (order: any) => order.status !== "Canceled"
    ).length;
    const todayOrder = orderList.filter(
      (order: any) => order.status !== "Canceled" && order.created_at >= today
    ).length;
    const totalRevenue = orderList.reduce(
      (acc: any, order: any) =>
        order.status !== "Canceled" ? acc + order.totalAmount : acc,
      0
    );
    const todayRevenue = orderList.reduce(
      (acc: any, order: any) =>
        order.status !== "Canceled" && order.created_at >= today
          ? acc + order.totalAmount
          : acc,
      0
    );
    const testData = [
      {
        id: "1",
        type: "primary",
        icon: "briefcase-alt",
        total: totalRevenue,
        suffix: "+",
        prefix: "$",
        label: "Total Revenue",
        growth: "downward",
        trend: "feather-arrow-down",
        statusColor: "danger ",
        statusRate: "15.65",
        dataPeriod: "Since Last Month",
        decimal: 0,
        totalSales: "true",
      },
      {
        id: "2",
        type: "secondary",
        icon: "shopping-cart",
        total: totalOrder,
        suffix: "",
        prefix: "",
        label: "Total Orders",
        growth: "upward",
        trend: "feather-arrow-up",
        statusColor: "success",
        statusRate: "25.36",
        dataPeriod: "Since Last Month",
        decimal: 0,
        totalSales: "true",
      },
      {
        id: "3",
        type: "warning",
        icon: "usd-circle",
        total: todayRevenue,
        suffix: "",
        prefix: "$",
        label: "Today Revenue",
        growth: "downward",
        trend: "feather-arrow-down",
        statusColor: "danger ",
        statusRate: "12.25",
        dataPeriod: "Since Last Month",
        decimal: 0,
        totalSales: "true",
      },
      {
        id: "4",
        type: "info",
        icon: "calendar-alt",
        total: todayOrder,
        suffix: "+",
        prefix: "",
        label: "Today Orders",
        growth: "upward",
        trend: "feather-arrow-up",
        statusColor: "success",
        statusRate: "33.24",
        dataPeriod: "Since Last Month",
        decimal: 0,
        totalSales: "true",
      },
    ];
    const data = {
      totalOrder,
      todayOrder,
      totalRevenue,
      todayRevenue,
    };
    return success(testData, res);
  } catch (error) {
    return badRequest("Internal server !", res, 500);
  }
};

export const getSalesReport = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const {start,end,type} = req.query
    if(!start || !end) return badRequest("Missing required fields", res, 400);
    
    const orderByDay = await countOrdersByDay(Number(start), Number(end),type as string);
    const data = orderByDay
    return success(data, res);
  } catch (error) {
    return badRequest("Internal server !", res, 500);
  }
};
