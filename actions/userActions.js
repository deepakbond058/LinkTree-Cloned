"use server";
import clientPromise from "@/lib/mongodb";

const client = await clientPromise;
const db = client.db("LinkTree");
const collection = db.collection("userData");

export const checkUsernameAvailailty = async (usernameText) => {
  const user = await collection.findOne({ username: usernameText });
  return user?true:false;
};

export const updatingUserData = async ({email, fullname, bio, profilepic}) => {
  
  const res= await collection.updateOne(
    { email },
    {
      $set: {
        fullname,
        bio,
        profilepic,
      },
    }
  );
  console.log(email,res);
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

export const gettingUserLinks=async(email)=>{
  const user = await collection.findOne({ email});
  return user?.linkArr;
}


