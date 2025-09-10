import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar, Users, Building2, Shield } from "lucide-react";

export default function AdminDashboard() {
  const stats = [
    {
      title: "Total Bookings",
      value: "1,234",
      description: "+12% from last month",
      icon: Calendar,
    },
    {
      title: "Active Users",
      value: "567",
      description: "+8% from last month",
      icon: Users,
    },
    {
      title: "Facility Utilization Rate",
      value: "65%",
      description: "+20% from last month",
      icon: Building2,
    },
    {
      title: "Blocked by Students",
      value: "45%",
      description: "+35% from last month",
      icon: Shield,
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Admin Dashboard</h2>
        <p className="text-muted-foreground">
          Overview of your sports facility management system
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, index) => (
          <Card key={index}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {stat.title}
              </CardTitle>
              <stat.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-muted-foreground">
                {stat.description}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Recent Bookings</CardTitle>
            <CardDescription>
              Latest facility bookings from users
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[1, 2, 3, 4, 5].map((_, i) => (
                <div key={i} className="flex items-center space-x-4">
                  <div className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center">
                    <Calendar className="h-4 w-4" />
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm font-medium leading-none">
                      Cricket Ground booking
                    </p>
                    <p className="text-sm text-muted-foreground">
                      by John Doe • Today at 2:00 PM
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="col-span-3">
          <CardHeader>
            <CardTitle>Popular Facilities</CardTitle>
            <CardDescription>
              Most booked facilities this month
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { name: "Cricket Ground", bookings: 45 },
                { name: "Football Field", bookings: 38 },
                { name: "Tennis Court", bookings: 29 },
                { name: "Basketball Court", bookings: 22 },
                { name: "Badminton Court", bookings: 18 },
              ].map((facility, i) => (
                <div key={i} className="flex items-center justify-between">
                  <div className="text-sm font-medium">{facility.name}</div>
                  <div className="text-sm text-muted-foreground">
                    {facility.bookings} bookings
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}