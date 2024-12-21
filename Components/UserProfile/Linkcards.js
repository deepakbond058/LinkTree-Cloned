"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { updatingUserLinks } from "@/actions/userActions";
const Linkcards = ({ email, linkArr }) => {
  const [linkArray, setLinkArray] = useState(linkArr);

  const updateLinksCount = (index) => {
    setLinkArray((oldStateValue) => {
      return oldStateValue.map((item, ind) => {
        if (index === ind) {
          return { ...item, clicks: item.clicks + 1 };
        } else {
          return item;
        }
      });
    });
  };

  useEffect(() => {
    updatingUserLinks(email, linkArray);
  }, [linkArray]);

  return (
    <ul className="w-full flex flex-col gap-3 text-center">
      {linkArray?.map((item, index) => {
        if (item.show && item.validLinkData && !item.archive) {
          return (
            <Link
              target="_blank"
              onClick={()=>{updateLinksCount(index)}}
              className="hover:text-[#9e0a0a] w-full border border-gray-100 hover:bg-gray-100 transition-all ease-in rounded-3xl py-3 md:py-5"
              key={index}
              href={item.url}
            >
              <li className="truncate w-4/5 mx-auto">{item.title}</li>
            </Link>
          );
        }
      })}
    </ul>
  );
};

export default Linkcards;
