import { ChevronLeft, ChevronRight } from "lucide-react";
import { MouseEvent, useState } from "react";
import { useAppDispatch } from "../app/hooks";
import {
  decrement,
  increment,
  // reset,
  specific,
} from "../app/features/filterSlice";

interface PaginationProps {
  // Define your component props here
  total: number;
}

const Pagination = ({ total }: PaginationProps) => {
  const [prev, setPrev] = useState(0);
  const [current, setCurrent] = useState(1);
  const [next, setNext] = useState(2);

  const dispatch = useAppDispatch();

  const handleLeftClick = () => {
    if (current > 1) {
      setPrev((pre) => --pre);
      setCurrent((pre) => --pre);
      setNext((pre) => --pre);
      dispatch(decrement());
      const newSearchParams = new URLSearchParams(window.location.search);
      newSearchParams.set("page", String(prev));
      window.history.pushState(
        { page: prev },
        `Page ${prev}`,
        `?${newSearchParams.toString()}`
      );
    } else if (current === 1) {
      setPrev(0);
    }
  };
  const handleRightClick = () => {
    if (current < total) {
      setPrev((pre) => ++pre);
      setCurrent((pre) => ++pre);
      setNext((pre) => ++pre);
      dispatch(increment());
      const newSearchParams = new URLSearchParams(window.location.search);
      newSearchParams.set("page", String(next));
      window.history.pushState(
        { page: next },
        `Page ${next}`,
        `?${newSearchParams.toString()}`
      );
    } else if (current === total) {
      setNext(total + 1);
    }
  };

  const handleClick = (e: MouseEvent<HTMLLIElement>) => {
    const value = Number(e.currentTarget.value);

    if (isNaN(value)) {
      return;
    }
    dispatch(specific(value));
    setPrev(value - 1);
    setCurrent(value);
    setNext(value + 1);
    const newSearchParams = new URLSearchParams(window.location.search);
    newSearchParams.set("page", String(value));
    window.history.pushState(
      { page: value },
      `Page ${value}`,
      `?${newSearchParams.toString()}`
    );
  };

  // const onReset = () => {
  //     setPrev(0);
  //     setCurrent(1);
  //     setNext(2);
  //     dispatch(reset())
  //     window.history.pushState({ page: 1 }, `Page ${1}`, `?page=${1}`);
  // }
  return (
    <div className="w-full flex items-center justify-end pr-6 pt-10">
      <div className="flex justify-center items center gap-x-4">
        <button
          type="button"
          className="px-2.5 py-2 flex justify-center items-center rounded-full text-text-heading hover:text-text bg-secondary-background border border-primary-background cursor-pointer hover:border-text-heading disabled:text-text-heading disabled:border-primary-background disabled:cursor-not-allowed"
          onClick={handleLeftClick}
          disabled={prev === 0}
        >
          <ChevronLeft className="h-5 w-5  transition-all duration-300 ease-in-out" />
        </button>

        <ul className="flex items-center justify-center gap-x-2 text-sm">
          {prev > 0 && (
            <>
              <li className="px-4 py-2 rounded-full text-text-heading">
                <span>...</span>
              </li>

              <li
                className="px-4 py-2 rounded-full text-text-heading hover:text-text bg-secondary-background cursor-pointer hover:bg-primary-background transition-all duration-300 ease-in-out"
                value={prev}
                onClick={handleClick}
              >
                <span>{prev}</span>
              </li>
            </>
          )}

          <li
            className="px-4 py-2 rounded-xl text-text-heading hover:text-text bg-secondary-background border border-primary-background cursor-pointer hover:border-text-heading text-base"
            value={current}
          >
            <span>{current}</span>
          </li>

          {next <= total && (
            <>
              <li
                className="px-4 py-2 rounded-full text-text-heading hover:text-text bg-secondary-background cursor-pointer hover:bg-primary-background transition-all duration-300 ease-in-out"
                value={next}
                onClick={handleClick}
              >
                <span>{next}</span>
              </li>

              <li className="px-4 py-2 rounded-full text-text-heading bg-secondary-background ">
                <span>...</span>
              </li>
            </>
          )}
        </ul>

        <button
          type="button"
          className="px-2.5 py-2 flex justify-center items-center  rounded-full text-text-heading hover:text-text bg-secondary-background border border-primary-background cursor-pointer hover:border-text-heading disabled:text-text-heading disabled:border-primary-background disabled:cursor-not-allowed"
          onClick={handleRightClick}
          disabled={next > total}
        >
          <ChevronRight className="h-5 w-5 group transition-all duration-300 ease-in-out" />
        </button>
      </div>
    </div>
  );
};

export default Pagination;
