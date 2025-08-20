import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/providers/theme-provider";
import { Toaster } from "@/components/ui/sonner";
import AuthStoreProvider from "@/providers/auth-store-provider";
import { cookies } from "next/headers";
import ReactQueryProvider from "@/providers/react-query-provider";
import { authMe, authPermissions } from "@/actions/auth-action";
import { useAuthStore } from "@/stores/auth-store";
import AuthInitializer from "@/components/common/auth-initializer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  let user = null;

  const cookiesStore = await cookies();
  const access_token = cookiesStore.get("access_token")
    ? cookiesStore.get("access_token")
    : "";

  try {
    const res = await authMe();
    user = res ?? null;
  } catch (error: any) {
    user = null;
  }

  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ReactQueryProvider>
          <AuthStoreProvider user={user}>
            <ThemeProvider
              attribute="class"
              defaultTheme="system"
              enableSystem
              disableTransitionOnChange
            >
              {access_token && <AuthInitializer />}
              {children}
              <Toaster />
            </ThemeProvider>
          </AuthStoreProvider>
        </ReactQueryProvider>
      </body>
    </html>
  );
}
