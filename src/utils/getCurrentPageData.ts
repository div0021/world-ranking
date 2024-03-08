import { CountryType } from "./dataType";

export function getCurrentPageData(pagenumber:number,data:CountryType[]){
    return data.slice((pagenumber-1) * 10 , pagenumber * 10)

}