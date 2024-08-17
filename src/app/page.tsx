
import React from "react";
import Post from "./components/post";
const intervals = [
  {
    id: "1w",
    name: "Every Week",
    cron: "0 0 * * 0",
  },
];
export default function Page() {
   
  return (
    <>
      <section className="pt-10 flex justify-center flex-col gap-6 mx-32 px-24">
        <h1 className="font-bold text-zinc-900 text-5xl ">Auction Cron Job</h1>
        <div>
          {" "}
          <span className="font-light text-md mb-8">
            Website created to display the last findings of the brazillian
            artist Chico da Silva.
          </span>
        </div>
        <div>
          {" "}
          <span className="font-light text-md mb-8">
            Created using Vercel app router api and Vercel cron job.
          </span>
        </div>
        <hr className="p-8"></hr>
      </section>

      <div className="mx-32">
        
          <Post />
       
      </div>
    </>
  );
}

