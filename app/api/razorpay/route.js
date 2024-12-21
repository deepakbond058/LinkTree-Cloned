import { NextResponse } from "next/server";
import { validatePaymentVerification } from "razorpay/dist/utils/razorpay-utils";
import clientPromise from "@/lib/mongodb";
const client = await clientPromise;
const db = client.db("LinkTree");
const paymentCollection = db.collection("paymentData");

export const POST = async (req) => {
  let body = await req.formData();
  body = Object.fromEntries(body);
  //checing razorpay OID present on db
  const currentPaymentObj = await paymentCollection.findOne({
    orderID: body.razorpay_order_id,
  });

  if (!currentPaymentObj) {
    return NextResponse.json({ success: false, message: "Order ID not found" });
  }

  let razorverification = validatePaymentVerification(
    { order_id: body.razorpay_order_id, payment_id: body.razorpay_payment_id },
    body.razorpay_signature,
    process.env.KEY_SECRET
  );

  if (razorverification) {
    //update the payment status in db
    await paymentCollection.updateOne(
      { orderID: body.razorpay_order_id },
      {
        $set: { done: true },
      }
    );
    return NextResponse.redirect(
      `${process.env.NEXT_PUBLIC_HOST}/${currentPaymentObj.to_username}?paymentDone=true&count=${currentPaymentObj.amount/50}`
    );
  } else {
    return NextResponse.json({
      success: false,
      message: "Payment verificatio failed",
    });
  }
};
