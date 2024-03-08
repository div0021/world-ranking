import * as z from "zod";

export const countriesSchema = z.object({
    name:z.object({
        official: z.string()
    }),
    population:z.number(),
    area:z.number(),
    region:z.string(),
    flags:z.object({
        png:z.string()
    })
})

export  type CountryType=z.infer<typeof countriesSchema>

// eslint-disable-next-line @typescript-eslint/no-explicit-any
// export const GetRequiredData = (data:any) : CountriesType[] => {
//     const countriesList:CountriesType[] = [];

//     // eslint-disable-next-line @typescript-eslint/no-explicit-any
//     data.forEach((el:any)=>{
//         const countryData:CountriesType = {
//             name:el?.name?.offical || "",
//             population: el?.population?.total || "",
//             area: el?.area || "", 
//             region: el?.region || "",
//             flag:el?.flags?.png || "",

//         }
//         if(countryData.name !== "" && countryData.area !=="" && countryData.flag!== "" && countryData.region!=="" && countryData.population === ""){
//             countriesList.push(countryData)
//         }
//     })
    

//     return countriesList;
// }