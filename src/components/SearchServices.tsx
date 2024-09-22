import { useEffect, useState } from "react"
import ServiceCard from "./ServiceCard";
type serviceData = {
    id:number,
    serviceName: string;
    serviceDescription: string;
    servicePrice: number;
  };
export default function SearchServices({getServices}:{getServices?:()=>serviceData[]}){
    let [services,setServices]=useState<serviceData[] | []>([]);
    const [searchText,setSearchText]=useState('');
    const [searchedServices,setSearchedServices]=useState<serviceData[] | []>([]);
    function searchServices(text:string){
       if(services.length>0){
        setSearchedServices([]);
        let newArr:serviceData[]=[]
         services.forEach((ele)=>{
            if (
              ele.serviceDescription.toLowerCase().search(text.toLowerCase().trim()) >= 0 ||
              ele.serviceName.toLowerCase().search(text.toLowerCase().trim()) >= 0 
            ) {
              newArr.push(ele)
              setTimeout(() => {
                // console.log(searchedServices, "seacrhd services");
              }, 2000);
            } else {
              return
            }
            
            
         });
         setSearchedServices(newArr);
       }
    }
    useEffect(()=>{
       if(getServices){
        setServices(getServices);
       }
    },[]);
    useEffect(()=>{
        searchServices(searchText)
    },[searchText])
    // console.log(services)
    return(
        <div>
            <h1 className="text-center text-warning">Search Services</h1>
            <div className=""><input type="search" placeholder="search services..." className="border-warning border px-3 py-1 rounded w-75 mx-auto d-block" onChange={(e)=>{setSearchText(e.target.value)}} /></div>
            <div className="d-flex container flex-wrap">
              {searchedServices.map((ele,i)=>(
                <ServiceCard serviceDescription={ele.serviceDescription} servicePrice={ele.servicePrice} serviceTitle={ele.serviceName} key={i} id={i} inSearch={true}/>
              ))}
            </div>
        </div>
    )
}