import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar, Users, Building2, Shield, CalendarIcon } from "lucide-react";
import { useState } from "react";
import { format, subYears, startOfDay } from "date-fns";
import { cn } from "@/lib/utils";
import { DateRange } from "react-day-picker";

export default function AdminDashboard() {
  const [timePeriod, setTimePeriod] = useState<"week" | "month" | "range">("month");
  const [dateRange, setDateRange] = useState<DateRange | undefined>();
  const [isDateRangeOpen, setIsDateRangeOpen] = useState(false);

  const oneYearAgo = subYears(new Date(), 1);
  const today = startOfDay(new Date());

  // Function to get stats based on selected time period
  const getStatsForPeriod = () => {
    switch (timePeriod) {
      case "week":
        return [
          {
            title: "Total Bookings",
            value: "187",
            description: "+23% from last week",
            icon: Calendar,
          },
          {
            title: "Active Users",
            value: "89",
            description: "+15% from last week",
            icon: Users,
          },
          {
            title: "Facility Utilization Rate",
            value: "72%",
            description: "+5% from last week",
            icon: Building2,
          },
          {
            title: "Blocked by Students",
            value: "38%",
            description: "+12% from last week",
            icon: Shield,
          },
        ];
      case "range":
        if (dateRange?.from && dateRange?.to) {
          return [
            {
              title: "Total Bookings",
              value: "892",
              description: "Selected date range",
              icon: Calendar,
            },
            {
              title: "Active Users",
              value: "234",
              description: "Selected date range",
              icon: Users,
            },
            {
              title: "Facility Utilization Rate",
              value: "58%",
              description: "Selected date range",
              icon: Building2,
            },
            {
              title: "Blocked by Students",
              value: "41%",
              description: "Selected date range",
              icon: Shield,
            },
          ];
        }
        // Fallback to month if no range selected
        return getMonthStats();
      default: // month
        return getMonthStats();
    }
  };

  const getMonthStats = () => [
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

  // Function to get recent bookings based on selected time period
  const getRecentBookingsForPeriod = () => {
    switch (timePeriod) {
      case "week":
        return [
          { facility: "Basketball Court", user: "Alice Johnson", time: "Today at 3:00 PM" },
          { facility: "Tennis Court", user: "Bob Smith", time: "Today at 1:00 PM" },
          { facility: "Badminton Court", user: "Carol Brown", time: "Yesterday at 5:00 PM" },
          { facility: "Swimming Pool", user: "David Wilson", time: "Yesterday at 2:00 PM" },
          { facility: "Gym", user: "Eva Davis", time: "Monday at 8:00 AM" },
        ];
      case "range":
        if (dateRange?.from && dateRange?.to) {
          return [
            { facility: "Cricket Ground", user: "Mike Thompson", time: "Within selected range" },
            { facility: "Football Field", user: "Sarah Miller", time: "Within selected range" },
            { facility: "Volleyball Court", user: "Tom Anderson", time: "Within selected range" },
            { facility: "Hockey Field", user: "Lisa Garcia", time: "Within selected range" },
            { facility: "Squash Court", user: "James Martinez", time: "Within selected range" },
          ];
        }
        return getMonthBookings();
      default: // month
        return getMonthBookings();
    }
  };

  const getMonthBookings = () => [
    { facility: "Cricket Ground", user: "John Doe", time: "Today at 2:00 PM" },
    { facility: "Cricket Ground", user: "John Doe", time: "Today at 2:00 PM" },
    { facility: "Cricket Ground", user: "John Doe", time: "Today at 2:00 PM" },
    { facility: "Cricket Ground", user: "John Doe", time: "Today at 2:00 PM" },
    { facility: "Cricket Ground", user: "John Doe", time: "Today at 2:00 PM" },
  ];

  // Function to get popular facilities based on selected time period
  const getPopularFacilitiesForPeriod = () => {
    switch (timePeriod) {
      case "week":
        return [
          { name: "Basketball Court", bookings: 28 },
          { name: "Tennis Court", bookings: 22 },
          { name: "Badminton Court", bookings: 19 },
          { name: "Swimming Pool", bookings: 15 },
          { name: "Gym", bookings: 12 },
        ];
      case "range":
        if (dateRange?.from && dateRange?.to) {
          return [
            { name: "Cricket Ground", bookings: 89 },
            { name: "Football Field", bookings: 76 },
            { name: "Volleyball Court", bookings: 54 },
            { name: "Hockey Field", bookings: 43 },
            { name: "Squash Court", bookings: 32 },
          ];
        }
        return getMonthFacilities();
      default: // month
        return getMonthFacilities();
    }
  };

  const getMonthFacilities = () => [
    { name: "Cricket Ground", bookings: 45 },
    { name: "Football Field", bookings: 38 },
    { name: "Tennis Court", bookings: 29 },
    { name: "Basketball Court", bookings: 22 },
    { name: "Badminton Court", bookings: 18 },
  ];

  // Function to get period description
  const getPeriodDescription = () => {
    switch (timePeriod) {
      case "week":
        return "This week's facility bookings from users";
      case "range":
        if (dateRange?.from && dateRange?.to) {
          return `Facility bookings from ${format(dateRange.from, "MMM dd")} to ${format(dateRange.to, "MMM dd")}`;
        }
        return "Latest facility bookings from users";
      default: // month
        return "Latest facility bookings from users";
    }
  };

  const stats = getStatsForPeriod();
  const recentBookings = getRecentBookingsForPeriod();
  const popularFacilities = getPopularFacilitiesForPeriod();

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-start">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Admin Dashboard</h2>
          <p className="text-muted-foreground">
            Overview of your sports facility management system
          </p>
        </div>
        
        {/* Time Period Selection */}
        <div className="flex gap-2">
          <Button
            variant={timePeriod === "week" ? "default" : "outline"}
            size="sm"
            onClick={() => setTimePeriod("week")}
          >
            This Week
          </Button>
          <Button
            variant={timePeriod === "month" ? "default" : "outline"}
            size="sm"
            onClick={() => setTimePeriod("month")}
          >
            This Month
          </Button>
          
          {/* Date Range Picker */}
          <Popover open={isDateRangeOpen} onOpenChange={setIsDateRangeOpen}>
            <PopoverTrigger asChild>
              <Button
                variant={timePeriod === "range" ? "default" : "outline"}
                size="sm"
                className={cn(
                  "min-w-[120px] justify-start text-left font-normal",
                  !dateRange && timePeriod === "range" && "text-muted-foreground"
                )}
                onClick={() => {
                  setTimePeriod("range");
                  setIsDateRangeOpen(true);
                }}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {dateRange?.from ? (
                  dateRange.to ? (
                    <>
                      {format(dateRange.from, "LLL dd")} -{" "}
                      {format(dateRange.to, "LLL dd")}
                    </>
                  ) : (
                    format(dateRange.from, "LLL dd, y")
                  )
                ) : (
                  <span>Date Range</span>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <CalendarComponent
                initialFocus
                mode="range"
                defaultMonth={dateRange?.from}
                selected={dateRange}
                onSelect={setDateRange}
                numberOfMonths={2}
                disabled={(date) => 
                  date > today || date < oneYearAgo
                }
                className={cn("p-3 pointer-events-auto")}
                classNames={{
                  day_range_start: "day-range-start rounded-l-md bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground focus:bg-primary focus:text-primary-foreground",
                  day_range_end: "day-range-end rounded-r-md bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground focus:bg-primary focus:text-primary-foreground",
                  day_selected: "bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground focus:bg-primary focus:text-primary-foreground",
                  day_range_middle: "bg-accent text-accent-foreground hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground rounded-none",
                }}
              />
            </PopoverContent>
          </Popover>
        </div>
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
              {getPeriodDescription()}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentBookings.map((booking, i) => (
                <div key={i} className="flex items-center space-x-4">
                  <div className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center">
                    <Calendar className="h-4 w-4" />
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm font-medium leading-none">
                      {booking.facility} booking
                    </p>
                    <p className="text-sm text-muted-foreground">
                      by {booking.user} • {booking.time}
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
              Most booked facilities {timePeriod === "week" ? "this week" : timePeriod === "range" && dateRange?.from && dateRange?.to ? "in selected range" : "this month"}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {popularFacilities.map((facility, i) => (
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