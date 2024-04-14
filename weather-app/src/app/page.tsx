import Navbar from "@/components/Navbar";
import SortData from "@/components/SortData";
import Data from "@/components/WeatherData";

export default function Home() {
  return (
    <div className="flex bg-blue-400 flex-col gap-2 min-h-screen">
      <Navbar />
      <SortData />
      <Data />
    </div>
  );
}
