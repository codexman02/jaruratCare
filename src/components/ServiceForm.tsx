import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
type serviceData = {
  serviceName: string;
  serviceDescription: string;
  servicePrice: number;
  id:number
};
export default function ServiceForm({
  handleService,updateData
}: {
  handleService?: (data:serviceData) => void,updateData:null | serviceData
  
}) {
  const formSchema = z.object({
    serviceName: z.string().min(3).max(30),
    serviceDescription: z.string().min(10),
    servicePrice: z.custom((v:number)=>v>5 ,{message:'price should be greater than 5'}),
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<serviceData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      serviceName: "",
      serviceDescription: "",
      servicePrice: 6,
    },
  });
  useEffect(()=>{
if(updateData){
  reset(updateData); 
}
else{reset({serviceName:'',serviceDescription:'',servicePrice:6})}
  },[updateData]);
  function onSubmit(data: serviceData) {
      if (handleService) {
       handleService(data);
        reset(); //resetting form values
      } else {
        return;
      }
    
  }
  return (
    <>
      <div className="form_box p-3">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-3">
            <label htmlFor="serviceName" className="form-label  fs-5 fw-light inter">
              Service Name
            </label>
            <input
              type="text"
              {...register("serviceName")}
              className="form-control inter fw-light"
              id="serviceName"
              aria-describedby="emailHelp"
              placeholder="service name..."
            />
            {errors.serviceName && (
              <small className="text-wrap text-danger inter fw-light">
                <em>{errors.serviceName.message}</em>
              </small>
            )}
          </div>
          <div className="mb-3">
            <label
              htmlFor="serviceDescription"
              className="form-label  fs-5 fw-light inter"
            >
              Service Description
            </label>
            <textarea
              {...register("serviceDescription")}
              id="serviceDescription"
              className="form-control inter fw-light"
              placeholder="service description..."
            ></textarea>
            {errors.serviceDescription && (
              <small className="text-wrap text-danger">
                <em>{errors.serviceDescription.message}</em>
              </small>
            )}
          </div>
          <div className="mb-3">
            <label
              htmlFor="servicePrice"
              className="form-label  fs-5 fw-light inter"
            >
              Service Price
            </label>
            <input
              type="number"
              {...register("servicePrice")}
              className="form-control inter fw-light"
              id="servicePrice" min={6}
            />
            {errors.servicePrice && (
              <small className="text-wrap text-danger">
                <em>{errors.servicePrice.message}</em>
              </small>
            )}
          </div>
          <button type="submit" className="btn btn-warning inter text-white">
            Submit
          </button>
        </form>
      </div>
    </>
  );
}
