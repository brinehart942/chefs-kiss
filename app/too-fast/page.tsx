import React from "react";

const Page = () => {
  return (
    <main className="root-container flex min-h-screen flex-col items-center justify-center">
      <h1 className="font-bebas-neaue text-5xl font-bold text-light-100">
        Woah... Slow down there!
      </h1>
      <p className="mt-3 max-w-xl text-center text-light-400">
        Looks like you've been a bit too eager. We've put a temporary pause on
        your excitement. Chill for a bit and try again later!
      </p>
    </main>
  );
};

export default Page;
