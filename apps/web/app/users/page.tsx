"use client";
import React, { Suspense, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Product } from "@entry/types";
import { Divide } from "lucide-react";
import { resolve } from "node:dns";

const page = () => {
  const router = useRouter();
  const [count, setCount] = useState(0);
  useEffect(() => {
    const p = new Promise((resolve, reject) => {
      setTimeout(() => {
        setCount(1);
        resolve(10);
      }, 100);
    }).then((res) => {
      setTimeout(() => {
        setCount(res);
      }, 200);
    });
  }, []);
  return (
    <div className="mt-24 flex items-center justify-center h-screen flex-col gap-5">
      this is the end: count: <p>{count}</p>
      <button
        onClick={() => router.push("/users/new")}
        className="flex mx-auto py-2 px-5 bg-red-600 text-white rounded-2xl"
      >
        Create new product
      </button>
    </div>
  );
};

export default page;
