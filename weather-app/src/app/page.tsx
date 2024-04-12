import Navbar from "@/components/Navbar";
import SortData from "@/components/SortData";
import Data from "@/components/WeatherData";

export default function Home() {
  return (
    <div className="flex flex-col gap-4 bg-gray-100 min-h-screen">
      <Navbar />
      <SortData />
      <Data />
    </div>
  );
}
