import React from "react";
import Temp5 from "../templetecomponent/Temp5"
const Templete5 = () => {
  return (
    <div>
      <div className="mx-20 pt-20  border-t  ">
        <p className="pb-5 font-semibold text-3xl ps-5 ">
          Most Booked And Affortable Services
        </p>
        <div className=" flex overflow-x-scroll">
          <div className="flex gap-5 whitespace-nowrap px-5">
          <Temp5></Temp5>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Templete5;
