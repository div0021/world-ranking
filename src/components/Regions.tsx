import { MouseEvent } from "react";
import { cn } from "../utils/cn";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import {
  addRegion,
  regions,
  removeRegion,
  selectRegions,
} from "../app/features/filterSlice";

const Regions = () => {
  const dispatch = useAppDispatch();
  const selected = useAppSelector(selectRegions);

  const handleClick = (e: MouseEvent<HTMLButtonElement>) => {
    const id = e.currentTarget.id;

    if (selected.indexOf(id) === -1) {
      dispatch(addRegion(id));
      const newSearchParams = new URLSearchParams(window.location.search);
      newSearchParams.set("regions", selected.join(",") + "," + id);
      window.history.pushState(
        { regions: selected.join(",") + "," + id },
        `Regions ${selected.join(",") + "," + id}`,
        `?${newSearchParams.toString()}`
      );
    } else {
      dispatch(removeRegion(id));
      const newSearchParams = new URLSearchParams(window.location.search);
      newSearchParams.set("regions", selected.filter((el) => el !== id).join(","));
      window.history.pushState(
        { regions: selected.filter((el) => el !== id).join(",") },
        `Regions ${selected.filter((el) => el !== id).join(",")}`,
        `?${newSearchParams.toString()}`
      );
    }
  };
  return (
    <div className="mt-5 w-full">
      <span className="text-sm font-bold tracking-wider my-2 text-text-heading">
        Region
      </span>

      <div className="flex items-center justify-start flex-wrap w-full pt-3 gap-x-2 gap-y-4">
        {regions.map((el) => (
          <button
            type="button"
            className={cn(
              "py-2 px-3 text-text-heading bg-secondary-background transition-all duration-300 ease-in-out font-semibold tracking-wide rounded-xl",
              {
                "text-text bg-primary-background": selected.indexOf(el) !== -1,
              }
            )}
            id={el}
            key={el + "region"}
            onClick={handleClick}
          >
            {el}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Regions;
