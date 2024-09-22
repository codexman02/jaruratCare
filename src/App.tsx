import { useRef, useState } from "react";
import ServiceCard from "./components/ServiceCard";
import ServiceForm from "./components/ServiceForm";
import SearchServices from "./components/SearchServices";

type serviceData = {
  id:number,
  serviceName: string;
  serviceDescription: string;
  servicePrice: number;
};

function App() {
  const [services, setServices] = useState<serviceData[] | []>([]);
  
  const serviceForm = useRef<HTMLDialogElement | null>(null);
  const [isServices,setIsServices]=useState(true);
  const [formType,setFormType]=useState<"add" | 'update' | "delete">('add');
  const [updateId,setUpdateId]=useState<number | null>(null)
 
  function createService(data: serviceData) {
   data.id=services.length;
    setServices((prev)=>[...prev,data]);
    // console.log(data, "from parent");
    serviceForm.current?.close();
  }
  function updateService(data:serviceData){
    let newservices:serviceData[]=[]
    services.forEach((ele,i)=>{
      if(ele.id==updateId){
        ele=data;
        ele.id=i
        newservices.push(ele);//updating matched element
      }else{
        ele.id=i
        newservices.push(ele)
      }
    });
setServices(newservices);
serviceForm.current?.close();
  }
  function deleteService(id:number){
    let updatedServices=services.filter((ele)=>ele.id!=id);
    updatedServices.forEach((ele,i)=>{
     ele.id=i
    })
    setServices(updatedServices);
  //  console.log(updatedServices,id)
  }
  function handleService(data:serviceData){
    // console.log(updateId,"handle id")
  if(formType=="add"){
    createService(data)
  }else if(formType=="update"){
    if(typeof updateId=='number'){
      data.id=updateId
    }
   updateService(data);
  }
  }
  function openAddModal(){
    setFormType("add");
    serviceForm.current?.showModal();
  }
  function openUpdateModal(id:number){
    setFormType('update');
    setUpdateId(id);
    serviceForm.current?.showModal();
    setTimeout(()=>{
      // console.log(formType,updateId)
    },1000)
  }
 function getServices(){
  return services;
 }
  return (
    <div className="bg-secondary min-vh-100">
      <div className="main_page container-lg p-lg-3 ">
        {/* DIALOG BOX FOR FORM  */}
        <dialog
          ref={serviceForm}
          className="border-0 rounded-3 shadow-sm px-5 py-3 position-relative"
        >
          <div className="position-absolute top-2 end-0 px-3">
            <button
              className="btn btn-danger"
              onClick={() => {
                serviceForm.current?.close();
              }}
            >
              X
            </button>
          </div>
          <ServiceForm handleService={handleService} />
        </dialog>

        <h1 className="text-center display-3 text-warning fw-semibold ">Health Services</h1>
        <div className="d-flex my-3">
        <p className="mx-2 rounded-3  fw-semibold fs-5 my-auto border px-3 py-1 bg-warning text-white border-warning" style={{cursor:'pointer'}} onClick={()=>{setIsServices(true)}}>
             Services
            </p>
        <p className="mx-2 rounded-3  fw-normal fs-5 my-auto border px-3 py-1 bg-warning text-white border-warning" onClick={()=>{setIsServices(false)}} style={{cursor:'pointer'}}>
             Search services
            </p>
        </div>

        <div className="p-md-4 border border-warning rounded">
          {isServices?(<>
            <div className="d-flex p-3">
            <button
              className="btn btn-warning mx-2"
              onClick={() => {
                openAddModal()
              }}
            >
              Add
            </button>
            </div>
          <div className=" ">
              {services.length==0?(<>
                <div>
                <h2 className="text-center text-white">Create a Service</h2>
                </div>
              </>):(
                <div className="d-flex flex-wrap">
                {services.map((ele,i)=>(
              <ServiceCard serviceTitle={ele.serviceName} serviceDescription={ele.serviceDescription} servicePrice={ele.servicePrice} key={i} openUpdateModal={openUpdateModal} id={i} deleteService={deleteService}/>
            ))}
                </div>
              )}
            
          </div>
          </>):(<><SearchServices getServices={getServices}/></>)}
        </div>
      </div>
    </div>
  );
}

export default App;
