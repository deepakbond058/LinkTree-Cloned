"use server";
import clientPromise from "@/lib/mongodb";
const client = await clientPromise;
const db = client.db("LinkTree");
const collection = db.collection("userData");
const paymentCollection = db.collection("paymentData");
import Razorpay from "razorpay";

export const initiate = async (to_username, paymentform) => {
  var instance = new Razorpay({
    key_id: process.env.KEY_ID,
    key_secret: process.env.KEY_SECRET,
  });
  const x = await instance.orders.create({
    amount: Number.parseInt(paymentform.amount),
    currency: "INR",
  });

  await paymentCollection.insertOne({
    orderID: x.id,
    to_username,
    done: false,
    ...paymentform,
    amount: paymentform.amount / 100,
  });
  return x;
};

export const fetchpayments = async (to_username) => {
  const doc = await paymentCollection
    .find({ to_username })
    .sort({ amount: -1 })
    .limit(20)
    .toArray();
  const paymentArr = [];
  for (const x of doc) {
    paymentArr.push({ ...x, _id: x._id.toString() });
  }
  return paymentArr;
};

export const checkUsernameAvailailty = async (usernameText) => {
  const user = await collection.findOne({ username: usernameText });
  return user ? true : false;
};

export const updatingUserData = async ({
  email,
  fullname,
  bio,
  profilepic,
}) => {
  const res = await collection.updateOne(
    { email },
    {
      $set: {
        fullname,
        bio,
        profilepic,
      },
    }
  );
  console.log(email, res);
};

export const updatingUserLinks = async (email, linkArr) => {
  await collection.updateOne(
    { email },
    {
      $set: {
        linkArr,
      },
    }
  );
};

export const fetchdatafromDB = async () => {
  const doc = await collection.find({}).toArray();
  const newArr = [];
  for (const x of doc) {
    newArr.push({ ...x, _id: x._id.toString() });
  }
  return newArr;
};

export const gettingUserLinks = async (email) => {
  const user = await collection.findOne({ email });
  return user?.linkArr;
};
