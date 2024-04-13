import CityContextProvider from "@/context/cityContext/CityContextProvider";
import WeatherContextProvider from "@/context/weatherContext/WeatherContextProvider";
import "./globals.css";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <WeatherContextProvider>
      <CityContextProvider>
        <html lang="en">
          <body>{children}</body>
        </html>
      </CityContextProvider>
    </WeatherContextProvider>
  );
}
