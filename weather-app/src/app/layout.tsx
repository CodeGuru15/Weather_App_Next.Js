import CityContextProvider from "@/context/cityContex/CityContextProvider";
import "./globals.css";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <CityContextProvider>
      <html lang="en">
        <body>{children}</body>
      </html>
    </CityContextProvider>
  );
}
