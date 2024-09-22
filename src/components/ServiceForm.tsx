import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
type serviceData = {
  serviceName: string;
  serviceDescription: string;
  servicePrice: number;
  id:number
};
export default function ServiceForm({
  handleService
}: {
  handleService?: (data:serviceData) => void,
  
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
            <label htmlFor="serviceName" className="form-label  fs-5 fw-normal">
              Service Name
            </label>
            <input
              type="text"
              {...register("serviceName")}
              className="form-control"
              id="serviceName"
              aria-describedby="emailHelp"
              placeholder="service name..."
            />
            {errors.serviceName && (
              <small className="text-wrap text-danger">
                <em>{errors.serviceName.message}</em>
              </small>
            )}
          </div>
          <div className="mb-3">
            <label
              htmlFor="serviceDescription"
              className="form-label  fs-5 fw-normal"
            >
              Service Description
            </label>
            <textarea
              {...register("serviceDescription")}
              id="serviceDescription"
              className="form-control"
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
              className="form-label  fs-5 fw-normal"
            >
              Service Price
            </label>
            <input
              type="number"
              {...register("servicePrice")}
              className="form-control"
              id="servicePrice" min={6}
            />
            {errors.servicePrice && (
              <small className="text-wrap text-danger">
                <em>{errors.servicePrice.message}</em>
              </small>
            )}
          </div>
          <button type="submit" className="btn btn-warning">
            Submit
          </button>
        </form>
      </div>
    </>
  );
}
