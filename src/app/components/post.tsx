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
  formattedUrl: any;
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

interface PostProps {
  onImageClick: (src: string) => void;
}
export default function Post({ onImageClick }: PostProps) {
  const { data, error } = useSWR<DataProps>(
    `/api/data`,
    (url: string | URL | Request) => fetch(url).then((res) => res.json())
  );
  console.log("data", data);
  if (error) return;
  if (!data || !data.items)
    return (
      <ul className="px-4 drop-shadow-sm">
        {Array.from({ length: 3 }).map((_, index) => (
          <li
            key={index}
            className="bg-white my-4 flex flex-col md:flex-row border border-gray-200 rounded-md p-5 animate-pulse"
          >
            <div className="flex w-full md:w-screen gap-x-4 justify-center">
              <div className="flex border rounded-sm border-indigo-600 p-8 filter items-center">
                <div className="object-cover max-w-32 max-h-32 bg-gray-200 h-32 w-32"></div>
              </div>
              <div className="min-w-0 flex-auto">
                <div className="flex">
                  <div className="flex-1">
                    <div className="bg-gray-200 h-4 rounded-md mb-2 w-48"></div>
                    <div className="bg-gray-200 h-4 rounded-md w-36"></div>
                  </div>
                  <div className="px-4 flex-1">
                    <div className="bg-gray-200 h-4 rounded-md mb-2 w-32"></div>
                    <div className="bg-gray-200 h-4 rounded-md w-24"></div>
                  </div>
                </div>
                <div className="max-w-lg">
                  <div className="bg-gray-200 h-4 rounded-md mb-2 w-full"></div>
                  <div className="bg-gray-200 h-4 rounded-md w-3/4"></div>
                </div>
                <div>
                  <div className="bg-gray-200 h-4 rounded-md mb-2 w-20"></div>
                  <div className="bg-gray-200 h-4 rounded-md w-16"></div>
                </div>
              </div>
              <div className="min-w-0 flex flex-col justify-between items-end">
                <div className="bg-gray-200 h-4 w-52 rounded-md"></div>
                <div className="bg-gray-200 h-4 rounded-md w-28 mt-4"></div>
              </div>
            </div>
          </li>
        ))}
      </ul>
    );

  const { items, fetchedAt } = data;
  const relativeTime = formatDistanceToNow(new Date(fetchedAt), {
    addSuffix: true,
  });
  const filteredItems = items.filter((item) =>
    item.title.toLowerCase().includes("chico")
  );

  return (
    <div className="px-4 md:px-24 drop-shadow-sm">
      {filteredItems.length > 0 ? (
        <ul>
          {filteredItems.map((item, index: number) => (
            <li
              className="bg-white my-4 flex flex-col md:flex-row border border-gray-200 rounded-md p-5"
              key={index}
            >
              <div className="flex flex-col md:flex-row w-full gap-x-4 justify-center">
                <div className="flex border rounded-sm border-indigo-600 p-8 justify-center filter items-center mb-4 md:mb-0">
                  {item.pagemap?.cse_image?.length > 0 && (
                    <img
                      className="object-cover max-w-full md:max-w-32 max-h-32 grayscale cursor-pointer hover:grayscale-0"
                      src={item.pagemap.cse_image[0].src}
                      alt={item.title}
                      width="200"
                      height="200"
                      onClick={() =>
                        onImageClick(item.pagemap.cse_image[0].src)
                      }
                    />
                  )}
                </div>
                <div className="max-w-full md:max-w-max flex-auto mb-4 md:mb-0">
                  {item.pagemap?.metatags?.length > 0 &&
                    !item.title.includes("chico") && (
                      <div className="flex">
                        <div className="">
                          <p className="text-sm leading-6 text-gray-500 ">
                            Title
                          </p>
                          <p className="text-sm leading-6 text-gray-900">
                            {item.title.toLowerCase()}
                          </p>
                        </div>
                      </div>
                    )}
                  {item.pagemap?.metatags?.length > 0 && (
                    <div className="max-w-full md:max-w-lg">
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
                        <span className="m-1">{""} </span>
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
                <div className="flex-auto md:pl-16 mb-4 md:mb-0">
                  <p className="text-sm leading-6 text-gray-500">
                    Auction House
                  </p>
                  <p className="text-sm leading-6 text-gray-900">
                    {item.pagemap?.metatags?.[0]?.[
                      "product:brand"
                    ]?.toLowerCase()}
                  </p>
                </div>
                <div className="min-w-0  justify-center md:justify-end">
                  <button
                    onClick={() =>
                      window.open(`${item.formattedUrl}`, "_blank")
                    }
                    className="px-4 py-2 w-full md:w-52 h-10 border rounded-md border-gray-200 text-black hover:bg-gray-100 focus:outline-none"
                  >
                    <p className="text-sm "> More Information</p>
                  </button>
                  <p className="flex justify-center text-gray-500 text-sm pt-2">
                    Fetched {relativeTime}
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
