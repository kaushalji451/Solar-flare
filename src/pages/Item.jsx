import React from "react";
import { useState, useEffect,useContext } from "react";
import { useLocation, Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../firebase/authContext";
import Review from "../components/Review";
const Item = () => {
  const { user } = useContext(AuthContext);
  const [arr, setarr] = useState([]);
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const id = params.get("id");
  const navigate = useNavigate();
  const [aruser, setaruser] = useState(null);
  const [owner ,setowner] = useState();
  useEffect(() => {
    window.scrollTo(0, 0); // Scroll to the top when route changes
  }, []);

  useEffect(() => {
    fetch(`http://localhost:8080/product/${id}`)
      .then((responce) => {
        return responce.json();
      })
      .then((data) => {
        setarr(data);
      });
  }, [id]);

  let handleclick = async () => {
    let responce = await fetch(`http://localhost:8080/product/${arr._id}`, {
      method: "DELETE",
    });
    let result = await responce.json();
    {
      result && navigate(`/product/?categery=${result}`);
    }
  };
  
  useEffect(() => {
    if(user?.email){
      fetch(`http://localhost:8080/user?email=${user.email}`)
      .then((responce) => {
        return responce.json();
      })
      .then((data) => {
        setaruser(data);
      });
    }
  
  }, [user])

  useEffect(() => {
    if(user?.email){
    fetch(`http://localhost:8080/isowner?email=${user.email}`)
    .then((responce)=>{
      return responce.json();
    })
    .then((data)=>{
      if(data === "this is owner"){
        setowner(true);
      }else{
        setowner(false);
      }
    })
  }
  }, [])

  return (
    <>
      <div className=" pt-15">
        <div className="flex px-30 pt-20  ">
          <div className=" border overflow-y-scroll w-full border-slate-200  px-10">
            <h1 className="font-semibold text-3xl pb-10  ">
              Most Affortable Packages 
            </h1>
            {/* cart data */}
            <div className="border-t border-b border-slate-400  shadow-2xl shadow-slate-300 ">
              <div className="py-3 flex justify-between ps-5">
                <div className="w-1/2 ">
                  <h2 className="font-semibold text-2xl pb-2">{arr.title}</h2>
                  <p className="border-b border-dashed w-1/3 mb-2 text-md pb-1">
                    4.81 208k reviews{" "}
                  </p>
                  <p>
                    &#8377;{arr.newprice}
                    <span className="ps-2 line-through opacity-50">
                      &#8377;{arr.oldprice}
                    </span>
                  </p>{" "}
                  <p className="pt-2">{arr.description}</p>
                  {/* edit and delete button */}
                 {owner == true &&  user &&  aruser!=null &&  <div className="py-4">
                    <button
                      type="button"
                      class="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
                    >
                      <Link to={`/product/edit/?id=${arr._id}`}>Edit</Link>
                    </button>
                    <button
                      type="button"
                      class="text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
                      onClick={handleclick}
                    >
                      Delete
                    </button>
                  </div>}
                </div>
                <div className=" w-50 rounded-xl  h-full flex flex-col justify-center items-center  ">
                  <img
                    src={arr.image}
                    alt=""
                    className="w-full h-45 border border-slate-500 rounded-xl"
                  />
                  
                </div>
              </div>
            </div>

            {/* how it work */}
            <div className="px-10">
              <h1 className="font-bold text-3xl py-4 text-center ">
                How it works
              </h1>
              <div>
                <h1 className="font-semibold py-2 text-xl">Check-up</h1>
                <p>
                  The techinical inspect of your eletronic item for hasel free
                  service
                </p>
              </div>
              <div>
                <h1 className="font-semibold py-2 text-xl">
                  Source spare parts &#40;if require&#41;
                </h1>
                <p>
                  if needed the techinican provide the spare parts from the
                  local market
                </p>
              </div>
              <div>
                <h1 className="font-semibold py-2 text-xl">Repair</h1>
                <p>the techinican the service or repair work</p>
              </div>
              <div>
                <h1 className="font-semibold py-2 text-xl">Payment</h1>
                <p>
                  pay the final repair or serive amount,minus the booking fee if
                  allredy pay
                </p>
              </div>
            </div>
            {/* note  */}
            <div className="px-10">
              <h1 className="font-semibold py-2 text-xl">Please note</h1>
              <p>the repair or serive qoute after the check-up </p>
              <p>visitation charge will be ardjust in the final qoute</p>
            </div>
            {/* we service all brand */}
            <div>
              <h1 className="font-bold text-3xl pt-8 pb-6  text-center ">
                We service all brand
              </h1>
              <div className="flex flex-col justify-center items-center">
                <div className="flex gap-5">
                  <div className="bg-zinc-300 w-40 mb-6 py-6 rounded-2xl  flex justify-center items-center">
                    <img
                      src="/allbrand/godrejimg.png"
                      alt="this is an image"
                      className="w-20 h-10"
                    />
                  </div>
                  <div className="bg-zinc-300 w-40 mb-6 py-6 rounded-2xl  flex justify-center items-center">
                    <img
                      src="/allbrand/haierimg.png"
                      alt=""
                      className="w-20 h-10"
                    />
                  </div>
                  <div className="bg-zinc-300 w-40 mb-6 py-6 rounded-2xl  flex justify-center items-center">
                    <img
                      src="/allbrand/ifbimg.png"
                      alt=""
                      className="w-20 h-10"
                    />
                  </div>
                </div>
                <div className="flex gap-5">
                  <div className="bg-zinc-300 w-40 mb-6 py-6 rounded-2xl  flex justify-center items-center">
                    <img
                      src="/allbrand/kentimg.png"
                      alt=""
                      className="w-20 h-10"
                    />
                  </div>
                  <div className="bg-zinc-300 w-40 mb-6 py-6 rounded-2xl  flex justify-center items-center">
                    <img
                      src="/allbrand/lgimg.png"
                      alt=""
                      className="w-20 h-10"
                    />
                  </div>
                  <div className="bg-zinc-300 w-40 mb-6 py-6 rounded-2xl  flex justify-center items-center">
                    <img
                      src="/allbrand/livepureimg.png"
                      alt=""
                      className="w-20 h-10"
                    />
                  </div>
                </div>
                <div className="flex gap-5">
                  <div className="bg-zinc-300 w-40 mb-6 py-6 rounded-2xl  flex justify-center items-center">
                    <img
                      src="/allbrand/samsungimg.png"
                      alt=""
                      className="w-20 h-10"
                    />
                  </div>
                  <div className="bg-zinc-300 w-40 mb-6 py-6 rounded-2xl  flex justify-center items-center">
                    <img
                      src="/allbrand/voltasimg.png"
                      alt=""
                      className="w-20 h-10"
                    />
                  </div>
                  <div className="bg-zinc-300 w-40 mb-6 py-6 rounded-2xl  flex justify-center items-center">
                    <p>&more</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="w-1/2 border border-slate-200  flex flex-col items-center">
            {/* <div className="border bg-slate-100 border-slate-300 rounded-2xl  w-[80%] mt-10 py-5 flex flex-col justify-center items-center">
              <lord-icon
                src="https://cdn.lordicon.com/pmawqxvu.json"
                trigger="hover"
                colors="primary:#3080e8,secondary:#646e78,tertiary:#3a3347"
                className="w-25 h-25"
              ></lord-icon>
              <p>No item in your cart</p>
            </div> */}
            <div className="mt-6 border bg-slate-100 border-slate-300 rounded-2xl   py-6 w-[97%] flex justify-center items-center gap-2">
              <lord-icon
                src="https://cdn.lordicon.com/jxynfsur.json"
                trigger="hover"
                colors="primary:#ffffff,secondary:#30e849"
              ></lord-icon>
              <p>Amazone cashback upto &#8377;50</p>
            </div>

            {/* write a reviews review */}
            <div>
              <Review id={arr._id}></Review>
            </div>
            {/* all reviews */}
            <div className="  border h-150 overflow-y-auto border-slate-200 bg-slate-100 w-[95%] pb-10 py-4 mt-4 rounded-2xl ">
              <h1 className="ps-10 font-semibold text-2xl">All reviews</h1>
              {arr?.reviewid && arr.reviewid.length > 0 ? (
                arr.reviewid.map((d, index) => (
                  <div
                    key={index}
                    className="mt-4 border  border-slate-400 p-4 rounded-md mx-5 "
                  >
                    <div className="flex justify-between ">
                    <h1 className="font-semibold">Abhishek</h1>
                    <button className="bg-green-600 px-4 rounded-md text-white">{d.rating}</button>
                    </div>
                    <div className="">
                    <p className="w-50 overflow-auto"> {d.comment}</p>
                    </div>
                  </div>
                ))
              ) : (
                <p className="mt-4 ">No reviews available.</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Item;
