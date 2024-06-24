'use client'

import React, { useEffect, useState } from "react";
import Label from "@/components/Label";
import Avatar from "@/shared/Avatar";
import ButtonPrimary from "@/shared/ButtonPrimary";
import Input from "@/shared/Input";
import Select from "@/shared/Select";
import Textarea from "@/shared/Textarea";
import { useSession } from "next-auth/react";
import avatar1 from "@/images/avatars/Image-1.png";
import { ref, uploadBytes, listAll, getDownloadURL } from 'firebase/storage'
import { storage } from 'firebaseSdk'
import { v4 } from 'uuid'

const AccountPage = () => {
  const { data: session, status } = useSession();

  const email = session?.user?.email || "******@gmail.com";
  
  const [userData, setUserData] = useState({
    name: '',
    phone: '',
    gender: '',
    bio: '',
    username: '',
    dob: '1990-07-22',
    address: '',
    profile: '',
  });

  const [profilePreview, setProfilePreview] = useState(avatar1);

  const { name, phone, gender, bio, username, dob, address, profile } = userData;

  useEffect(() => {
    const fetchData = async () => {
      if (session) {
        const response = await fetch('/api/fetchinfo', {
          cache: 'no-store',
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email }),
        });

        const data = await response.json();

        console.log(data);
        const user = data?.user || null;
        setUserData({
          name: user?.name || '',
          phone: user?.contactNumber || '',
          gender: user?.gender || '',
          bio: user?.bio || '',
          username: user?.username || '',
          dob: user?.dob || '1990-07-22',
          address: user?.address || '',
          profile: user?.profilePicture || '',
        });
        setProfilePreview(user?.profilePicture || avatar1);
      }
    };
    fetchData();
  }, [session]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData({
      ...userData,
      [name]: value,
    });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setUserData({
          ...userData,
          profile: reader.result,
        });
        setProfilePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const updateInfo = async (event) => {
    event.preventDefault();
    try {
      const imageref = ref(storage, `profilepictures/${email}/${v4()}`)
      await uploadBytes(imageref, userData.profile)
      const downloadURL = await getDownloadURL(imageref)
      const response = await fetch('/api/updateinfo', {
        cache: 'no-store',
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          name,
          phone,
          gender,
          bio,
          username,
          dob,
          address,
          profile: downloadURL ? downloadURL : '',
        }),
      });
      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="space-y-6 sm:space-y-8">
      <h2 className="text-3xl font-semibold">Account information</h2>
      <div className="w-14 border-b border-neutral-200 dark:border-neutral-700"></div>
      <div className="flex flex-col md:flex-row">
        <div className="flex-shrink-0 flex items-start">
          <div className="relative rounded-full overflow-hidden flex">
            <Avatar  imgUrl={profilePreview} sizeClass="w-32 h-32" />
            <div className="absolute inset-0 bg-black bg-opacity-60 flex flex-col items-center justify-center text-neutral-50 cursor-pointer">
              <svg
                width="30"
                height="30"
                viewBox="0 0 30 30"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M17.5 5H7.5C6.83696 5 6.20107 5.26339 5.73223 5.73223C5.26339 6.20107 5 6.83696 5 7.5V20M5 20V22.5C5 23.163 5.26339 23.7989 5.73223 24.2678C6.20107 24.7366 6.83696 25 7.5 25H22.5C23.163 25 23.7989 24.7366 24.2678 24.2678C24.7366 23.7989 25 23.163 25 22.5V17.5M5 20L10.7325 14.2675C11.2013 13.7988 11.8371 13.5355 12.5 13.5355C13.1629 13.5355 13.7987 13.7988 14.2675 14.2675L17.5 17.5M25 12.5V17.5M25 17.5L23.0175 15.5175C22.5487 15.0488 21.9129 14.7855 21.25 14.7855C20.5871 14.7855 19.9513 15.0488 19.4825 15.5175L17.5 17.5M17.5 17.5L20 20M22.5 5H27.5M25 2.5V7.5M17.5 10H17.5125"
                  stroke="currentColor"
                  strokeWidth={1.5}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <span className="mt-1 text-xs">Change Image</span>
            </div>
            <input
              type="file"
              className="absolute inset-0 opacity-0 cursor-pointer"
              onChange={handleFileChange}
            />
          </div>
        </div>
        <div className="flex-grow mt-10 md:mt-0 md:pl-16 max-w-3xl space-y-6">
          <div>
            <Label>Name</Label>
            <Input
              name="name"
              className="mt-1.5"
              value={userData.name}
              onChange={handleChange}
              accept="image/jpeg, image/png"
            />
          </div>
          <div>
            <Label>Gender</Label>
            <Select
              name="gender"
              className="mt-1.5"
              value={userData.gender}
              onChange={handleChange}
            >
              <option value='select'>Select</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </Select>
          </div>
          <div>
            <Label>Username</Label>
            <Input
              name="username"
              className="mt-1.5"
              value={userData.username}
              onChange={handleChange}
            />
          </div>
          <div>
            <Label>Email</Label>
            <Input
              name="email"
              disabled={true}
              className="mt-1.5"
              value={email}
            />
          </div>
          <div className="max-w-lg">
            <Label>Date of birth</Label>
            <Input
              name="dob"
              className="mt-1.5"
              type="date"
              value={userData.dob}
              onChange={handleChange}
            />
          </div>
          <div>
            <Label>Address</Label>
            <Input
              name="address"
              className="mt-1.5"
              value={userData.address}
              onChange={handleChange}
            />
          </div>
          <div>
            <Label>Phone number</Label>
            <Input
              name="phone"
              className="mt-1.5"
              value={userData.phone}
              onChange={handleChange}
            />
          </div>
          <div>
            <Label>About you</Label>
            <Textarea
              name="bio"
              className="mt-1.5"
              value={userData.bio}
              onChange={handleChange}
            />
          </div>
          <div className="pt-2">
            <ButtonPrimary onClick={updateInfo}>Update info</ButtonPrimary>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccountPage;
