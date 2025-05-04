"use client";

import React, { useEffect, useState } from "react";
import { useThemeStore } from "@/store";
import { createClient } from "@/utils/supabase/client";
import TextEditor from "@/components/TextEditor";

const AddBlog = () => {
  const [blog, setBlog] = useState({
    title: "",
    category: "category",
    thumbnail: "",
    body: "",
  });

  const [blogBody, setBlogBody] = useState("");

  const [categories, setCategories] = useState([]);
  const theme = useThemeStore((state) => state.theme);
  const [user, setUser] = useState({});

  const getCategories = async () => {
    const response = await fetch("/api/categories");
    const data = await response.json();
    setCategories(data.categories);
  };

  const addBlog = async () => {
    if (
      !blog.title ||
      blog.category == "category" ||
      !blog.thumbnail ||
      !blog.body
    ) {
      alert("Please fill all the fields!");
      return;
    }

    const response = await fetch("/api/blogs", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(blog),
    });

    if (response.ok) {
      setBlog({ title: "", category: "category", thumbnail: "", body: "" });
      setBlogBody("");
      alert("Blog added successfully!");
    }
  };

  const getUserNow = async () => {
    const supabase = createClient();
    const myUser = await supabase.auth.getUser();
    setBlog((prevState) => ({ ...prevState, author: myUser.data.user.id }));
    setUser(myUser.data.user);
  };

  useEffect(() => {
    getCategories();
    getUserNow();
  }, []);

  useEffect(() => {
    setBlog((prevState) => ({ ...prevState, body: blogBody }));
  }, [blogBody]);

  return (
    <div
      className={`w-full flex flex-col items-center ${theme ? "bg-[#181A2A] text-white" : "bg-white text-[#232536]"}`}
    >
      <h1 className="mt-[50px] text-[48px] leading-[64px] font-bold">
        Write a new blog
      </h1>
      <form className="w-fit flex flex-col items-center">
        <input
          value={blog.title}
          onChange={(e) =>
            setBlog((prevState) => ({ ...prevState, title: e.target.value }))
          }
          placeholder="Add title for blog"
          className="w-[700px] mt-[50px] px-[20px] py-[20px] text-[16px] leading-[28px] text-[#232536] border-[2px] border-gray-500 rounded-[5px]"
        />
        <div className="relative">
          <select
            onChange={(e) =>
              setBlog((prevState) => ({
                ...prevState,
                category: e.target.value,
              }))
            }
            className="appearance-none w-[700px] text-[#232536] mt-[20px] px-[20px] py-[20px] border-[2px] border-gray-500 rounded-[5px] shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-[16px] leading-[28px] bg-white"
            defaultValue={blog.category}
          >
            <option value="category" disabled>
              Select category
            </option>
            {categories?.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
          <div className="pointer-events-none absolute inset-y-0 top-[20px] right-[20px] flex items-center text-gray-500">
            ▼
          </div>
        </div>

        <input
          value={blog.thumbnail}
          onChange={(e) =>
            setBlog((prevState) => ({
              ...prevState,
              thumbnail: e.target.value,
            }))
          }
          placeholder="Add thumbnail image"
          className="w-[700px] mt-[20px] pl-[20px] py-[20px] text-[16px] leading-[28px] text-[#232536] border-[2px] border-gray-500 rounded-[5px]"
        />

        {/* <textarea
          value={blog.body}
          onChange={(e) =>
            setBlog((prevState) => ({ ...prevState, body: e.target.value }))
          }
          placeholder="Add blog body"
          className="w-[700px] h-[350px] mt-[20px] px-[30px] py-[30px] text-[16px] leading-[28px] text-[#232536] border-[2px] border-gray-500 rounded-[5px]"
        /> */}

        <TextEditor setBlogBody={setBlogBody} />

        <button
          onClick={addBlog}
          type="button"
          className="w-full my-[40px] py-[20px] bg-[#FFD050] text-[#232536] text-[24px] leading-[32px] font-bold"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default AddBlog;
