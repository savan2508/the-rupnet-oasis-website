"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { differenceInDays } from "date-fns";

const ReservationContext = createContext();

const initialState = { from: undefined, to: undefined };

function ReservationProvider({ children }) {
  const [range, setRange] = useState(initialState);
  const [numNights, setNumNights] = useState(0);
  const [startDate, setStartDate] = useState(undefined);
  const [endDate, setEndDate] = useState(undefined);
  const resetRange = () => setRange(initialState);

  const [submitButtonDisabled, setSubmitButtonDisabled] = useState(
    !(!!startDate && !!endDate),
  );

  useEffect(() => {
    setStartDate(range?.from);
    setEndDate(range?.to);
  }, [range]);

  useEffect(() => {
    setNumNights(differenceInDays(endDate, startDate));
  }, [endDate, startDate]);

  useEffect(() => {
    setSubmitButtonDisabled(!(!!startDate && !!endDate));
  }, [range, startDate, endDate]);

  const value = {
    range,
    setRange,
    resetRange,
    numNights,
    submitButtonDisabled,
    startDate,
    endDate,
  };

  return (
    <ReservationContext.Provider value={value}>
      {children}
    </ReservationContext.Provider>
  );
}

function useReservation() {
  const context = useContext(ReservationContext);
  if (context === undefined)
    throw new Error("Context was used outside provider");
  return context;
}

export { ReservationProvider, useReservation };
