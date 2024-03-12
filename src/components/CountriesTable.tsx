import { useEffect, useState } from "react";
import { formatIndianNumber } from "../utils/formatIndianNumber";
import { useGetCountriesDataQuery } from "../app/services/countries";
import { CountryType, countriesSchema } from "../utils/dataType";
import { array } from "zod";
import Pagination from "./Pagination";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import {
  selectPage,
  selectQuery,
  selectRegions,
  selectSort,
  selectTotalLength,
  setLength,
} from "../app/features/filterSlice";
import { getCurrentPageData } from "../utils/getCurrentPageData";
import Loader from "./Loader";

const CountriesTable = () => {
  const { data, isLoading } = useGetCountriesDataQuery("");

  const [countriesData, setCountriesData] = useState<CountryType[]>([]);

  const dispatch = useAppDispatch();

  const currentPage = useAppSelector(selectPage);
  const totalLength = useAppSelector(selectTotalLength);
  const sortOrder = useAppSelector(selectSort);
  const query = useAppSelector(selectQuery);
  const regions = useAppSelector(selectRegions);

  useEffect(() => {
    if (!isLoading) {
      //   Valid countries data
      const validData = array(countriesSchema).parse(data);

      //   Sort functionality
      if (sortOrder === "asc") {
        validData.sort((a, b) => a.population - b.population);
      } else if (sortOrder === "desc") {
        validData.sort((a, b) => b.population - a.population);
      }

      //   Search functionality

      let result: CountryType[] = validData.filter(
        (el) => el.name.official.indexOf(query) !== -1
      );

      //   Region filter
      result = result.filter((el) => regions.indexOf(el.region) !== -1);

      dispatch(setLength(result.length));

      setCountriesData(getCurrentPageData(currentPage, result));
    }
  }, [isLoading, data, currentPage, dispatch, sortOrder, query, regions]);

  return (
    <div className="col-span-12 md:col-span-9 w-full pl-8 text-text-heading">
      <div className="w-full grid grid-cols-9">
        <div className="col-span-1 flex justify-start items-center">Flag</div>
        <div className="col-span-2 flex justify-start items-center">Name</div>
        <div className="col-span-2 flex justify-start items-center">
          Population
        </div>
        <div className="col-span-2 flex justify-start items-center">
          Area(km²)
        </div>
        <div className="col-span-2 flex justify-start items-center">Region</div>
      </div>

      <div className="h-[1px] w-full bg-primary-background my-5" />

      <div className="w-full space-y-2">
        {countriesData.length > 0 &&
          countriesData.map((el) => (
            <div
              className="w-full grid grid-cols-9 gap-x-2"
              key={el.name.official}
            >
              <div className="col-span-1 flex justify-start items-center">
                <img
                  src={el.flags.png}
                  alt={el.name.official.toLowerCase()}
                  className="w-10 h-7"
                />
              </div>
              <div className="col-span-2 flex justify-start items-center overflow-scroll">
                <p className="text-nowrap">{el.name.official}</p>
              </div>
              <div className="col-span-2 flex justify-start items-center">
                {formatIndianNumber(el.population)}
              </div>
              <div className="col-span-2 flex justify-start items-center">
                {formatIndianNumber(el.area)}
              </div>
              <div className="col-span-2 flex justify-start items-center">
                {el.region}
              </div>
            </div>
          ))}

        {isLoading ? (
          //   loading
          <Loader />
        ) : countriesData.length === 0 ? (
          <div className="w-full h-52 flex justify-center items-center">
            No data found.
          </div>
        ) : null}
      </div>

      {/* pagination */}

      {!isLoading && data && (
        <Pagination
          total={
            totalLength > 0
              ? totalLength % 10 === 0
                ? Math.floor(totalLength / 10)
                : Math.floor(totalLength / 10) + 1
              : 0
          }
        />
      )}
    </div>
  );
};

export default CountriesTable;
