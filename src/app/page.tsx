import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Stay up-to-date with the latest industry news as our marketing teams finds new ways to re-purpose old CSS tricks articles.",
};

export default function Home() {
  return <main className="flex min-h-screen flex-col items-center justify-between p-24"></main>;
}
