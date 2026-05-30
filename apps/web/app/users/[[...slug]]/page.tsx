import React from "react";
type props = {
  params?: Promise<{ slug: string[] }>;
};
const page = async ({ params }: props) => {
  const { slug } = await params;
  return (
    <div>
      {slug.map((sl) => (
        <li>{sl}</li>
      ))}
    </div>
  );
};

export default page;
