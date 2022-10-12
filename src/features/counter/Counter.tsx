import React, { useState } from 'react';
import { useAppDispatch } from '../../app/hooks';
import { increment, decrement } from '../../features/counter/counterSlice'
export function Counter() {
  // const count = useAppSelector();
  const dispatch = useAppDispatch();

  return (
    <div>
      <button onClick={() => dispatch(increment())}>+</button>
      <button onClick={() => dispatch(decrement())}>-</button>
    </div>
  );
}
