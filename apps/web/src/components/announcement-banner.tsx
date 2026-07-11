"use client";
import { useState } from "react";
import Link from "next/link";

export default function AnnouncementBanner() {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  return (
    <div className="sticky top-0 z-50 relative isolate flex flex-col items-center gap-3 overflow-hidden bg-gray-900/80 px-4 py-3 after:pointer-events-none after:absolute after:inset-x-0 after:bottom-0 after:h-px after:bg-white/10 sm:flex-row sm:gap-x-6 sm:px-6 sm:py-3.5 sm:before:flex-1">
      <div
        aria-hidden="true"
        className="absolute top-1/2 left-[max(-7rem,calc(50%-52rem))] -z-10 -translate-y-1/2 transform-gpu blur-2xl"
      >
        <div
          style={{
            clipPath:
              "polygon(74.8% 41.9%, 97.2% 73.2%, 100% 34.9%, 92.5% 0.4%, 87.5% 0%, 75% 28.6%, 58.5% 54.6%, 50.1% 56.8%, 46.9% 44%, 48.3% 17.4%, 24.7% 53.9%, 0% 27.9%, 11.9% 74.2%, 24.9% 54.1%, 68.6% 100%, 74.8% 41.9%)",
          }}
          className="aspect-[577/310] w-[36rem] bg-gradient-to-r from-[#ff80b5] to-[#9089fc] opacity-40 sm:w-[72rem] lg:w-[144.25rem]"
        />
      </div>
      <div
        aria-hidden="true"
        className="absolute top-1/2 left-[max(45rem,calc(50%+8rem))] -z-10 -translate-y-1/2 transform-gpu blur-2xl hidden sm:block"
      >
        <div
          style={{
            clipPath:
              "polygon(74.8% 41.9%, 97.2% 73.2%, 100% 34.9%, 92.5% 0.4%, 87.5% 0%, 75% 28.6%, 58.5% 54.6%, 50.1% 56.8%, 46.9% 44%, 48.3% 17.4%, 24.7% 53.9%, 0% 27.9%, 11.9% 74.2%, 24.9% 54.1%, 68.6% 100%, 74.8% 41.9%)",
          }}
          className="aspect-[577/310] w-[72rem] bg-gradient-to-r from-[#ff80b5] to-[#9089fc] opacity-40 lg:w-[144.25rem]"
        />
      </div>

      {/* content + dismiss row */}
      <div className="flex w-full items-start justify-between gap-3 sm:w-auto sm:flex-1 sm:items-center sm:justify-center">
        <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2 text-center sm:text-left">
          <p className="text-sm/6 text-gray-100">
            <strong className="font-semibold">Rtecn</strong>
            <svg
              viewBox="0 0 2 2"
              aria-hidden="true"
              className="mx-2 hidden size-0.5 fill-current sm:inline"
            >
              <circle r="1" cx="1" cy="1" />
            </svg>
            <span className="block sm:inline">
              Check out our new rich text editor components for shadcn/ui!
            </span>
          </p>
          <Link
            href="https://rtecn.space"
            target="_blank"
            className="flex-none rounded-full bg-white/10 px-3.5 py-1 text-sm font-semibold text-white shadow-sm ring-1 ring-white/20 transition-colors hover:bg-white/15 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
          >
            Learn more <span aria-hidden="true">&rarr;</span>
          </Link>
        </div>

        {/* dismiss button: stays inline on mobile, absolute-free */}
        <button
          type="button"
          onClick={() => setIsVisible(false)}
          className="-m-2 flex-none p-2 focus-visible:-outline-offset-4 sm:hidden"
        >
          <span className="sr-only">Dismiss</span>
          <svg
            viewBox="0 0 20 20"
            fill="currentColor"
            aria-hidden="true"
            className="size-5 text-gray-100"
          >
            <path d="M6.28 5.22a.75.75 0 0 0-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 1 0 1.06 1.06L10 11.06l3.72 3.72a.75.75 0 1 0 1.06-1.06L11.06 10l3.72-3.72a.75.75 0 0 0-1.06-1.06L10 8.94 6.28 5.22Z" />
          </svg>
        </button>
      </div>

      {/* desktop dismiss button, right-aligned per original layout */}
      <div className="hidden flex-1 justify-end sm:flex">
        <button
          type="button"
          onClick={() => setIsVisible(false)}
          className="-m-3 p-3 focus-visible:-outline-offset-4"
        >
          <span className="sr-only">Dismiss</span>
          <svg
            viewBox="0 0 20 20"
            fill="currentColor"
            aria-hidden="true"
            className="size-5 text-gray-100"
          >
            <path d="M6.28 5.22a.75.75 0 0 0-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 1 0 1.06 1.06L10 11.06l3.72 3.72a.75.75 0 1 0 1.06-1.06L11.06 10l3.72-3.72a.75.75 0 0 0-1.06-1.06L10 8.94 6.28 5.22Z" />
          </svg>
        </button>
      </div>
    </div>
  );
}
