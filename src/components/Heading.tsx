import { Search } from "lucide-react";
import { useAppSelector } from "../app/hooks";
import {
  selectQuery,
  selectTotalLength,
  setQuery,
} from "../app/features/filterSlice";
import { useDispatch } from "react-redux";
import { ChangeEvent } from "react";

const Heading = () => {
  const total = useAppSelector(selectTotalLength);
  const query = useAppSelector(selectQuery);
  const dispatch = useDispatch();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.currentTarget.value;
    const newSearchParams = new URLSearchParams(window.location.search);
    newSearchParams.set("q", value);
    window.history.pushState(
      { q: value },
      `Q ${value}`,
      `?${newSearchParams.toString()}`
    );
    dispatch(setQuery(value));
  };
  return (
    <div className="w-full flex justify-between items-center">
      <p className="font-semibold">Found {total} countries</p>
      <div className="flex items-center justify-center gap-x-3 bg-primary-background w-72 rounded-xl px-5 py-3 text-text-heading group">
        <Search className="h-6 w-6 mr-1 group transition-all duration-300 ease-in-out group-hover:text-text cursor-vertical-text group-focus-within:text-text" />
        <input
          type="text"
          placeholder="Search by Name"
          className="outline-none hover:outline-none focus-within:outline-none w-full bg-inherit text-sm font-semibold tracking-wide transition-all duration-300 ease-in-out group-hover:text-text group-focus-within:text-text"
          maxLength={50}
          value={query}
          onChange={handleChange}
        />
      </div>
    </div>
  );
};

export default Heading;
