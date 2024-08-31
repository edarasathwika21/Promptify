"use client";

import Profile from "@components/Profile";
import { useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";

const UserProfile = ({params}) => {

    const searchParams=useSearchParams()
    const userName=searchParams.get("name")



  const [userPosts, setUserPosts] = useState([]);
  const fetchPosts = async () => {
    try {
      const response = await fetch(`/api/users/${params?.id}/posts`);
      const data = await response.json();
      setUserPosts(data);
    } catch (error) {
      console.error("Error fetching posts:", error);
      // Handle the error, e.g., set an error state or display a message
    }
  };
  useEffect(() => {
    if (params?.id) fetchPosts();
  }, [params.id]);


  return (
    <Profile
      name={userName}
      desc={`Welcome to ${userName} profile page`}
      data={userPosts}
    />
  );
};

export default UserProfile;
