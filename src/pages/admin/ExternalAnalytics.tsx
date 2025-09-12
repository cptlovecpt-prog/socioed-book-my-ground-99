import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { Calendar, TrendingUp, Users, Building, Activity, Clock } from 'lucide-react';
import { externalApiService, type DashboardStats, type UtilizationData } from '@/services/externalApi';
import { useToast } from '@/hooks/use-toast';
import { TokenManager } from '@/components/admin/TokenManager';

export const ExternalAnalytics = () => {
  const [dashboardStats, setDashboardStats] = useState<DashboardStats | null>(null);
  const [utilizationData, setUtilizationData] = useState<UtilizationData[]>([]);
  const [loading, setLoading] = useState(false);
  const [hasToken, setHasToken] = useState(false);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const { toast } = useToast();

  useEffect(() => {
    setHasToken(externalApiService.hasAuthToken());
    if (externalApiService.hasAuthToken()) {
      loadDashboardStats();
      
      // Set default date range (last 7 days)
      const end = new Date();
      const start = new Date();
      start.setDate(start.getDate() - 7);
      
      const endStr = end.toISOString().split('T')[0];
      const startStr = start.toISOString().split('T')[0];
      
      setStartDate(startStr);
      setEndDate(endStr);
      
      loadUtilizationData(startStr, endStr);
    }
  }, []);

  const loadDashboardStats = async () => {
    try {
      const response = await externalApiService.getDashboardStats();
      if (response.success) {
        setDashboardStats(response.data);
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to load dashboard statistics",
        variant: "destructive",
      });
    }
  };

  const loadUtilizationData = async (start?: string, end?: string) => {
    if (!start || !end) return;
    
    setLoading(true);
    try {
      const response = await externalApiService.getUtilizationAnalytics(start, end);
      if (response.success) {
        setUtilizationData(response.data);
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to load utilization data",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleDateRangeUpdate = () => {
    if (startDate && endDate) {
      loadUtilizationData(startDate, endDate);
    }
  };

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8'];

  if (!hasToken) {
    return (
      <div className="container mx-auto p-6">
        <div className="flex flex-col items-center justify-center min-h-[400px] space-y-4">
          <TokenManager onTokenSet={() => {
            setHasToken(true);
            loadDashboardStats();
          }} />
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Analytics Dashboard</h1>
          <p className="text-muted-foreground">System performance and utilization insights</p>
        </div>
      </div>

      {/* Key Metrics Cards */}
      {dashboardStats && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Students</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{dashboardStats.total_students}</div>
              <p className="text-xs text-muted-foreground">Registered users</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Facilities</CardTitle>
              <Building className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{dashboardStats.total_facilities}</div>
              <p className="text-xs text-muted-foreground">Active facilities</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Bookings</CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{dashboardStats.total_bookings}</div>
              <p className="text-xs text-muted-foreground">
                {dashboardStats.active_bookings} active, {dashboardStats.completed_bookings} completed
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Utilization Rate</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{dashboardStats.capacity_utilization.toFixed(1)}%</div>
              <p className="text-xs text-muted-foreground">Overall capacity usage</p>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Booking Trends */}
      {dashboardStats && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Popular Sports</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={dashboardStats.popular_sports}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percentage }) => `${name} (${percentage.toFixed(1)}%)`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="bookings"
                  >
                    {dashboardStats.popular_sports.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Peak Usage Hours</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={dashboardStats.peak_hours}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="hour" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="bookings" fill="#8884d8" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Utilization Analysis */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Activity className="w-5 h-5" />
            Facility Utilization Analysis
          </CardTitle>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <Label>Start Date:</Label>
              <Input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="w-auto"
              />
            </div>
            <div className="flex items-center gap-2">
              <Label>End Date:</Label>
              <Input
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className="w-auto"
              />
            </div>
            <Button onClick={handleDateRangeUpdate} disabled={loading}>
              Update Report
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="flex justify-center p-8">
              <div className="text-center">Loading utilization data...</div>
            </div>
          ) : (
            <div className="space-y-4">
              <ResponsiveContainer width="100%" height={400}>
                <BarChart data={utilizationData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis 
                    dataKey="facility_name" 
                    angle={-45}
                    textAnchor="end"
                    height={100}
                  />
                  <YAxis />
                  <Tooltip 
                    formatter={(value, name) => [
                      name === 'utilization_percentage' ? `${value}%` : value,
                      name === 'utilization_percentage' ? 'Utilization' : 'Bookings'
                    ]}
                  />
                  <Bar dataKey="utilization_percentage" fill="#8884d8" name="Utilization %" />
                  <Bar dataKey="booked_slots" fill="#82ca9d" name="Booked Slots" />
                </BarChart>
              </ResponsiveContainer>

              {/* Utilization Details Table */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {utilizationData.map((facility) => (
                  <Card key={facility.facility_id}>
                    <CardHeader className="pb-3">
                      <CardTitle className="text-lg">{facility.facility_name}</CardTitle>
                      <p className="text-sm text-muted-foreground">{facility.location}</p>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-sm">Sport:</span>
                        <span className="text-sm font-medium">{facility.sport_name}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm">Utilization:</span>
                        <span className="text-sm font-medium">{facility.utilization_percentage.toFixed(1)}%</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm">Slots Booked:</span>
                        <span className="text-sm font-medium">{facility.booked_slots}/{facility.total_slots}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm">Avg Participants:</span>
                        <span className="text-sm font-medium">{facility.avg_participants_per_slot.toFixed(1)}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm">Peak Time:</span>
                        <div className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          <span className="text-sm font-medium">{facility.peak_usage_time}</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};