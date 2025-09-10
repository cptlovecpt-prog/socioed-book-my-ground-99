import YourBookings from "@/components/YourBookings";

export default function AdminYourBookings() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Your Bookings</h2>
        <p className="text-muted-foreground">
          View and manage your facility bookings
        </p>
      </div>
      <YourBookings isSignedIn={true} />
    </div>
  );
}