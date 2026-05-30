import Link from "next/link";
import React from "react";

const page = async () => {
  const res = await fetch("http://localhost:8000/api/productss").then((r) =>
    r.json(),
  );
  const product = res.products;
  return (
    <div className="flex items-center justify-center h-screen flex-col gap-5">
      new user <br />
      <Link href="/users" className="text-blue-400 underline">
        users
      </Link>
      <div className="flex flex-col gap-2">
        {product.map((p) => (
          <div>{p.name}</div>
        ))}
      </div>
    </div>
  );
};

export default page;
