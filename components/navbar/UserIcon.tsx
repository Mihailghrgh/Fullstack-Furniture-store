"use client";

import { LuUser } from "react-icons/lu";
import { useUser } from "@clerk/nextjs";

function UserIcon() {
  const user = useUser();
  const profileImage = user.user?.imageUrl;


  if (profileImage) {
    return (
      <img src={profileImage} className="w-6 h-6 rounded-full object-cover" />
    );
  }

  return <LuUser className="w-6 h-6 rounded-full ">UserIcon</LuUser>;
}
export default UserIcon;
