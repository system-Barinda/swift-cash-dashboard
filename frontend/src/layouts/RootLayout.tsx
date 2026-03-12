import { Outlet, useNavigation } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";

export default function RootLayout() {

  const navigation = useNavigation();
  const isLoading = navigation.state === "loading";

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">

      {/* Header */}
      <Header />

      {/* Page Content */}
      <main className="flex-1 w-full max-w-7xl mx-auto p-6">

        {/* Global Loading Indicator */}
        {isLoading && (
          <div className="w-full mb-4">
            <div className="h-1 bg-blue-500 animate-pulse rounded"></div>
          </div>
        )}

        <Outlet />

      </main>

      {/* Footer */}
      <Footer />

    </div>
  );
}