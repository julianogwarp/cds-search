"use client";
import React from "react";
import useSWR from "swr";
import { formatDistanceToNow } from "date-fns";

interface CseImg {
  src: string;
}
interface CseThumb {
  height: string;
  src: string;
  width: string;
}

interface MetaTags {
  [key: string]: string | undefined;
  ogDescription?: string;
  ogImage?: string;
  ogImageAlt?: string;
  ogImageHeight?: string;
  ogImageWidth?: string;
  ogSiteName?: string;
  ogTitle?: string;
  ogType?: string;
  ogUrl?: string;
  productAvailability?: string;
  productBrand?: string;
  productCategory?: string;
  productCondition?: string;
  productExpirationDate?: string;
  productItemGroupId?: string;
  productPriceAmount?: string;
  productPriceCurrency?: string;
  productRetailerItemId?: string;
  twitterImage?: string;
  viewport?: string;
}
interface Components {
  cse_image: CseImg[];
  cse_thumbnail: CseThumb[];
  metatags: MetaTags[];
}
interface Item {
  pagemap: Components;
  kind: string;
  title: string;
  link: string;
  snippet: string;
}
interface DataProps {
  items: Item[];
  fetchedAt: number;
  relativeTime: string;
}

export default function Post() {
  const { data, error } = useSWR<DataProps>(
    `/api/data`,
    (url: string | URL | Request) => fetch(url).then((res) => res.json())
  );

  if (error) return <div>Failed to load</div>;
  if (!data || !data.items)
    return (
      <div className="flex justify-between items-center border border-gray-100 shadow-md rounded-lg p-5">
        <div className="grid gap-3">
          <div className="bg-gray-200 animate-pulse rounded-md w-96 h-6" />
          <div className="bg-gray-200 animate-pulse rounded-md w-60 h-4" />
        </div>
        <div className="bg-gray-200 animate-pulse rounded-md w-28 h-4" />
      </div>
    );

  const { items, fetchedAt } = data;
  const relativeTime = formatDistanceToNow(new Date(fetchedAt), {
    addSuffix: true,
  });
  console.log("data", data);
  return (
    <div className="px-24 drop-shadow-sm">
      {items.length > 0 ? (
        <ul className=" ">
          {items.map((item, index: number) => (
            <li
              className="bg-white my-4 flex border border-gray-200  rounded-md p-5"
              key={index}
            >
              <div className="flex w-screen  gap-x-4 justify-center">
                <div className="flex border  rounded-sm border-indigo-600 p-8 filter items-center ">
                  {item.pagemap?.cse_image?.length > 0 && (
                    <img
                      className="object-cover max-w-32 max-h-32 grayscale"
                      src={item.pagemap.cse_image[0].src}
                      alt={item.title}
                      width="200"
                      height="200"
                    />
                  )}
                </div>
                <div className="min-w-0 flex-auto">
                  {item.pagemap?.metatags?.length > 0 && (
                    <div className="flex">
                      <div className="">
                        <p className="text-sm leading-6 text-gray-500">Title</p>
                        <p className="text-sm leading-6 text-gray-900">
                          {item.title.toLowerCase()}
                        </p>
                      </div>
                      <div className="px-4">
                        <p className="text-sm  leading-6 text-gray-500">
                          Brand
                        </p>
                        <p className="text-sm leading-6 text-gray-900">
                          {item.pagemap?.metatags?.[0]?.[
                            "product:brand"
                          ]?.toLowerCase()}
                        </p>
                      </div>
                    </div>
                  )}
                  {item.pagemap?.metatags?.length > 0 && (
                    <div className="max-w-lg">
                      <p className="text-sm leading-6 text-gray-500">
                        Description
                      </p>
                      <p className="text-sm leading-6 text-gray-900">
                        {item.pagemap?.metatags?.[0]?.[
                          "og:description"
                        ]?.toLowerCase()}
                      </p>
                    </div>
                  )}
                  {item.pagemap?.metatags?.length > 0 && (
                    <div>
                      <p className="text-sm leading-6 text-gray-500">Price</p>
                      <div className="flex">
                        <p className="text-sm leading-6 text-gray-900">
                          {
                            item.pagemap?.metatags?.[0]?.[
                              "product:price:currency"
                            ]
                          }
                        </p>
                        <p className="text-sm leading-6 text-gray-900">
                          {
                            item.pagemap?.metatags?.[0]?.[
                              "product:price:amount"
                            ]
                          }
                        </p>
                      </div>
                    </div>
                  )}
                </div>
                <div className="min-w-0 ">
                  <button
                    onClick={() =>
                      window.open("https://www.example.com", "_blank")
                    }
                    className="px-4 py-2 w-52 h-10 border rounded-md border-gray-200 text-black hover:bg-gray-100 focus:outline-none"
                  >
                    <p className="text-sm "> More Information</p>
                  </button>
                  <p className="text-gray-500 text-sm">
                    fetched {relativeTime}
                  </p>
                </div>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p>No results found</p>
      )}
    </div>
  );
}
