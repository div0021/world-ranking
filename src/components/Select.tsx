import { ChevronDown } from "lucide-react";
import { MouseEvent, useEffect, useState } from "react";
import { cn } from "../utils/cn";
import { useAppDispatch } from "../app/hooks";
import { setSort } from "../app/features/filterSlice";

const data = [
  {
    label: "Ascending order",
    id: "asc",
  },
  {
    label: "Descending order",
    id: "desc",
  },
];

const Select = () => {
  const [open, setOpen] = useState<boolean>(false);
  const [anotherOpen, setAnotherOpen] = useState<boolean>(false);
  const queryParams = new URLSearchParams(window.location.search);

  const newSortOption = queryParams.get("sort");
  const [currentData, setCurrentData] = useState(
    newSortOption === "desc" ? data[1].label : ""
  );

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (open) {
      setAnotherOpen(true);
    }
  }, [open]);

  const handleClick = (e: MouseEvent<HTMLDivElement>) => {
    const selectId = e.currentTarget.id;

    setCurrentData(data.find((el) => el.id === selectId)?.label || "");

    const newSearchParams = new URLSearchParams(window.location.search);
    newSearchParams.set("sort", selectId);
    window.history.pushState(
      { sort: selectId },
      `Sort ${selectId}`,
      `?${newSearchParams.toString()}`
    );

    dispatch(setSort(selectId))
    setAnotherOpen(false);
    setTimeout(() => {
      setOpen(false);
    }, 300);
  };

  return (
    <div
      className="w-full relative"
      onClick={() => setOpen(pre=>!pre)}
    >
      <div className="w-full bg-secondary-background border-2 rounded-xl border-primary-background p-2.5 px-5 font-semibold flex items-center justify-between text-text-heading cursor-pointer">
        <span>{currentData.length > 0 ? currentData : "Population"}</span>
        <ChevronDown
          className={cn(
            "h-5 w-5 rotate-0 transition-all duration-300 ease-in-out",
            { "rotate-180": open }
          )}
        />
      </div>

      <div
        className={cn(
          "absolute w-full top-12 p-1 border border-primary-background rounded-xl bg-secondary-background transition-all duration-300 translate-y-5 ease-in-out opacity-0 hidden gap-y-1",
          { "block opacity-0": open, "opacity-100 translate-y-0": anotherOpen }
        )}
      >
        {data.map((el) => (
          <div
            className="w-full p-2 hover:bg-primary-background rounded-xl cursor-pointer transition-all duration-300 ease-in-out"
            key={el.id}
            id={el.id}
            onClick={handleClick}
          >
            {el.label}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Select;
