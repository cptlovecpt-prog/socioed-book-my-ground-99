import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "next-themes";
import { BookingProvider } from "@/contexts/BookingContext";
import { AuthProvider, useAuth } from "@/contexts/AuthContext";
import Index from "./pages/Index";
import MyBookings from "./pages/MyBookings";
import NotFound from "./pages/NotFound";
import AdminLayout from "./layouts/AdminLayout";
import AdminDashboard from "./pages/admin/AdminDashboard";
import ManageBanners from "./pages/admin/ManageBanners";
import ManageFacilities from "./pages/admin/ManageFacilities";
import ManageBookings from "./pages/admin/ManageBookings";
import AdminYourBookings from "./pages/admin/AdminYourBookings";

const queryClient = new QueryClient();

const AppRoutes = () => {
  const { user, isSignedIn } = useAuth();

  return (
    <BrowserRouter>
      <Routes>
        <Route 
          path="/" 
          element={
            <AdminLayout>
              <AdminDashboard />
            </AdminLayout>
          } 
        />
        <Route 
          path="/student" 
          element={<Index />} 
        />
        <Route 
          path="/my-bookings" 
          element={<MyBookings />} 
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
        <Route 
          path="/admin/your-bookings" 
          element={
            <AdminLayout>
              <AdminYourBookings />
            </AdminLayout>
          } 
        />
        {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
        <TooltipProvider>
          <AuthProvider>
            <BookingProvider>
              <Toaster />
              <Sonner />
              <AppRoutes />
            </BookingProvider>
          </AuthProvider>
        </TooltipProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
};

export default App;
