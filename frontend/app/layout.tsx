import "./globals.css";
import { FormProvider } from "./context/FormContext";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <FormProvider>{children}</FormProvider>
      </body>
    </html>
  );
}
