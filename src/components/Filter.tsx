import Select from "./Select";
import Regions from "./Regions";

const Filter = () => {
  return (
    <div className="w-full col-span-12 px-10 md:px-0 md:col-span-3 flex flex-col">
      <span className="text-sm font-bold tracking-wider my-2 text-text-heading">
        Sort by
      </span>

      <Select />

      {/* Region */}
      <Regions />
    </div>
  );
};

export default Filter;
