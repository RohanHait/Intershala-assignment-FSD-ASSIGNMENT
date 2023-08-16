import axios from "axios";
import React, { useState } from "react";
import { GetUserContext } from "../App";
// import API from "../../config/apiConfig";
const MAX_WIDTH = 120;
const MAX_HEIGHT = 90;

function Signup() {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [cnfPsw, setCnfPsw] = useState("");
  const [pic, setPic] = useState();
  const [loading, setLoading] = useState(false);
  const [phoneNumber , setPhoneNumber ] = useState("") ;
  const {setUser} = GetUserContext() ;
  function calculateSize(img, maxWidth, maxHeight) {
    let width = img.width;
    let height = img.height;
  
    // calculate the width and height, constraining the proportions
    if (width > height) {
      if (width > maxWidth) {
        height = Math.round((height * maxWidth) / width);
        width = maxWidth;
      }
    } else {
      if (height > maxHeight) {
        width = Math.round((width * maxHeight) / height);
        height = maxHeight;
      }
    }
    return [width, height];
  }
  const postPicture = async (picture) => {
    setLoading(true);
    //chack the file is image or not
    if (!picture) return;
    if(picture.type.match(/image\/.*/).length === 0){
        console.warn('File format not supported')
        return;
    }
    // console.log(picture.type.match(/image\/.*/), picture.type);
    const blobURL = URL.createObjectURL(picture);
    const img = new Image();
    img.src = blobURL;
    
    img.onload = function (){
        // Calculate image size and Create canvas
        const [newWidth, newHeight] = calculateSize(img, MAX_WIDTH, MAX_HEIGHT);
        const canvas = document.createElement("canvas");
        canvas.width = newWidth;
        canvas.height = newHeight;
        const ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0, newWidth, newHeight);
        canvas.toBlob(
        (blob) => {
            // Handle the compressed image.
            const reader = new FileReader();
            reader.readAsDataURL(blob);
            reader.onloadend = async () => {
                console.log(reader.result);
                setPic(reader.result);
        };
        reader.onerror = () => {
            console.error("AHHHHHHHH!!");
            };
        },
        );
    } ;
    
    setLoading(false);
  };

  function handelsubmit(){
    if(password !== cnfPsw){
        console.log("password not match") ;
        return ;
    } 
    if(!name )
    {
        console.log("name is required");
        return ;
    }
    if(!email || !email.match(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g))
    {
        console.log("email is required");
        return ;
    }
    if(!phoneNumber || phoneNumber.match(/^\+?[1-9][0-9]{7,14}$/).length===0)
    {
        console.log("Please enter valid phone number");
    }
    const data = {
      name,
      email,
      password,
      phoneNumber ,
      profilePic: pic ,
    };
    axios.post("user/register", data).then((res) => {
        console.log(res.data);
        setUser(res.data);
        }
    ).catch((err) => {
        console.log(err.response.data);
    });

  }

  return (
    <>
      <form className="space-y-4" method="POST">
        <div>
          <div className="flex items-center justify-between">
            <label
              htmlFor="username"
              className="block text-sm font-medium leading-6 text-gray-800 "
            >
              Name
            </label>
          </div>
          <div className="">
            <input
              id="username"
              name="username"
              type="text"
              onChange={(e) => setName(e.target.value)}
              required
              className="block w-full rounded-md focus:outline-none  border-0 py-1.5 px-1 text-gray-900   shadow-sm ring-1 ring-inset ring-gray-300  placeholder:text-gray-400  focus:ring-2 focus:ring-inset focus:ring-slate-800 sm:text-sm sm:leading-6"
            />
          </div>
        </div>

        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium leading-6 text-gray-800 "
          >
            Email address
          </label>
          <div className="">
            <input
              id="email"
              name="email"
              type="email"
              onChange={(e) => setEmail(e.target.value)}
              required
              className="block w-full rounded-md focus:outline-none  border-0 py-1.5 px-1 text-gray-900   shadow-sm ring-1 ring-inset ring-gray-300  placeholder:text-gray-400  focus:ring-2 focus:ring-inset focus:ring-slate-800 sm:text-sm sm:leading-6"
            />
          </div>
        </div>
        
        <div>
          <label
            htmlFor="phone"
            className="block text-sm font-medium leading-6 text-gray-800 "
          >
            Phone NUmber
          </label>
          <div className="">
            <input
              id="phone"
              name="phone"
              type="text"
              onChange={(e) => setPhoneNumber(e.target.value.replace(/[^0-9+]/g,''))} 
              required
              value={phoneNumber}
              className="block w-full rounded-md focus:outline-none  border-0 py-1.5 px-1 text-gray-900   shadow-sm ring-1 ring-inset ring-gray-300  placeholder:text-gray-400  focus:ring-2 focus:ring-inset focus:ring-slate-800 sm:text-sm sm:leading-6"
            />
          </div>
        </div>


        <div>
          <div className="flex items-center justify-between">
            <label
              htmlFor="password"
              className="block text-sm font-medium leading-6 text-gray-800 "
            >
              Password
            </label>
          </div>
          <div className="">
            <input
              id="password"
              name="password"
              type="password"
              //   autoComplete="current-password"
              onChange={(e) => setPassword(e.target.value)}
              required
              className="block w-full rounded-md focus:outline-none  border-0 py-1.5 px-1 text-gray-900   shadow-sm ring-1 ring-inset ring-gray-300  placeholder:text-gray-400  focus:ring-2 focus:ring-inset focus:ring-slate-800 sm:text-sm sm:leading-6"
            />
          </div>
        </div>

        <div>
          <div className="flex items-center justify-between">
            <label
              htmlFor="confirmPassword"
              className="block text-sm font-medium leading-6 text-gray-800 "
            >
              Confirm Password
            </label>
          </div>
          <div className="mt">
            <input
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              onChange={(e) => setCnfPsw(e.target.value)}
              //   autoComplete="current-password"
              required
              className={`block w-full rounded-md focus:outline-none  border-0 py-1.5 px-1 text-gray-900   shadow-sm ring-1 ring-inset ring-gray-300  placeholder:text-gray-400  focus:ring-2 focus:ring-inset focus:ring-slate-800 sm:text-sm sm:leading-6 ${
                cnfPsw !== password
                  ? "ring-red-400 focus:ring-pink-600"
                  : "ring-gray-300 focus:ring-indigo-600"
              }`}
            />
          </div>
          {cnfPsw !== password && (
            <p className="block text-sm font-medium leading-6 text-red-600">
              *Confirm Password did not match the Password
            </p>
          )}
        </div>
        <div>
          <div className="flex items-center justify-between">
            <label
              htmlFor="profilePic"
              className="block text-sm font-medium leading-6 text-gray-800   "
            >
              Profile Picture
            </label>
          </div>
          <div className="mt">
            <input
              id="profilePic"
              name="profilePic"
              type="file"
              //   autoComplete="current-password"
              onChange={(e) => {
                postPicture(e.target.files[0]);
              }}
              accept="image/*"
              className="block w-full rounded-md focus:outline-none  border-0 py-1.5 px-1 text-gray-900   shadow-sm ring-1 ring-inset ring-gray-300  placeholder:text-gray-400  focus:ring-2 focus:ring-inset focus:ring-slate-800 sm:text-sm sm:leading-6 "
            />
          </div>
        </div>
        <div>
          <button
            type="submit"
            onClick={async (e) => {
                e.preventDefault();
                handelsubmit();
            }}
            disabled={loading}
            className={`flex w-full justify-center rounded-md ${
              loading ? "bg-indigo-300" : "bg-indigo-600"
            } px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm ${
              loading
                ? ""
                : "hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            }`}
          >
            {loading ? "...." : "Sign up"}
          </button>
        </div>
      </form>
    </>
  );
}

export default Signup ;
