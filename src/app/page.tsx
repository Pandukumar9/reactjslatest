import Image from "next/image";
// import { Mainsection } from "./components/mainsection";

export default function Home() {
  return (
    <>
      <h2 className="text-2xl font-bold text-center mt-10">

      Welcome to the Next.js App with Tailwind CSS!
      <Image
        src="/nextjs-logo.png"
        alt="Next.js Logo"
        width={100}
        height={100}
        className="mx-auto mt-5"
      />
    </h2>
    <h4 className="text-lg text-center mt-5">
      This is a simple example of a Next.js application styled with Tailwind CSS.
    </h4>
    {/* <Mainsection /> */}
    </>
  );
}
