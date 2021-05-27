import React, { useCallback, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import {
  fetchOrdersAsync,
  isOrderLoading,
  orders as ordersSelector,
  selectPage,
  setPage,
} from "../../store/orders";
import EnhancedTable from "./OrderTable";

const OrderTableContainer = () => {
  const page = useAppSelector(selectPage);
  const orders = useAppSelector(ordersSelector)
  const isLoading = useAppSelector(isOrderLoading);
  const dispatch = useAppDispatch();
  
  const handleSetPage = useCallback((page) =>{
    dispatch(setPage(page))
  },[dispatch])

  useEffect(() => {
    dispatch(fetchOrdersAsync());
  }, [dispatch]);

  return <div>{isLoading && !orders? "loading..." : <EnhancedTable orders={orders} page={page} setPage={handleSetPage} />}</div>;
};

export default OrderTableContainer
