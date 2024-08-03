"use client";
import React from "react";
import useSWR from "swr";

interface Item {
  kind: string;
  title: string;
  link: string;
  snippet: string;
}

interface DataProps {
  items: Item[];
}
export const dynamic = "force-dynamic";
export default function Post() {
  const { data, error } = useSWR<DataProps>(
    `/api/data`,
    (url: string | URL | Request) => fetch(url).then((res) => res.json())
  );
  console.log("data", data);
  if (error) return <div>Failed to load</div>;
  if (!data)
    return (
      <div className="flex justify-between items-center border border-gray-100 shadow-md rounded-lg p-5">
        <div className="grid gap-3">
          <div className="bg-gray-200 animate-pulse rounded-md w-96 h-6" />
          <div className="bg-gray-200 animate-pulse rounded-md w-60 h-4" />
        </div>
        <div className="bg-gray-200 animate-pulse rounded-md w-28 h-4" />
      </div>
    );
  return (
    <>
      {data.items.length > 0 ? (
        <ul className=" ">
          {data.items.map((item, index: number) => (
            <li
              className="bg-zinc-100 my-4 flex justify-between items-center border border-gray-100 shadow-md rounded-lg p-5"
              key={index}
            >
              <div className="flex min-w-0 gap-x-4">
                <img
                  alt=""
                  src={item.title}
                  className="h-12 w-12 flex-none rounded-full bg-gray-50"
                />
                <div className="min-w-0 flex-auto">
                  <p className="text-sm font-semibold leading-6 text-gray-900">
                    {item.title}
                  </p>
                  <p className="mt-1 truncate text-xs leading-5 text-gray-500">
                    {item.title}
                  </p>
                </div>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p>No results found</p>
      )}
    </>
  );
}
