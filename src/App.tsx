import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "next-themes";
import { BookingProvider } from "@/contexts/BookingContext";
import { AuthProvider } from "@/contexts/AuthContext";
import { useState } from "react";
import Index from "./pages/Index";
import MyBookings from "./pages/MyBookings";
import NotFound from "./pages/NotFound";
import AdminLayout from "./layouts/AdminLayout";
import AdminDashboard from "./pages/admin/AdminDashboard";
import ManageBanners from "./pages/admin/ManageBanners";
import ManageFacilities from "./pages/admin/ManageFacilities";
import ManageBookings from "./pages/admin/ManageBookings";

const queryClient = new QueryClient();

const App = () => {
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [userData, setUserData] = useState<{ name: string; email: string; isAdmin?: boolean } | null>(null);

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
        <TooltipProvider>
          <AuthProvider>
            <BookingProvider>
              <Toaster />
              <Sonner />
              <BrowserRouter>
              <Routes>
                <Route 
                  path="/" 
                  element={
                    userData?.isAdmin ? (
                      <AdminLayout>
                        <AdminDashboard />
                      </AdminLayout>
                    ) : (
                      <Index 
                        isSignedIn={isSignedIn}
                        setIsSignedIn={setIsSignedIn}
                        userData={userData}
                        setUserData={setUserData}
                      />
                    )
                  } 
                />
                <Route 
                  path="/my-bookings" 
                  element={
                    <MyBookings 
                      isSignedIn={isSignedIn}
                      setIsSignedIn={setIsSignedIn}
                      userData={userData}
                      setUserData={setUserData}
                    />
                  } 
                />
                {/* Admin Routes */}
                <Route 
                  path="/admin" 
                  element={
                    <AdminLayout>
                      <AdminDashboard />
                    </AdminLayout>
                  } 
                />
                <Route 
                  path="/admin/banners" 
                  element={
                    <AdminLayout>
                      <ManageBanners />
                    </AdminLayout>
                  } 
                />
                <Route 
                  path="/admin/facilities" 
                  element={
                    <AdminLayout>
                      <ManageFacilities />
                    </AdminLayout>
                  } 
                />
                <Route 
                  path="/admin/bookings" 
                  element={
                    <AdminLayout>
                      <ManageBookings />
                    </AdminLayout>
                  } 
                />
                {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                <Route path="*" element={<NotFound />} />
              </Routes>
              </BrowserRouter>
            </BookingProvider>
          </AuthProvider>
        </TooltipProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
};

export default App;
