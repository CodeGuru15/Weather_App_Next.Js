import Navbar from "@/components/Navbar";
import Data from "@/components/WeatherData";

export default function Home() {
  return (
    <div className="flex flex-col gap-4 bg-gray-100 min-h-screen">
      <Navbar />
      <Data />
    </div>
  );
}
