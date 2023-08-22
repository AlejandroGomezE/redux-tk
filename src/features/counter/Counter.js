import { useSelector, useDispatch } from 'react-redux';
import { increment, decrement, reset, incrementByAmount } from './counterSlice';
import { useState } from 'react';

const Counter = () => {
  const count = useSelector((state) => state.counter.count);
  const dispatch = useDispatch();

  const [amount, setAmount] = useState(0);

  return (
    <>
      {count}
      <div>
        <button
          onClick={() => {
            dispatch(increment());
          }}
        >
          +
        </button>
        <button
          onClick={() => {
            dispatch(decrement());
          }}
        >
          -
        </button>
      </div>
      <button
        onClick={() => {
          setAmount(0);
          dispatch(reset());
        }}
      >
        Reset
      </button>
      <div>
        <input type="number" value={amount} onChange={(e) => setAmount(Number(e.target.value))} />
        <button
          onClick={() => {
            dispatch(incrementByAmount(amount));
          }}
        >
          Increment by Amount
        </button>
      </div>
    </>
  );
};

export default Counter;
