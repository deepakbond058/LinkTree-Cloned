"use client";
import { useState, useEffect } from "react";
import Script from "next/script";
import { initiate } from "@/actions/userActions";

import { useSearchParams } from "next/navigation";

const Donation = ({ username ,name }) => {
  const searchParams = useSearchParams();
  const [coffees, setCoffees] = useState("1");
  const [showCoffee, setShowCoffee] = useState(false);
  const [thanks, setThanks] = useState(false);
  const [paymentform, setPaymentForm] = useState({
    name: "Anonymous",
    message: "Good work!",
  });

  const pay = async () => {
    const orderObj = await initiate(username, {
      ...paymentform,
      amount: coffees * 50 * 100,
    });
    //need to make nextJS env variables public NEXT_PUBLIC_KEY_ID to access them duing 'use client' or they will be undefined
    //use UPi:test@razorpay for free testing although no redirects are avaialable after payment
    const options = {
      key: process.env.NEXT_PUBLIC_KEY_ID,
      amount: coffees * 50,
      currency: "INR",
      name: "LinkTree Clone", //your business name
      description: "Test Transaction",
      image: "https://example.com/your_logo",
      order_id: orderObj.id, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
      callback_url: `${process.env.NEXT_PUBLIC_HOST}/api/razorpay`,
      prefill: {
        //We recommend using the prefill parameter to auto-fill customer's contact information especially their phone number
        name: "Gaurav Kumar", //your customer's name
        email: "gaurav.kumar@example.com",
        contact: "9000090000", //Provide the customer's phone number for better conversion rates
      },
      notes: {
        address: "Razorpay Corporate Office",
      },
      theme: {
        color: "#3399cc",
      },
    };

    const rzp1 = new Razorpay(options);
    rzp1.open();
  };

  useEffect(() => {
    if (searchParams.get("paymentDone") === "true") {
      setThanks(true);
      setTimeout(() => {
        setThanks(false);
      }, 4000);
    }
  }, []);

  return (
    <div className="w-full">
      <div
        className={`w-full overflow-hidden relative group hover:text-[#9e0a0a] border border-gray-100 hover:bg-gray-100 ${
          showCoffee ? "bg-gray-100 text-[#9e0a0a]" : ""
        } rounded-3xl`}
      >
        <Script src="https://checkout.razorpay.com/v1/checkout.js"></Script>
        <button
          className={`w-full flex items-center justify-center gap-5 rounded-3xl transition-all ease-in py-3 md:py-5`}
          onClick={(e) => {
            e.target.scrollIntoView({ behavior: "smooth", block: "start" });
            setShowCoffee(true);
          }}
        >
          <span className="italic font-semibold">Buy Me a Coffee</span>
          <img
            src="/cup.gif"
            className={`w-10 group-hover:invert  ${showCoffee ? "invert" : ""}`}
            alt="cup"
          />
        </button>

        <div
          className={`transition-all duration-500 ${
            showCoffee ? "max-h-[500px]" : "max-h-0"
          }`}
        >
          <div className="flex flex-col gap-3 pb-5 px-10 ">
            <div className="flex gap-2 items-center justify-center">
              <div className="select-none text-4xl">☕</div>
              <div className="select-none text-xl ">X</div>
              <div
                className={`select-none rounded-full h-10 flex items-center justify-center aspect-square font-bold cursor-pointer ${
                  coffees === "1" ? "bg-red-500 text-white" : "bg-white"
                }`}
                onClick={() => {
                  setCoffees("1");
                }}
              >
                1
              </div>
              <div
                className={`select-none rounded-full h-10 flex items-center justify-center aspect-square font-bold cursor-pointer ${
                  coffees === "3" ? "bg-red-500 text-white" : "bg-white"
                }`}
                onClick={() => {
                  setCoffees("3");
                }}
              >
                3
              </div>
              <div
                className={`select-none rounded-full h-10 flex items-center justify-center aspect-square font-bold cursor-pointer ${
                  coffees === "5" ? "bg-red-500 text-white" : "bg-white"
                }`}
                onClick={() => {
                  setCoffees("5");
                }}
              >
                5
              </div>
              <input
                maxLength={3}
                className="bg-white h-10 w-10 text-center rounded-lg font-bold"
                value={coffees}
                onChange={(e) => {
                  isNaN(parseInt(e.target.value))
                    ? setCoffees("")
                    : setCoffees(parseInt(e.target.value));
                }}
              />
            </div>
            <input
              className="h-10 transition-all duration-300 ease-[cubic-bezier(0,2.51,1,3)] rounded-xl p-3 bg-gray-200 hover:bg-gray-300 focus:bg-white placeholder:text-gray-500 outline-gray-400 outline-offset-0 focus:outline-offset-2"
              placeholder="Name or @yoursocial"
              onChange={(e) => {
                setPaymentForm({ ...paymentform, name: e.target.value });
              }}
            />
            <textarea
              rows={3}
              className="resize-none transition-all duration-300 ease-[cubic-bezier(0,2.51,1,3)] rounded-xl p-3 bg-gray-200 hover:bg-gray-300 focus:bg-white placeholder:text-gray-500 outline-gray-400 outline-offset-0 focus:outline-offset-2"
              placeholder="Say something nice..."
              onChange={(e) => {
                setPaymentForm({ ...paymentform, message: e.target.value });
              }}
            ></textarea>
            <div className="flex gap-5 ">
              <button
                className="transition-all duration-300 py-2 w-full font-bold hover:bg-white border border-gray-300 hover:border-gray-200 rounded-3xl "
                onClick={(e) => {
                  e.target.scrollIntoView({ behavior: "smooth", block: "end" });
                  setShowCoffee(false);
                }}
              >
                Close
              </button>
              <button
                className="transition-all duration-300 py-2 w-full font-bold rounded-3xl bg-[#c2410c] text-white  border border-gray-100 hover:bg-[#9e0a0a]"
                onClick={pay}
              >
                Support ₹{parseInt(coffees) * 50}
              </button>
            </div>
          </div>
        </div>
      </div>
      {/* thankyou toast */}
      <div
        className={`transition-all duration-500 ${
          thanks ? "translate-x-0" : "translate-x-[200%]"
        } select-none fixed right-2 top-2 flex flex-col gap-2 p-3 rounded-lg bg-white text-[#9e0a0a]`}
      >
        <p>
          {" "}
          You bought {name?name:username} {searchParams.get("count")}{" "}
          {searchParams.get("count") === "1" ? "Coffee" : "Coffees"}!
        </p>
        <p>Thank you for the support! 🎉</p>
      </div>
    </div>
  );
};

export default Donation;
