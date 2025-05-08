import React, { useEffect, useRef, useState, useContext } from "react";
import { useLocation } from "react-router-dom";
import { AuthContext } from "../firebase/authContext";
import { useNavigate } from "react-router-dom";
import findMonth from "../function/Month";
const Orders = () => {
  const location = useLocation();
  const { order, response } = location.state || {};
  const [orders, setOrders] = useState(null);
  const [oneorder, setoneorder] = useState(null);
  const { user } = useContext(AuthContext);
  const [aruser, setaruser] = useState(null);
  let navigate = useNavigate();

  const lastPostedRef = useRef(null);

  useEffect(() => {
    const handleUser = async () => {
      if (user) {
        let responce = await fetch(
          ` ${import.meta.env.VITE_BACKEND_URL}/user?email=${user.email}`
        );
        let result = await responce.json();
        setaruser(result);
      }
    };
    handleUser();
  }, [user]);

  // Handle order save and fetch user's orders
  useEffect(() => {
    const isSameOrder =
      JSON.stringify(lastPostedRef.current) ===
      JSON.stringify({ order, response });

    if (order != undefined && response != undefined) {
      lastPostedRef.current = { order, response };
      const handleData = async () => {
        try {
          await fetch(`${import.meta.env.VITE_BACKEND_URL}/order`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ order, response }),
          });
        } catch (err) {
          console.error("Error handling order data:", err);
        }
      };
      handleData();
    }
  }, [order, response]);

  //   // fetch the all orders
  useEffect(() => {
    if (aruser != null) {
      let handledata = async () => {
        let responce = await fetch(
          ` ${import.meta.env.VITE_BACKEND_URL}/allOrder/${aruser[0]._id}`
        );
        let data = await responce.json();
        setOrders(data);
      };
      handledata();
    }
  }, [aruser]);

  let handleClick = async (data) => {
    setoneorder(data);
  };

  let totalamount = 0;
  let listprice = 0;
  let sellingprice = 0;
  // to calculate the total price
  if (oneorder != null) {
    oneorder.item.map((d) => {
      listprice += d.oldprice;
      sellingprice += d.newprice;
      let amountWithTax = Number((d.newprice / 15).toFixed(0));
      totalamount = totalamount + d.newprice + amountWithTax;
    });
  }

  // navigate to the item
  let handleClickItem = (id) => {
    navigate(`/item/?id=${id}`);
  };

  return (
    <>
      <div className="pt-15 flex justify-center">
        <div className="flex w-[90%] gap-2 h-screen justify-center">
          <div className="bg-slate-100 w-1/2 px-2 py-8 overflow-auto">
            <h1 className="font-bold text-2xl text-center">All Orders</h1>

            {orders != null &&
              orders.map((data) => (
                <div
                  className="flex border-b border-t mx-2 bg-white border-slate-300 justify-around items-center py-2 mt-2 cursor-pointer"
                  onClick={() => handleClick(data)}
                >
                  <img src={data.item[0].image} alt="" className="w-25 h-25 rounded-xl" />
                  <p>Budget Services </p>

                  <div>
                    <p>
                      Booked By
                      <span> {data.updatedAt.slice(8, 10)}&nbsp;</span>
                      <span>{findMonth(data.updatedAt.slice(5, 7))}</span>
                    </p>
                    <p>your item has been deleverd</p>
                  </div>
                </div>
              ))}
          </div>

          {oneorder != null && (
            <div className=" w-2/3  bg-slate-100 py-8 px-6 flex gap-5">
              <div className="w-2/3  overflow-scroll">
                <div className="border border-slate-400 bg-white px-4 py-4 rounded-2xl">
                  <p>
                    Orders can be tracked by +91{" "}
                    {aruser != null && aruser[0].phoneno}{" "}
                  </p>
                  <p>tracking link share via sms.</p>
                </div>

                {oneorder != null &&
                  oneorder.item.map((data) => (
                    <div
                      className="flex border-b border-t mx-2 bg-white border-slate-300 justify-between items-center py-2 mt-2 px-5 cursor-pointer gap-2"
                      onClick={() => handleClickItem(data._id)}
                    >
                      <img src={data.image} alt="" className="w-25 h-25 rounded-xl" />
                      <p className="w-2/3">{data.title} </p>
                    </div>
                  ))}
              </div>

              <div className="border border-slate-400 rounded-2xl py-6 px-6 flex flex-col gap-2">
                <div className="border border-slate-400 py-4 px-6 font-semibold rounded-2xl text-2xl bg-white">
                  <p>Invoice Download</p>
                </div>
                <div className="border border-slate-400 py-2 px-2 rounded-2xl bg-white">
                  <h2 className="font-semibold text-slate-400">
                    Shipping Details
                  </h2>
                  <div className="flex flex-col gap-2 py-4 ">
                    <p className="font-semibold text-xl py-1">
                      {aruser != null && aruser[0].name}
                    </p>
                    <p>
                      {aruser != null && (
                        <p>
                          <span>{aruser[0].house},</span>&nbsp;
                          <span>{aruser[0].street},</span>&nbsp;
                          <span>{aruser[0].city},</span>&nbsp;
                          <span>{aruser[0].state}</span>
                        </p>
                      )}
                    </p>
                  </div>
                </div>
                <div className="border border-slate-400 px-4  py-2 rounded-2xl bg-white ">
                  <h1 className="font-semibold text-slate-400">
                    Price Details
                  </h1>
                  <div className="flex justify-between py-2">
                    <p className="font-semibold">List Price</p>
                    <p>₹{listprice}</p>
                  </div>
                  <div className="flex justify-between py-2">
                    <p className="font-semibold">Selling Price</p>
                    <p>₹{sellingprice}</p>
                  </div>
                  <div className="flex justify-between py-2">
                    <p className="font-semibold">Total Amount</p>
                    <p>₹{totalamount}</p>
                  </div>
                  <h3>Payment Mode : Cash On Delivery</h3>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Orders;
