import { Earth } from "lucide-react";
import Heading from "./components/Heading";
import Filter from "./components/Filter";
import CountriesTable from "./components/CountriesTable";
import { useEffect } from "react";

function App() {


useEffect(()=>{
  window.history.pushState({ page: 1 }, `Page ${1}`, `?page=${1}&sort=desc`);

},[])
  return (
    <>
      <main className="w-screen min-w-[650px]  overflow-x-hidden flex flex-col justify-start items-center bg-secondary-background min-h-screen h-[80rem] sm:h-screen">
        <div className="w-full bg-[url(/countries.jpg)] h-[30rem] bg-cover flex justify-center items-center text-checks font-bold text-4xl">
          <Earth className="h-10 w-10 mr-4 text-checks" />
          <span className="text-white mr-2">World</span>
          <span className="text-checks">Ranks</span>
        </div>
        <div className="w-full flex justify-center items-center bg-secondary-background">
          <div className="w-full relative max-w-screen-xl flex justify-center items-center">

            <div className="absolute w-full lg:w-11/12 min-h-fit bg-secondary-background border border-primary-background rounded-xl -top-32 p-5 text-text pb-20">

              {/* Heading */}
             <Heading />

              <div className="w-full grid grid-cols-12 mt-10 gap-y-10 md:gap-y-5">

                {/* Filter */}
                <Filter />

                <CountriesTable />

                
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}

export default App;
