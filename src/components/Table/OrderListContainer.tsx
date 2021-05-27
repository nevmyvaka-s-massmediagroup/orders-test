import React, { useCallback, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import {
  fetchOrdersAsync,
  isOrderLoading,
  orders as ordersSelector,
  selectPage,
  setPage,
} from "../../app/orders/slice";
import EnhancedTable from "./OrderTable";

export const OrderListContainer = () => {
  const page = useAppSelector(selectPage);
  const orders = useAppSelector(ordersSelector)
  const isLoading = useAppSelector(isOrderLoading);
  const dispatch = useAppDispatch();
  
  const handleSetPage = useCallback((page) =>{
    dispatch(setPage(page))
  },[dispatch])

  useEffect(() => {
    dispatch(fetchOrdersAsync());
  }, []);

  return <div>{isLoading && !orders? "loading..." : <EnhancedTable orders={orders} page={page} setPage={handleSetPage} />}</div>;
};
