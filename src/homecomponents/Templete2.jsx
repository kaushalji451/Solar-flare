import React from 'react'
import { Link } from 'react-router-dom'
const Templete2 = () => {
  return (
    <div>
      <div className=" pt-10 px-20">
          <h1 className="font-semibold text-3xl">Applinces & Services</h1>
          <div className="flex gap-5 overflow-auto">
            <div className="py-5 ">
               <Link to={`/product/?categery=Ac`}>
              <img
                src="/cursoleimg/cursole1.png"
                alt=""
                className="w-100 rounded-xl"
              />
              </Link>
            </div>
            <div className="py-5 ">
               <Link to={`/product/?categery=Ro`}>
              <img
                src="/cursoleimg/cursole2.png"
                alt=""
                className="w-100 rounded-xl"
              />
              </Link>
            </div>
            <div className="py-5 ">
               <Link to={`/product/?categery=Washing machine`}>
              <img
                src="/cursoleimg/cursole3.png"
                alt=""
                className="w-100 rounded-xl"
              />
              </Link>
            </div>
            <div className="py-5 ">
               <Link to={`/product/?categery=Refrigerator`}>
              <img
                src="/cursoleimg/cursole4.png"
                alt=""
                className="w-100 rounded-xl"
              />
              </Link>
            </div>
          </div>
        </div>
    </div>
  )
}

export default Templete2
