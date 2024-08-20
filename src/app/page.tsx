"use client";
import React, { useEffect, useState } from "react";
import Post from "./components/post";

export default function Page() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedImage(null);
  };

  const handleOutsideClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (event.target === event.currentTarget) {
      handleCloseModal();
    }
  };

  useEffect(() => {
    const handleEscKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        handleCloseModal();
      }
    };

    if (isModalOpen) {
      document.addEventListener("keydown", handleEscKey);
    } else {
      document.removeEventListener("keydown", handleEscKey);
    }

    return () => {
      document.removeEventListener("keydown", handleEscKey);
    };
  }, [isModalOpen]);

  return (
    <>
      <section className="pt-10 flex justify-center flex-col gap-2 px-4 md:px-24">
        <h1 className="font-bold text-zinc-900 text-xl md:text-xl">
          Chico da Silva / Auction Cron Job
        </h1>
        <div>
          <span className="font-light text-sm md:text-md text-zinc-500">
            Website created to display the last google search findings of the
            Brazilian artist Chico da Silva. The job runs every week.
          </span>
        </div>
        <div>
          <span className="font-light text-sm md:text-md mb-4 text-zinc-500">
            Created using Next.js app router, Vercel cron job, Vercel KV, React,
            and Tailwind CSS.
          </span>
        </div>
        <hr className="my-4" />
      </section>
      <div>
        <Post
          onImageClick={(src: string) => {
            setSelectedImage(src);
            setIsModalOpen(true);
          }}
        />
      </div>
      {isModalOpen && selectedImage && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
          onClick={handleOutsideClick}
        >
          <div className="relative bg-white p-4 rounded-lg shadow-lg max-w-xs md:max-w-md">
            <button
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-800"
              onClick={handleCloseModal}
            >
              &times;
            </button>
            <img
              src={selectedImage}
              alt="Selected"
              className="max-w-full max-h-full"
            />
          </div>
        </div>
      )}
    </>
  );
}
