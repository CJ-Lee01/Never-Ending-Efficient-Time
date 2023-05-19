"use client";
import Features from "@/components/Features";
import HeroSection from "@/components/HeroSection";

export default function Home() {
  return (
    <>
      <HeroSection />
      <Features />
    </>
  );
}

// const Home = () => {
//   return (
//     <section className='w-full flex-center flex-col'>
//       <h1 className="head_text text-center">Discover and Share</h1>
//     </section>
//   )
// }

// export default Home
