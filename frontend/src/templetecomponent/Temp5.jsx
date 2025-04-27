import React from 'react'
import { useState,useEffect } from 'react';
import { Link } from 'react-router-dom';
const Temp5 = () => {
  const [arr, setarr] = useState([]);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_BACKEND_URL}`)
    .then((responce)=>{
      return responce.json();
    }).then((data)=>{
      setarr(data);
    })
  }, [])

  return (
    <div className='flex gap-6'>
       { arr
      .filter((item) => item.newprice === 499 || item.newprice === 1199 || item.newprice == 1099 )
      .map((data) => (
        <Link to={`/product?categery=${data.categery}`}>
        <div className="w-62  h-73 rounded-2xl border  border-slate-400 flex items-center justify-center">
              <div className="flex flex-col h-full gap-2 pb-5">
                <div>
                  <img
                    src="/cursoleimg/cursole1.png"
                    alt=""
                    className="rounded-tl-xl rounded-tr-xl h-50"
                  />
                </div>
                <div className="ps-4">
                  <h1>{data.title}</h1>
                  <p className="flex items-center">
                    <lord-icon
                      src="https://cdn.lordicon.com/uihwbzln.json"
                      trigger="hover"
                      className="w-4 h-4"
                     colors="primary:#121331,secondary:#000000,tertiary:#ebe6ef"
                    ></lord-icon>
                    <span>4.80 &#40;4k&#41;</span>
                  </p>
                  <p>
                    &#8377;{data.newprice}&nbsp;
                    <span className="line-through opacity-50">&#8377;{data.oldprice}</span>
                  </p>
                </div>
              </div>
            </div>
            </Link>
            ))
          }
    </div>
  )
}

export default Temp5
