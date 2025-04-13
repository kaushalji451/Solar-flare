import React from "react";
import { useState, useEffect,useContext } from "react";
import { useLocation, Link } from "react-router-dom";
import { ToastContainer, toast, Bounce } from "react-toastify";
import { AuthContext } from "../firebase/authContext";
const Product = () => {
  const [arr, setarr] = useState([]);
  const [cart, setcart] = useState([]);
  const [aruser,setaruser] = useState(null);
  const { user } = useContext(AuthContext);
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  let categery = params.get("categery");
  
     let totalnewPrice = cart.reduce((sum, item) => sum + item.newprice, 0);
     let totaloldPrice = cart.reduce((sum, item) => sum + item.oldprice, 0);  
  
  useEffect(() => {
    window.scrollTo(0, 0); // Scroll to the top when route changes
  }, []);

  // gettting data
  useEffect(() => {
    fetch("http://localhost:8080/")
      .then((responce) => {
        return responce.json();
      })
      .then((data) => {
        setarr(data);
      });
  }, []);

  
  // getting user 
  useEffect(() => {
    if(user){
     fetch(`http://localhost:8080/user?email=${user.email}`)
     .then((responce) => {
       return responce.json();
     })
     .then((data) => {
       console.log(data);
       setaruser(data[0]);  
     });
    }
   }, [user])

  // add to cart
  let handleClick = async (id) => {
    let responce = await fetch(`http://localhost:8080/product/cart/${id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(aruser),
    });
    let result = await responce.json();
    if (result === "product added successfully") {
      toast('Added to Cart Successfully');
    }
  };

  // getting cart items
  useEffect(() => {
    // cart items
    if(aruser){
    fetch(`http://localhost:8080/cart/${aruser._id}`)
        .then((responce) => {
          return responce.json();
        })
        .then((data) => {
          if(data != "no data found"){
            setcart(data);
          }else{
            console.log("there was no data");
          }
        });  
}
  }, [aruser,cart]);

  // cart item delete
  let handleDelete = async (id) => {
    let responce = await fetch(`http://localhost:8080/cart/${id}`, {
      method: "DELETE",
    });
    let result = await responce.json();
    if(result){
      toast('Service Removed Successfully');
    }
  };
  

  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition={Bounce}
      />
      <div className=" pt-15">
        <div className="flex px-20 pt-20   ">
          <div className=" border overflow-y-scroll w-full border-slate-200 h-[80vh]  px-10">
            <h1 className="font-semibold text-3xl pb-10  ">
              Most Affortable Packages
            </h1>
            {/* cart data */}

            {arr
              .filter((item) => item.categery === categery)
              .map((data) => (
                <div className="border-t border-b border-slate-400  ">
                  <div className="py-3 flex justify-between">
                    <div className="w-1/2 ">
                      <h2 className="font-semibold text-2xl pb-2">
                        {data.title}
                      </h2>
                      <p className="border-b border-dashed w-1/3 mb-2 text-md pb-1">
                        4.81 208k reviews{" "}
                      </p>
                      <p>
                        &#8377;{data.newprice}{" "}
                        <span className="ps-2 line-through opacity-50">
                          &#8377;{data.oldprice}
                        </span>
                      </p>{" "}
                      <p className="pt-2">{data.description}</p>
                      <button className="text-blue-800">
                        <Link to={`/item/?id=${data._id}`}>
                          view details...
                        </Link>
                      </button>
                    </div>
                    <div className=" w-40 rounded-xl  h-40 flex flex-col justify-center items-center  ">
                      <img
                        src={data.image}
                        alt=""
                        className="w-full h-37 border border-slate-500 rounded-xl"
                      />
                      <button
                        className="bg-slate-300 border border-slate-500 px-4 py-1 rounded-sm w-1/2 -mt-4"
                        onClick={() => handleClick(data._id)}
                      >
                        Add
                      </button>
                    </div>
                  </div>
                </div>
              ))}
          </div>
          <div className="w-1/2 border pb-8   border-slate-200  flex flex-col items-center">
            {/* cart div */}
            <div className="border border-slate-300 rounded-2xl w-[80%] mt-10 py-5 flex flex-col justify-center items-center">
              {totalnewPrice === 0 && (
                <div>
                  <lord-icon
                    src="https://cdn.lordicon.com/pmawqxvu.json"
                    trigger="hover"
                    colors="primary:#3080e8,secondary:#646e78,tertiary:#3a3347"
                    className="w-25 h-25"
                  ></lord-icon>
                  <p>No item in your cart</p>
                </div>
              )}

              {/* cart */}
              {totalnewPrice > 0 && (
                <div className="flex flex-col gap-4 w-full px-1 h-full ">
                  <h1 className="font-semibold text-">Cart</h1>
                  {cart.map((item) => (
                    <div className="border border-slate-400 py-2 flex items-center justify-between px-4 rounded-2xl">
                      <div className="w-1/3">{item.title} </div>
                      <div className="w-1/3 flex justify-around rounded-2xl bg-slate-200 ">
                        <button
                          className="font-bold text-md py-2 px-2 cursor-pointer"
                          onClick={() => handleDelete(item._id)}
                        >
                          -
                        </button>
                        <button className="py-2 px-2">1</button>
                        {/* dissabled */}
                        <button
                          className="font-bold text-md text-slate-400 py-2 px-2 cursor-pointer"
                          disabled
                        >
                          +
                        </button>
                      </div>
                      <div className="w-1/3 flex justify-center">
                        &#8377;{item.newprice}
                      </div>
                    </div>
                  ))}
                  {/* total of cart */}
                  <Link to={`/checkout?id=${aruser._id}`}>
                  <div className="bg-blue-500 text-white flex justify-between px-4 py-3 rounded-xl">
                    <p>
                      &#8377;{totalnewPrice}
                      <span className="ps-2 line-through opacity-50">
                        &#8377;{totaloldPrice}
                      </span>
                    </p>
                    <button>View Cart</button>
                  </div>
                  </Link>
                </div>
              )}
            </div>

            <div className="mt-6 border border-slate-300 rounded-2xl  py-6 w-[80%] flex justify-center items-center gap-2">
              <lord-icon
                src="https://cdn.lordicon.com/jxynfsur.json"
                trigger="hover"
                colors="primary:#ffffff,secondary:#30e849"
              ></lord-icon>
              <p>Amazone cashback upto &#8377;50</p>
            </div>
            <div className="mt-6 border border-slate-300 rounded-2xl  py-6 w-[80%] ps-5">
              <h1 className="font-semibold text-xl pb-2 ps-4">SR Promise</h1>
              <ul className="">
                <li className="flex gap-1 items-center">
                  <lord-icon
                    src="https://cdn.lordicon.com/hrtsficn.json"
                    trigger="hover"
                    colors="primary:#000000"
                    className="w-5 h-5"
                  ></lord-icon>
                  <p>Verified Professionals</p>
                </li>
                <li className="flex gap-1 items-center">
                  <lord-icon
                    src="https://cdn.lordicon.com/hrtsficn.json"
                    trigger="hover"
                    colors="primary:#000000"
                    className="w-5 h-5"
                  ></lord-icon>
                  <p>Hassel free Booking</p>
                </li>
                <li className="flex gap-1 items-center">
                  <lord-icon
                    src="https://cdn.lordicon.com/hrtsficn.json"
                    trigger="hover"
                    colors="primary:#000000"
                    className="w-5 h-5"
                  ></lord-icon>
                  <p>Low price in Market</p>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Product;
