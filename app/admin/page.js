"use client";
import { AdminContext } from "@/Components/Admin/AdminContext";
import { useSession } from "next-auth/react";
import { useEffect, useContext, useState } from "react";
import { gettingUserLinks } from "@/actions/userActions";

const Page = () => {
  const {
    linkArr,
    setLinkArr,
    userBiodata,
    setUserBiodata,
    userBiosaved,
    setUserBiosaved,
  } = useContext(AdminContext);

  const { data: session, status } = useSession();

  const [updatingArchive, setUpdatingArchive] = useState(false);

  const [initialDataLoader, setInitialDataLoader] = useState(false);

  const [biodataModal, setBiodataModal] = useState(false);
  const [showModalContent, setShowModalContent] = useState(false);

  const toggleBioModal = () => {
    if (biodataModal) {
      // Triggers exit animation
      setShowModalContent(false);
      setTimeout(() => {
        setBiodataModal(false);
      }, 300);
    } else {
      setBiodataModal(true);
      setTimeout(() => {
        setShowModalContent(true);
      }, 0); // Ensure content renders after modal mount
    }
  };

  const saveuserBiodata = async () => {
    toggleBioModal();
    //this will alert to save to db in the iframe
    setUserBiosaved(!userBiosaved);
  };

  const fetchInitialData = async () => {
    setInitialDataLoader(true);
    const initialLinkArr = await gettingUserLinks(session?.user.email);
    setInitialDataLoader(false);
    setLinkArr(initialLinkArr);
  };

  const addOneMoreLink = () => {
    const basicLinkObject = {
      title: "",
      url: "",
      clicks: 0,
      show: true,
      validLinkData: false,
      archive: false,
    };
    setLinkArr(linkArr ? linkArr.concat([basicLinkObject]) : [basicLinkObject]);
  };

  const archiveModalToggle = (index, type) => {
    if (type === "restore") {
      document.getElementById(`deleteModal-${index}`).className =
        "max-h-0 overflow-hidden duration-700";
    } else {
      document.getElementById(`restoreModal-${index}`).className =
        "max-h-0 overflow-hidden duration-700";
    }
    document
      .getElementById(`${type}Modal-${index}`)
      .classList.toggle("max-h-0");
    document
      .getElementById(`${type}Modal-${index}`)
      .classList.toggle("max-h-[200px]");
    document
      .getElementById(`${type}Modal-${index}`)
      .scrollIntoView({ behavior: "smooth", block: "center" });
  };

  const togglePencil = (e) => {
    const dataElement = e.currentTarget;
    const inputElement = e.currentTarget.nextSibling;

    dataElement.classList.toggle("flex");
    dataElement.classList.toggle("hidden");
    inputElement.classList.toggle("hidden");
    inputElement.focus();
  };

  const linkArrUpdater = (index, key, value) => {
    if (key === "deleteEntry") {
      setLinkArr((oldStateValue) => {
        return oldStateValue.filter((_, ind) => {
          return ind !== index;
        });
      });
    } else {
      setLinkArr((oldStateValue) => {
        return oldStateValue.map((item, ind) => {
          if (ind === index) {
            if (
              (key === "title" && value && item.url) ||
              (key === "url" && value && item.title)
            ) {
              return { ...item, [key]: value, validLinkData: true };
            } else if (key === "title" || key === "url") {
              return { ...item, [key]: value, validLinkData: false };
            } else return { ...item, [key]: value };
          } else return item;
        });
      });
    }
  };

  const toggleBlur = (e, index, key, value) => {
    const inputElement = e.currentTarget;
    const dataElement = e.currentTarget.previousSibling;
    linkArrUpdater(index, key, value);
    //this doesnt work as each object is unique even when holding same keys and valuw
    // setLinkArr([...linkArr, { ...linkArr[index], [key]: value }]);

    inputElement.classList.toggle("hidden");
    dataElement.classList.toggle("flex");
    dataElement.classList.toggle("hidden");
  };

  useEffect(() => {
    if (status === "authenticated") {
      setUserBiodata({
        fullname: session?.user.name
          ? session?.user.name
          : "@" + session?.user.username,
        profilepic:
          session?.user.image === process.env.NEXT_PUBLIC_PIC
            ? ""
            : session?.user.image,
        bio: session?.user.bio,
      });
    }
  }, [session]);
  //session is updated multiple times even afer authentiated but status not after getting authentiated

  useEffect(() => {
    if (status === "authenticated") {
      fetchInitialData();
    }
  }, [status]);

  return (
    <div id="mainElementparent">
      {!updatingArchive && (
        <div className="flex flex-col gap-5 ">
          {/* user profile input tab */}
          <div className="w-full flex justify-between items-center mt-5">
            <div className="w-[calc(100%-4rem)] flex items-center gap-3">
              <div
                className="w-16 relative cursor-pointer"
                onClick={toggleBioModal}
              >
                <img
                  className="aspect-square w-16 object-cover object-top rounded-full"
                  src={session?.user.image}
                  alt="user photo"
                />
                <div className="p-1 bg-white rounded-full absolute bottom-0 right-0">
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    role="img"
                  >
                    <title>Edit</title>
                    <path
                      fillRule="evenodd"
                      d="M2 14v-2.3l7.5-7.5 2.3 2.3L4.3 14H2Zm10.5-8.2 1.3-1.3-2.3-2.3-1.3 1.3 2.3 2.3Zm-1.35-4.65-10 10-.15.35v3l.5.5h3l.35-.15 10-10v-.7l-3-3h-.7Z"
                      fill="currentColor"
                    ></path>
                  </svg>
                </div>
              </div>

              <div className="w-[calc(100%-5rem)] flex flex-col gap-4">
                <div>
                  <div
                    className="w-fit max-w-[80%] truncate font-semibold hover:underline cursor-pointer"
                    onClick={toggleBioModal}
                  >
                    {userBiodata?.fullname
                      ? userBiodata?.fullname
                      : `@${session?.user.username}`}
                  </div>

                  <div
                    className="w-fit max-w-[80%] truncate hover:underline text-[#a8aaa2] cursor-pointer"
                    onClick={toggleBioModal}
                  >
                    {userBiodata?.bio ? userBiodata?.bio : "Add bio"}
                  </div>
                </div>

                <div className="flex gap-4 text-[#a8aaa2] ">
                  <div className="relative cursor-pointer">
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      role="img"
                    >
                      <path
                        fill="currentColor"
                        d="M21.94 7.71a7.33 7.33 0 0 0-.46-2.4 4.62 4.62 0 0 0-1.1-1.69 4.61 4.61 0 0 0-1.7-1.1 7.32 7.32 0 0 0-2.4-.45C15.19 2 14.83 2 12 2s-3.19.01-4.29.06a7.33 7.33 0 0 0-2.4.46 4.62 4.62 0 0 0-1.69 1.1 4.61 4.61 0 0 0-1.1 1.7 7.32 7.32 0 0 0-.46 2.39C2.01 8.81 2 9.18 2 12s.01 3.19.06 4.29a7.33 7.33 0 0 0 .46 2.4 4.62 4.62 0 0 0 1.1 1.69 4.61 4.61 0 0 0 1.7 1.1 7.32 7.32 0 0 0 2.4.45c1.1.05 1.46.07 4.28.07s3.19-.02 4.3-.07a7.33 7.33 0 0 0 2.38-.45 4.9 4.9 0 0 0 2.8-2.8 7.32 7.32 0 0 0 .46-2.4c.05-1.1.06-1.47.06-4.29s-.01-3.18-.06-4.28Zm-1 8.53a6.35 6.35 0 0 1-.39 2.08 3.9 3.9 0 0 1-2.23 2.23 6.36 6.36 0 0 1-2.08.39c-1.08.05-1.44.06-4.24.06s-3.16-.01-4.24-.06a6.35 6.35 0 0 1-2.08-.39 3.63 3.63 0 0 1-1.35-.88 3.63 3.63 0 0 1-.88-1.35 6.36 6.36 0 0 1-.39-2.08C3.01 15.16 3 14.8 3 12s.01-3.16.06-4.24a6.35 6.35 0 0 1 .39-2.08 3.63 3.63 0 0 1 .88-1.35 3.63 3.63 0 0 1 1.35-.88 6.36 6.36 0 0 1 2.08-.39C8.84 3.01 9.2 3 12 3s3.16.01 4.24.06a6.35 6.35 0 0 1 2.08.39 3.63 3.63 0 0 1 1.35.88 3.63 3.63 0 0 1 .88 1.35 6.36 6.36 0 0 1 .39 2.08C20.99 8.84 21 9.2 21 12s-.01 3.16-.06 4.24Z"
                      ></path>
                      <path
                        fill="currentColor"
                        d="M17.58 5.47a.95.95 0 1 0 .95.95.95.95 0 0 0-.95-.95ZM12 7.07A4.93 4.93 0 1 0 16.93 12 4.93 4.93 0 0 0 12 7.07Zm0 8.86A3.93 3.93 0 1 1 15.93 12 3.93 3.93 0 0 1 12 15.93Z"
                      ></path>
                    </svg>
                    <div className="absolute top-0 right-0 bg-white p-1 translate-x-1/2 -translate-y-1/2 rounded-full">
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 16 16"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-[7px] h-[7px]"
                        role="img"
                      >
                        <title id="ltclid318_title">Add</title>
                        <path
                          d="M7.5 8.5V16H8.5V8.5H16V7.5H8.5V0H7.5V7.5H0V8.5H7.5Z"
                          fill="currentColor"
                        ></path>
                      </svg>
                    </div>
                  </div>
                  <div className="relative cursor-pointer">
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      role="img"
                    >
                      <path
                        fill="currentColor"
                        d="M9.37,23.5a7.468,7.468,0,0,1,0-14.936.537.537,0,0,1,.538.5v3.8a.542.542,0,0,1-.5.5,2.671,2.671,0,1,0,2.645,2.669.432.432,0,0,1,0-.05V1a.5.5,0,0,1,.5-.5h3.787a.5.5,0,0,1,.5.5A4.759,4.759,0,0,0,21.59,5.76a.5.5,0,0,1,.5.5L22.1,10a.533.533,0,0,1-.519.515,9.427,9.427,0,0,1-4.741-1.268v6.789A7.476,7.476,0,0,1,9.37,23.5ZM8.908,9.585a6.466,6.466,0,1,0,6.93,6.447V8.326a.5.5,0,0,1,.791-.407A8.441,8.441,0,0,0,21.1,9.5l-.006-2.76A5.761,5.761,0,0,1,15.859,1.5H13.051V16.032a.458.458,0,0,1,0,.053,3.672,3.672,0,1,1-4.14-3.695Z"
                      ></path>
                    </svg>
                    <div className="absolute top-0 right-0 bg-white p-1 translate-x-1/2 -translate-y-1/2 rounded-full">
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 16 16"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-[7px] h-[7px]"
                        role="img"
                      >
                        <title id="ltclid318_title">Add</title>
                        <path
                          d="M7.5 8.5V16H8.5V8.5H16V7.5H8.5V0H7.5V7.5H0V8.5H7.5Z"
                          fill="currentColor"
                        ></path>
                      </svg>
                    </div>
                  </div>
                  <div className="relative cursor-pointer">
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      role="img"
                    >
                      <path
                        fill="currentColor"
                        d="M12,20.55c-.3,0-7.279-.006-9.115-.5A3.375,3.375,0,0,1,.5,17.665,29.809,29.809,0,0,1,0,12,29.824,29.824,0,0,1,.5,6.334,3.375,3.375,0,0,1,2.885,3.948c1.836-.492,8.819-.5,9.115-.5s7.279.006,9.115.5A3.384,3.384,0,0,1,23.5,6.334,29.97,29.97,0,0,1,24,12a29.97,29.97,0,0,1-.5,5.666,3.384,3.384,0,0,1-2.388,2.386C19.279,20.544,12.3,20.55,12,20.55Zm0-16.1c-.072,0-7.146.006-8.857.464A2.377,2.377,0,0,0,1.464,6.593,29.566,29.566,0,0,0,1,12a29.566,29.566,0,0,0,.464,5.407,2.377,2.377,0,0,0,1.679,1.679c1.711.458,8.785.464,8.857.464s7.146-.006,8.857-.464a2.377,2.377,0,0,0,1.679-1.679A29.66,29.66,0,0,0,23,12a29.66,29.66,0,0,0-.464-5.407h0a2.377,2.377,0,0,0-1.679-1.679C19.146,4.456,12.071,4.45,12,4.45ZM9.7,15.95a.5.5,0,0,1-.5-.5V8.55a.5.5,0,0,1,.75-.433l5.975,3.45a.5.5,0,0,1,0,.866L9.95,15.883A.5.5,0,0,1,9.7,15.95Zm.5-6.534v5.168L14.675,12Z"
                      ></path>
                    </svg>
                    <div className="absolute top-0 right-0 bg-white p-1 translate-x-1/2 -translate-y-1/2 rounded-full">
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 16 16"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-[7px] h-[7px]"
                        role="img"
                      >
                        <title id="ltclid318_title">Add</title>
                        <path
                          d="M7.5 8.5V16H8.5V8.5H16V7.5H8.5V0H7.5V7.5H0V8.5H7.5Z"
                          fill="currentColor"
                        ></path>
                      </svg>
                    </div>
                  </div>
                  <div className="relative cursor-pointer">
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      role="img"
                    >
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M20.13 5.00024H3.86998L12 11.8466L20.13 5.00024ZM3 5.57497V19.0002H21V5.57497L12.3221 12.8827H11.6779L3 5.57497ZM2 4.00024H3H21H22V5.00024V19.0002V20.0002H21H3H2V19.0002V5.00024V4.00024Z"
                        fill="currentColor"
                      ></path>
                    </svg>
                    <div className="absolute top-0 right-0 bg-white p-1 translate-x-1/2 -translate-y-1/2 rounded-full">
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 16 16"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-[7px] h-[7px]"
                        role="img"
                      >
                        <title id="ltclid318_title">Add</title>
                        <path
                          d="M7.5 8.5V16H8.5V8.5H16V7.5H8.5V0H7.5V7.5H0V8.5H7.5Z"
                          fill="currentColor"
                        ></path>
                      </svg>
                    </div>
                  </div>
                  <div className="bg-[#e0e2d9] h-6 aspect-square rounded-full flex items-center justify-center cursor-pointer">
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 16 16"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className="text-black w-[7px] h-[7px] "
                      role="img"
                    >
                      <title id="ltclid318_title">Add</title>
                      <path
                        d="M7.5 8.5V16H8.5V8.5H16V7.5H8.5V0H7.5V7.5H0V8.5H7.5Z"
                        fill="currentColor"
                      ></path>
                    </svg>
                  </div>
                </div>
              </div>
            </div>

            <div
              className=" bg-[#e0e2d9] p-3 rounded-full items-center justify-center cursor-pointer"
              onClick={toggleBioModal}
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className=" "
                role="img"
              >
                <title id="ltclid319_title">Lock</title>
                <circle cx="2" cy="8" r="1.3" fill="black"></circle>
                <circle cx="8" cy="8" r="1.3" fill="black"></circle>
                <circle cx="14" cy="8" r="1.3" fill="black"></circle>
              </svg>
            </div>
          </div>

          {/* Add data button */}
          <button
            onClick={addOneMoreLink}
            className="p-3 flex gap-2 items-center justify-center text-white font-bold rounded-full w-full bg-[rgb(129,41,217)] hover:bg-[rgb(93,24,162)]"
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className=" "
              role="img"
            >
              <path
                d="M7.5 8.5V16H8.5V8.5H16V7.5H8.5V0H7.5V7.5H0V8.5H7.5Z"
                fill="currentColor"
              ></path>
            </svg>
            <span>Add</span>
          </button>

          {/* more buttons */}
          <div className="flex justify-between text-sm">
            <div className="cursor-pointer flex gap-2 rounded-full items-center border p-3 hover:bg-white">
              <svg
                className="mr-xs"
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M0.5 -0.000244141H0V0.999755L0.5 0.999756L15.4999 0.999775L15.9999 0.999776L15.9999 -0.000224382L15.4999 -0.000225008L0.5 -0.000244141ZM0.500074 3.99976L7.37309e-05 4.49975L0 15.4998L0.5 15.9998H15.5L16 15.4998V4.49977L15.5 3.99977L0.500074 3.99976ZM1 14.9998L1.00007 4.99976L15 4.99977V14.9998H1Z"
                  fill="black"
                ></path>
              </svg>
              <span>Add collection</span>
            </div>
            <div
              onClick={() => {
                setUpdatingArchive(true);
                document
                  .getElementById("mainElementparent")
                  .scrollIntoView({ behavior: "smooth", block: "start" });
              }}
              className="cursor-pointer flex group gap-2 rounded-full items-center"
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className=" "
                role="img"
              >
                <title id="ltclid65_title">Archive</title>
                <path
                  stroke="currentColor"
                  d="M1.65 4.25v10.67h12.7c-.02-3.55 0-7.11 0-10.67M15.5 1.08H.5v2.88h15V1.08ZM5 6.5h6"
                ></path>
              </svg>
              <span className="group-hover:underline">View archive</span>
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className=" -rotate-90 "
                role="img"
              >
                <title id="ltclid66_title">Chevron</title>
                <desc id="ltclid66_desc">Chevron pointing right</desc>
                <path
                  fill="currentColor"
                  d="m1.7 4 .36.35L7.71 10l5.64-5.65.36-.35.7.7-.35.36-6 6h-.7l-6-6L1 4.71 1.7 4Z"
                ></path>
              </svg>
            </div>
          </div>

          {/* card for individual links */}
          {initialDataLoader ? (
            <img
              className="invert h-14 w-14 self-center"
              src="/loader.gif"
              alt="loader"
            />
          ) : (
            linkArr?.map((item, index) => {
              return (
                !item.archive && (
                  <div
                    key={index}
                    className="rounded-3xl text-[#676b5f] text-sm bg-white overflow-hidden"
                  >
                    <div className="flex w-full p-2">
                      <div className="flex justify-center items-center">
                        <svg
                          width="16"
                          height="16"
                          viewBox="0 0 16 16"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                          className=" "
                          role="img"
                        >
                          <title id="ltclid69_title">Move</title>
                          <path
                            fill="currentColor"
                            d="M5 4a1 1 0 1 0 0-2 1 1 0 0 0 0 2Zm1 4a1 1 0 1 1-2 0 1 1 0 0 1 2 0Zm0 5a1 1 0 1 1-2 0 1 1 0 0 1 2 0Zm6-5a1 1 0 1 1-2 0 1 1 0 0 1 2 0Zm-1 6a1 1 0 1 0 0-2 1 1 0 0 0 0 2Zm1-11a1 1 0 1 1-2 0 1 1 0 0 1 2 0Z"
                          ></path>
                        </svg>
                      </div>
                      {/* 1 rem is width of mover svg */}
                      <div className="flex gap-2 flex-col w-full max-w-[calc(100%-1rem)] p-3">
                        <div className="flex justify-between items-center w-full">
                          {/* 2.5rem svg+0.5rem gap */}
                          <div className="flex flex-col w-[calc(100%-3rem)] gap-2">
                            <div className="font-semibold w-4/5">
                              <div
                                className="cursor-pointer max-w-full w-fit flex gap-2"
                                onClick={togglePencil}
                              >
                                {/* 1 rem svg +0.5 rem gap */}
                                {item.title.length ? (
                                  <p className="text-black truncate w-[calc(100%-1.5rem)]">
                                    {item.title}
                                  </p>
                                ) : (
                                  <p>Title</p>
                                )}
                                <svg
                                  width="16"
                                  height="16"
                                  viewBox="0 0 16 16"
                                  fill="none"
                                  xmlns="http://www.w3.org/2000/svg"
                                  className=" "
                                  role="img"
                                >
                                  <path
                                    fillRule="evenodd"
                                    d="M2 14v-2.3l7.5-7.5 2.3 2.3L4.3 14H2Zm10.5-8.2 1.3-1.3-2.3-2.3-1.3 1.3 2.3 2.3Zm-1.35-4.65-10 10-.15.35v3l.5.5h3l.35-.15 10-10v-.7l-3-3h-.7Z"
                                    fill="currentColor"
                                  ></path>
                                </svg>
                              </div>

                              <input
                                className=" text-black w-full bg-inherit hidden border-none p-0 m-0 outline-none"
                                type="text"
                                name="title"
                                defaultValue={item.title}
                                onBlur={(e) => {
                                  toggleBlur(
                                    e,
                                    index,
                                    e.target.name,
                                    e.target.value
                                  );
                                }}
                              />
                            </div>

                            <div className="w-4/5">
                              <div
                                className="cursor-pointer max-w-full w-fit flex gap-2"
                                onClick={togglePencil}
                              >
                                {item.url.length ? (
                                  <p className="text-black truncate max-w-[calc(100%-1.5rem)]">
                                    {item.url}
                                  </p>
                                ) : (
                                  <p>URL</p>
                                )}
                                <svg
                                  width="16"
                                  height="16"
                                  viewBox="0 0 16 16"
                                  fill="none"
                                  xmlns="http://www.w3.org/2000/svg"
                                  className=" "
                                  role="img"
                                >
                                  <path
                                    fillRule="evenodd"
                                    d="M2 14v-2.3l7.5-7.5 2.3 2.3L4.3 14H2Zm10.5-8.2 1.3-1.3-2.3-2.3-1.3 1.3 2.3 2.3Zm-1.35-4.65-10 10-.15.35v3l.5.5h3l.35-.15 10-10v-.7l-3-3h-.7Z"
                                    fill="currentColor"
                                  ></path>
                                </svg>
                              </div>

                              <input
                                className="text-black w-full bg-inherit hidden border-none p-0 m-0 outline-none"
                                type="text"
                                required
                                name="url"
                                defaultValue={item.url}
                                onBlur={(e) => {
                                  toggleBlur(
                                    e,
                                    index,
                                    e.target.name,
                                    e.target.value
                                  );
                                }}
                              />
                            </div>
                          </div>

                          <label className="cursor-pointer">
                            <input
                              type="checkbox"
                              defaultChecked={item.show}
                              onChange={(e) => {
                                linkArrUpdater(
                                  index,
                                  "show",
                                  e.currentTarget.checked
                                );
                              }}
                              //as the value is passed after it is changed , .checked boolean is used
                              className="sr-only peer"
                              disabled={!(item.title && item.url)}
                            />
                            <div className="relative w-10 h-5 transition-all peer-disabled:bg-gray-300 bg-green-700 rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-0  after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-900"></div>
                          </label>
                        </div>
                        <div className="flex justify-between items-center">
                          <div className="p-2 hover:bg-[#f3f3f1] rounded-xl flex items-center gap-2">
                            <svg
                              width="16"
                              height="16"
                              viewBox="0 0 16 16"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                              className=" "
                              role="img"
                            >
                              <path
                                d="m11 1-1 1v2H6L5 5v2H1L0 8v6l1 1h4l.5-.5.5.5h4l.5-.5.5.5h4l1-1V2l-1-1zm0 13h4V2h-4v11zm-1-9H6v9h4V6zM4 8h1v6H1V8h1z"
                                fill="currentColor"
                                fillRule="evenodd"
                              ></path>
                            </svg>
                            <span>{item.clicks} clicks</span>
                          </div>

                          <label
                            className="relative focus:text-white"
                            title="Delete"
                          >
                            <input
                              type="checkbox"
                              id={`deleteCheck-${index}`}
                              className="sr-only peer"
                              onChange={() => {
                                const modal = document.getElementById(
                                  `deletePermissionModal-${index}`
                                );
                                modal.scrollIntoView({
                                  behavior: "smooth",
                                  block: "center",
                                });
                                modal.classList.toggle("max-h-0");
                                modal.classList.toggle("max-h-[300px]");
                              }}
                            />
                            <svg
                              width="16"
                              height="16"
                              viewBox="0 0 16 16"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                              className="p-2 box-content rounded-xl hover:bg-[#f3f3f1] duration-700 cursor-pointer peer-checked:bg-[#8129d9] peer-checked:text-white"
                              role="img"
                            >
                              <path
                                fillRule="evenodd"
                                d="m6.83 0-.35.15-1.33 1.33-.15.35V3H0v1h2v11.5l.5.5h11l.5-.5V4h2V3h-5V1.83l-.15-.35L9.52.15 9.17 0H6.83ZM10 3v-.96L8.96 1H7.04L6 2.04V3h4ZM5 4H3v11h10V4H5Zm2 3v5H6V7h1Zm3 .5V7H9v5h1V7.5Z"
                                fill="currentColor"
                              ></path>
                            </svg>
                          </label>
                        </div>
                      </div>
                    </div>

                    {/* delete modal dropdown */}
                    <div
                      id={`deletePermissionModal-${index}`}
                      className=" max-h-0 overflow-hidden duration-700"
                    >
                      <div className="text-center text-black font-semibold py-2 relative bg-[#e0e2d9]">
                        <span>Delete</span>
                        <button className="absolute right-2 top-1/2 -translate-y-1/2 cursor-pointer rounded-lg focus:border-[#1b1d1a] border-2 border-transparent active:bg-white">
                          <svg
                            width="16"
                            height="16"
                            viewBox="0 0 16 16"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                            className=""
                            role="img"
                            onClick={() => {
                              document.getElementById(
                                `deleteCheck-${index}`
                              ).checked = false;
                              document
                                .getElementById(
                                  `deletePermissionModal-${index}`
                                )
                                .classList.toggle("max-h-0");
                              document
                                .getElementById(
                                  `deletePermissionModal-${index}`
                                )
                                .classList.toggle("max-h-[300px]");
                            }}
                          >
                            <title id="ltclid166_title">Close</title>
                            <path
                              fill="currentColor"
                              d="m13.63 3.12.37-.38-.74-.74-.38.37.75.75ZM2.37 12.89l-.37.37.74.74.38-.37-.75-.75Zm.75-10.52L2.74 2 2 2.74l.37.38.75-.75Zm9.76 11.26.38.37.74-.74-.37-.38-.75.75Zm0-11.26L2.38 12.9l.74.74 10.5-10.51-.74-.75Zm-10.5.75 10.5 10.5.75-.73L3.12 2.37l-.75.75Z"
                            ></path>
                          </svg>
                        </button>
                      </div>

                      <div className="flex gap-4 bg-white p-4 pt-8">
                        <div className="flex flex-col gap-2 items-center w-1/3">
                          <button
                            className="flex gap-2 items-center justify-center rounded-full text-black text-base px-4 py-3 w-full font-bold border-2 border-[#f6f7f5] hover:bg-[#f6f7f5]"
                            onClick={() => {
                              linkArrUpdater(index, "deleteEntry");

                              document.getElementById(
                                `deleteCheck-${index}`
                              ).checked = false;
                              document
                                .getElementById(
                                  `deletePermissionModal-${index}`
                                )
                                .classList.toggle("max-h-0");
                              document
                                .getElementById(
                                  `deletePermissionModal-${index}`
                                )
                                .classList.toggle("max-h-[300px]");
                            }}
                          >
                            <svg
                              width="16"
                              height="16"
                              viewBox="0 0 16 16"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                              role="img"
                            >
                              <path
                                fillRule="evenodd"
                                d="m6.83 0-.35.15-1.33 1.33-.15.35V3H0v1h2v11.5l.5.5h11l.5-.5V4h2V3h-5V1.83l-.15-.35L9.52.15 9.17 0H6.83ZM10 3v-.96L8.96 1H7.04L6 2.04V3h4ZM5 4H3v11h10V4H5Zm2 3v5H6V7h1Zm3 .5V7H9v5h1V7.5Z"
                                fill="currentColor"
                              ></path>
                            </svg>
                            <span> Delete</span>
                          </button>
                          <span className="w-4/5 text-center">
                            Delete forever.
                          </span>
                        </div>

                        <div className="flex flex-col gap-2 items-center w-2/3">
                          <button
                            className="px-4 py-3 font-bold justify-center items-center border-2 border-transparent text-base flex w-full gap-2 text-white rounded-full bg-[#8129d9] hover:bg-[#5d18a2]"
                            onClick={() =>
                              linkArrUpdater(index, "archive", true)
                            }
                          >
                            <svg
                              width="16"
                              height="16"
                              viewBox="0 0 16 16"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                              role="img"
                            >
                              <path
                                stroke="currentColor"
                                d="M1.65 4.25v10.67h12.7c-.02-3.55 0-7.11 0-10.67M15.5 1.08H.5v2.88h15V1.08Z"
                              ></path>
                              <path
                                stroke="currentColor"
                                d="M10.62 8.88 8.3 11.2 6 8.9m2.3 1.76V6"
                              ></path>
                            </svg>
                            <span>Archive</span>
                          </button>
                          <span className="w-4/5 text-center">
                            Reduce clutter, keep your analytics and restore
                            anytime.
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                )
              );
            })
          )}
        </div>
      )}

      {/* archive main content */}
      {updatingArchive && (
        <div className="flex flex-col gap-3">
          {/* back button */}
          <div className="relative text-[#212529] font-medium text-sm my-6">
            <div className="absolute inset-0  flex justify-center items-center ">
              Archive
            </div>
            <div
              className="flex relative gap-2 items-center cursor-pointer group w-fit"
              onClick={() => {
                document
                  .getElementById("mainElementparent")
                  .scrollIntoView({ behavior: "smooth", block: "start" });
                setUpdatingArchive(false);
              }}
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className=" rotate-90 "
                role="img"
              >
                <path
                  fill="currentColor"
                  d="m1.7 4 .36.35L7.71 10l5.64-5.65.36-.35.7.7-.35.36-6 6h-.7l-6-6L1 4.71 1.7 4Z"
                ></path>
              </svg>
              <span className="group-hover:underline">Back</span>
            </div>
          </div>

          {/* archive item card */}
          {linkArr?.map((item, index) => {
            return (
              item.archive && (
                <div
                  key={index}
                  className="transition-all text-[#676b5f] text-sm bg-white rounded-3xl overflow-hidden"
                >
                  <div className="flex items-center justify-between w-full p-4">
                    <div className="flex flex-col gap-2 max-w-[calc(100%-8rem)] w-fit">
                      <div className="truncate w-full text-black">
                        {item.title}
                      </div>
                      <div className="truncate w-full">{item.url}</div>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        className="py-1 px-2 hover:bg-gray-100 rounded-lg cursor-pointer active:text-white active:bg-[#8129d9]"
                        title={`${item.clicks} clicks`}
                      >
                        <svg
                          width="16"
                          height="16"
                          viewBox="0 0 16 16"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                          className=" "
                          role="img"
                        >
                          <path
                            d="m11 1-1 1v2H6L5 5v2H1L0 8v6l1 1h4l.5-.5.5.5h4l.5-.5.5.5h4l1-1V2l-1-1zm0 13h4V2h-4v11zm-1-9H6v9h4V6zM4 8h1v6H1V8h1z"
                            fill="currentColor"
                            fillRule="evenodd"
                          ></path>
                        </svg>
                      </button>
                      <button
                        className="py-1 px-2 hover:bg-gray-100 rounded-lg cursor-pointer active:text-white active:bg-[#8129d9] hover:duration-0 duration-700 focus:duration-700"
                        title="Restore"
                        onClick={() => {
                          archiveModalToggle(index, "restore");
                        }}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          role="img"
                          fill="currentColor"
                          viewBox="0 0 16 16"
                          width="16px"
                          height="16px"
                        >
                          <title></title>
                          <svg
                            width="16"
                            height="16"
                            viewBox="0 0 16 16"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                            className=" "
                            role="img"
                          >
                            <path
                              stroke="currentColor"
                              d="M1.65 4.25v10.67h12.7c-.02-3.55 0-7.11 0-10.67M15.5 1.08H.5v2.88h15V1.08Z"
                            ></path>
                            <path
                              stroke="currentColor"
                              d="M5.7 9.15 8 6.85l2.3 2.3M8 7.4v4.65"
                            ></path>
                          </svg>
                        </svg>
                      </button>
                      <button
                        className="py-1 px-2 hover:bg-gray-100 rounded-lg cursor-pointer active:text-white active:bg-[#8129d9] hover:duration-0 duration-700 focus:duration-700"
                        title="Delete"
                        onClick={() => {
                          archiveModalToggle(index, "delete");
                        }}
                      >
                        <svg
                          width="16"
                          height="16"
                          viewBox="0 0 16 16"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                          className=" "
                          role="img"
                        >
                          <path
                            fillRule="evenodd"
                            d="m6.83 0-.35.15-1.33 1.33-.15.35V3H0v1h2v11.5l.5.5h11l.5-.5V4h2V3h-5V1.83l-.15-.35L9.52.15 9.17 0H6.83ZM10 3v-.96L8.96 1H7.04L6 2.04V3h4ZM5 4H3v11h10V4H5Zm2 3v5H6V7h1Zm3 .5V7H9v5h1V7.5Z"
                            fill="currentColor"
                          ></path>
                        </svg>
                      </button>
                    </div>
                  </div>
                  {/* delete modal dropdown */}
                  <div
                    id={`deleteModal-${index}`}
                    className=" max-h-0 overflow-hidden duration-700"
                  >
                    <div className="text-center text-black font-semibold py-2 relative bg-[#e0e2d9]">
                      <span>Delete</span>
                      <button className="absolute right-2 top-1/2 -translate-y-1/2 cursor-pointer rounded-lg focus:border-[#1b1d1a] border-2 border-transparent active:bg-white">
                        <svg
                          width="16"
                          height="16"
                          viewBox="0 0 16 16"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                          className=""
                          role="img"
                          onClick={() => {
                            archiveModalToggle(index, "delete");
                          }}
                        >
                          <title id="ltclid166_title">Close</title>
                          <path
                            fill="currentColor"
                            d="m13.63 3.12.37-.38-.74-.74-.38.37.75.75ZM2.37 12.89l-.37.37.74.74.38-.37-.75-.75Zm.75-10.52L2.74 2 2 2.74l.37.38.75-.75Zm9.76 11.26.38.37.74-.74-.37-.38-.75.75Zm0-11.26L2.38 12.9l.74.74 10.5-10.51-.74-.75Zm-10.5.75 10.5 10.5.75-.73L3.12 2.37l-.75.75Z"
                          ></path>
                        </svg>
                      </button>
                    </div>
                    <div className="flex flex-col gap-4 bg-white p-4">
                      <div className="text-center">
                        Permanently delete this link and its analytics data?
                      </div>
                      <div className="flex gap-4">
                        <button
                          className="rounded-full text-black text-base px-4 py-3 w-full font-bold border-2 border-[#f6f7f5] hover:bg-[#f6f7f5]"
                          onClick={() => {
                            archiveModalToggle(index, "delete");
                          }}
                        >
                          Cancel
                        </button>

                        <button
                          className="px-4 py-3 font-bold justify-center border-2 border-transparent items-center text-base flex w-full gap-2 text-white rounded-full bg-[#8129d9] hover:bg-[#5d18a2]"
                          onClick={() => {
                            linkArrUpdater(index, "deleteEntry");
                          }}
                        >
                          <svg
                            width="16"
                            height="16"
                            viewBox="0 0 16 16"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                            className=" "
                            role="img"
                          >
                            <path
                              fillRule="evenodd"
                              d="m6.83 0-.35.15-1.33 1.33-.15.35V3H0v1h2v11.5l.5.5h11l.5-.5V4h2V3h-5V1.83l-.15-.35L9.52.15 9.17 0H6.83ZM10 3v-.96L8.96 1H7.04L6 2.04V3h4ZM5 4H3v11h10V4H5Zm2 3v5H6V7h1Zm3 .5V7H9v5h1V7.5Z"
                              fill="currentColor"
                            ></path>
                          </svg>
                          <span>Delete</span>
                        </button>
                      </div>
                    </div>
                  </div>
                  {/* restore modal dropdown */}
                  <div
                    id={`restoreModal-${index}`}
                    className=" max-h-0 overflow-hidden duration-700"
                  >
                    <div className="text-center text-black font-semibold py-2 relative bg-[#e0e2d9]">
                      <span>Restore</span>
                      <button className="absolute right-2 top-1/2 -translate-y-1/2 cursor-pointer rounded-lg focus:border-[#1b1d1a] border-2 border-transparent active:bg-white">
                        <svg
                          width="16"
                          height="16"
                          viewBox="0 0 16 16"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                          className=""
                          role="img"
                          onClick={() => {
                            archiveModalToggle(index, "restore");
                          }}
                        >
                          <title id="ltclid166_title">Close</title>
                          <path
                            fill="currentColor"
                            d="m13.63 3.12.37-.38-.74-.74-.38.37.75.75ZM2.37 12.89l-.37.37.74.74.38-.37-.75-.75Zm.75-10.52L2.74 2 2 2.74l.37.38.75-.75Zm9.76 11.26.38.37.74-.74-.37-.38-.75.75Zm0-11.26L2.38 12.9l.74.74 10.5-10.51-.74-.75Zm-10.5.75 10.5 10.5.75-.73L3.12 2.37l-.75.75Z"
                          ></path>
                        </svg>
                      </button>
                    </div>
                    <div className="flex flex-col gap-4 bg-white p-4">
                      <div className="text-center">
                        Restore this link to your Linktree
                      </div>
                      <div className="flex gap-4">
                        <button
                          className="rounded-full text-black text-base px-4 py-3 w-full font-bold border-2 border-[#f6f7f5] hover:bg-[#f6f7f5]"
                          onClick={() => {
                            archiveModalToggle(index, "restore");
                          }}
                        >
                          Cancel
                        </button>

                        <button
                          className="px-4 py-3 font-bold border-2 border-transparent justify-center items-center text-base flex w-full gap-2 text-white rounded-full bg-[#8129d9] hover:bg-[#5d18a2]"
                          onClick={() => {
                            linkArrUpdater(index, "archive", false);
                          }}
                        >
                          <svg
                            width="16"
                            height="16"
                            viewBox="0 0 16 16"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                            role="img"
                          >
                            <path
                              stroke="currentColor"
                              d="M1.65 4.25v10.67h12.7c-.02-3.55 0-7.11 0-10.67M15.5 1.08H.5v2.88h15V1.08Z"
                            ></path>
                            <path
                              stroke="currentColor"
                              d="M5.7 9.15 8 6.85l2.3 2.3M8 7.4v4.65"
                            ></path>
                          </svg>
                          <span>Restore</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )
            );
          })}
        </div>
      )}

      {/* modal for biodata input kept outside to avoid flex from giving gap */}
      {biodataModal && (
        <div>
          {/* Background Overlay */}
          <div
            className={`fixed inset-0 bg-black transition-all duration-300 z-40 ${
              showModalContent ? "bg-opacity-50" : "bg-opacity-0"
            }`}
          ></div>

          {/* Modal Container */}
          <div
            className={`fixed inset-0 flex items-center justify-center z-50`}
          >
            <div
              className={`w-[90%] flex gap-3 flex-col max-w-lg bg-white p-5 pt-3 rounded-3xl shadow-lg transform transition-transform duration-300 ${
                showModalContent
                  ? "translate-y-0 scale-100"
                  : "-translate-y-96 scale-0"
              }`}
            >
              <div className="relative mb-4">
                <h2 className=" font-semibold  text-center">
                  Update your Personal Data
                </h2>
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="box-content p-2 hover:bg-[#f3f3f1] absolute top-1/2 right-0 -translate-y-1/2 rounded-xl"
                  role="img"
                  onClick={toggleBioModal}
                >
                  <title id="ltclid139_title">Close</title>
                  <path
                    fill="currentColor"
                    d="m13.63 3.12.37-.38-.74-.74-.38.37.75.75ZM2.37 12.89l-.37.37.74.74.38-.37-.75-.75Zm.75-10.52L2.74 2 2 2.74l.37.38.75-.75Zm9.76 11.26.38.37.74-.74-.37-.38-.75.75Zm0-11.26L2.38 12.9l.74.74 10.5-10.51-.74-.75Zm-10.5.75 10.5 10.5.75-.73L3.12 2.37l-.75.75Z"
                  ></path>
                </svg>
              </div>

              <div>
                <div className="relative w-full">
                  <input
                    type="text"
                    id="profileTitle"
                    defaultValue={
                      userBiodata?.fullname
                        ? userBiodata?.fullname
                        : `@${session?.user.username}`
                    }
                    onChange={(e) => {
                      setUserBiodata({
                        ...userBiodata,
                        fullname: e.target.value.trim(),
                      });
                    }}
                    className={`transition-all peer w-full appearance-none border-0 rounded-lg  bg-gray-100  hover:ring-2 ring-gray-300 px-2.5 pb-2 pt-6 text-sm text-gray-900  focus:outline-1  outline-offset-1 focus:outline-offset-4 outline-gray-900
                    ${
                      userBiodata?.fullname.length > 30
                        ? "ring-2 ring-red-600"
                        : "ring-0 focus:ring-0"
                    }`}
                    placeholder=" "
                  />
                  <label
                    htmlFor="profileTitle"
                    className="absolute left-1 top-5 px-2 text-sm text-gray-500 transform scale-75 -translate-y-4 origin-[0] cursor-text select-none transition-all duration-300 peer-placeholder-shown:top-1/2 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-focus:top-5 peer-focus:scale-75 peer-focus:-translate-y-4"
                  >
                    Profile Title
                  </label>
                </div>
                {userBiodata?.fullname.length > 30 && (
                  <span className="text-red-600 pl-3 text-sm">
                    Title cannot be longer than 30 characters
                  </span>
                )}
              </div>

              <div className="relative w-full">
                <input
                  type="text"
                  id="profilePic"
                  defaultValue={userBiodata?.profilepic}
                  onChange={(e) => {
                    setUserBiodata({
                      ...userBiodata,
                      profilepic: e.target.value.trim(),
                    });
                  }}
                  className={`transition-all peer w-full appearance-none border-0 rounded-lg bg-gray-100 hover:ring-2 ring-gray-300 px-2.5 pb-2 pt-6 text-sm text-gray-900 focus:outline-1 focus:ring-0 outline-offset-1 focus:outline-offset-4 outline-gray-900`}
                  placeholder=" "
                />
                <label
                  htmlFor="profilePic"
                  className="absolute left-1 top-5 px-2 text-sm text-gray-500 transform scale-75 -translate-y-4 origin-[0] cursor-text select-none transition-all duration-300 peer-placeholder-shown:top-1/2 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-focus:top-5 peer-focus:scale-75 peer-focus:-translate-y-4"
                >
                  Picture Url
                </label>
              </div>

              <div>
                <div className="relative w-full">
                  <textarea
                    id="profileBio"
                    defaultValue={userBiodata?.bio}
                    onChange={(e) => {
                      setUserBiodata({
                        ...userBiodata,
                        bio: e.target.value.trim(),
                      });
                    }}
                    className={`transition-all peer w-full appearance-none border-0 rounded-lg  bg-gray-100  hover:ring-2 ring-gray-300 px-2.5 pb-2 pt-6 text-sm text-gray-900  focus:outline-1  outline-offset-1 focus:outline-offset-4 outline-gray-900
                    ${
                      userBiodata?.bio.length > 80
                        ? "ring-2 ring-red-600"
                        : "ring-0 focus:ring-0"
                    }`}
                    placeholder=" "
                  />
                  <label
                    htmlFor="profileBio"
                    className="absolute left-1 top-5 px-2 text-sm text-gray-500 transform scale-75 -translate-y-4 origin-[0] cursor-text select-none transition-all duration-300 peer-placeholder-shown:top-1/2 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-focus:top-5 peer-focus:scale-75 peer-focus:-translate-y-4"
                  >
                    Bio
                  </label>
                </div>
                {userBiodata?.bio.length > 80 && (
                  <div className="text-red-600 text-sm">
                    <div className="pl-3">
                      Bio cannot be longer than 80 characters
                    </div>
                    <div className="text-end">{`${userBiodata?.bio.length} / 80`}</div>
                  </div>
                )}
              </div>

              <button
                className="p-3 flex gap-2 items-center justify-center text-white font-semibold rounded-full w-full bg-[rgb(129,41,217)] hover:bg-[rgb(93,24,162)] disabled:bg-[#e0e2d9] disabled:text-[#a8aaa2]"
                onClick={saveuserBiodata}
                disabled={
                  userBiodata?.fullname.length > 30 ||
                  userBiodata?.bio.length > 80
                }
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Page;
