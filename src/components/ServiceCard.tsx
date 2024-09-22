import { useState } from "react";
import VerticalDots from "./Snippets/VerticalDots";
import CloseIcon from "./Snippets/CloseIcon";

export default function ServiceCard({id,serviceTitle,serviceDescription,servicePrice,openUpdateModal,deleteService}:{id:number,serviceTitle?:string,serviceDescription?:string,servicePrice?:number,openUpdateModal?:(id:number)=>void,deleteService?:(id:number)=>void}){
  const [isOptions,setIsOptions]=useState(false);
   
    return(
        <>
        <div className="card bg-white rounded-4 shadow-sm border-1 mx-2 my-3 position-relative" style={{width:'18rem'}} >
          {isOptions && <div className="position-absolute bg-light px-4 py-2 rounded shadow" style={{top:"-2rem",left:'1rem'}}>
            <button className="btn btn-outline-secondary mx-2" onClick={()=>{openUpdateModal?openUpdateModal(id):''}}>update</button>
            <button className="btn btn-danger mx-2" onClick={()=>{deleteService?deleteService(id):''}}>delete</button>
          </div>}
  {/* <img src="..." className="card-img-top" alt="..."/> */}
  <div className="card-body position-relative">
    <div className="position-absolute" style={{right:'1rem',top:'1rem',cursor:'pointer'}} > 
      {isOptions?(<span onClick={()=>{setIsOptions(false)}}><CloseIcon width="20" height="20"/></span>):(<span onClick={()=>{setIsOptions(true)}}><VerticalDots width="20" height="20" /></span>)}
    </div>
    <h5 className="card-title fw-normal fs-1  text-center">{serviceTitle}</h5>
    <p className="card-text lead fs-5 p-2 mb-0">{serviceDescription}</p>
    <p className="fw-semibold fs-3 mt-0  mb-1 p-2">Price-<span className="fw-semibold fs-3  mb-0 text-warning">${servicePrice}</span></p>
    <button className="bg-warning border-0 px-3 py-2 rounded-2 fs-5 text-white fw-normal mb-2 shadow-sm">Buy Now</button>
  </div>
</div>
        </>
    )
}