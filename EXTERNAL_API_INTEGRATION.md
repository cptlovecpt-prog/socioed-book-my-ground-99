# 🚀 External API Integration Guide

This guide explains how to use the integrated BU Sports Admin API functionality in your admin dashboard.

## 🔐 Security & Authentication

### Token Management
- Your API tokens are stored securely in browser's localStorage
- Tokens are never sent to our servers
- Each user manages their own API credentials

### First Time Setup
1. Navigate to any **External API** section in the admin sidebar
2. You'll be prompted to enter your BU Sports Admin API token
3. The system will validate the token against the API
4. Once validated, the token is saved for future use

## 📊 Available Features

### 1. External Facilities Management (`/admin/external/facilities`)
- **View All Facilities**: Complete list with utilization data
- **Toggle Status**: Enable/disable facility booking and active status
- **Create New Facilities**: Add facilities with sport assignments
- **Schedule Closures**: Set maintenance periods and event closures
- **Real-time Sync**: All changes reflect immediately in the external system

### 2. External Bookings Overview (`/admin/external/bookings`)
- **View All Bookings**: Paginated list of all facility bookings
- **Advanced Filtering**: Filter by status, date, facility
- **Search Functionality**: Search by student name, booking number, facility
- **Detailed Information**: Student details, time slots, participant counts

### 3. External Analytics Dashboard (`/admin/external/analytics`)
- **Key Performance Indicators**: Students, facilities, bookings, utilization rates
- **Visual Charts**: Popular sports distribution, peak usage hours
- **Utilization Reports**: Facility-specific performance metrics
- **Custom Date Ranges**: Generate reports for specific time periods

## 🔧 API Configuration

### Supported Endpoints
The integration supports all major BU Sports Admin API endpoints:

**Facilities Management:**
- `GET /api/admin/facilities`
- `PATCH /api/admin/facilities/{id}/toggle-booking`
- `PATCH /api/admin/facilities/{id}/toggle-active`
- `POST /api/admin/facilities/{id}/closures`
- `POST /api/admin/facilities`
- `PUT /api/admin/facilities/{id}`

**Analytics & Reporting:**
- `GET /api/admin/dashboard/stats`
- `GET /api/admin/analytics/utilization`
- `GET /api/admin/bookings`

**Sports Management:**
- `POST /api/admin/sports`

### Authentication Headers
All requests automatically include:
```javascript
headers: {
  'Authorization': `Bearer ${your_token}`,
  'Content-Type': 'application/json'
}
```

## 🛠️ Technical Details

### Error Handling
- **Network Errors**: Automatic retry with user notifications
- **Authentication Failures**: Token validation and re-authentication prompts
- **API Errors**: Detailed error messages with actionable feedback

### Data Synchronization
- **Real-time Updates**: Changes reflect immediately in external system
- **Optimistic UI**: Interface updates before API confirmation
- **Conflict Resolution**: Proper handling of concurrent modifications

### Performance Features
- **Pagination**: Large datasets are paginated for optimal performance
- **Caching**: Smart caching reduces unnecessary API calls
- **Loading States**: Clear indicators during data operations

## 🔄 Usage Examples

### Adding a New Facility
1. Go to `External Facilities` → Click `Add Facility`
2. Fill in facility details (name, location, dimensions)
3. Set capacity and sport type
4. Click `Create Facility`

### Scheduling Maintenance
1. Select facility → Click `Schedule Closure`
2. Choose closure type (maintenance/event/emergency)
3. Set date range and optional time restrictions
4. Add reason description
5. Confirm scheduling

### Generating Analytics Reports
1. Go to `External Analytics`
2. Set custom date range for utilization reports
3. View facility performance metrics
4. Export or analyze popular sports and peak hours

## ⚠️ Important Notes

### Token Security
- **Never share your API tokens** - they provide admin access to your external system
- **Use strong tokens** - ensure your API tokens follow security best practices
- **Regular rotation** - consider rotating tokens periodically for enhanced security

### API Limitations
- **Rate Limiting**: Respect external API rate limits
- **Permissions**: Ensure your token has necessary admin permissions
- **Network Requirements**: Stable internet connection required for real-time sync

### Data Privacy
- All external API calls are made directly from your browser
- No data passes through our servers
- Your API credentials remain on your local device

## 🆘 Troubleshooting

### Common Issues

**"Authentication token not found"**
- Solution: Re-enter your API token in the token manager

**"API Error: 401 - Unauthorized"** 
- Solution: Token expired or invalid - obtain new token from admin panel

**"Failed to load facilities/bookings"**
- Solution: Check internet connection and API endpoint availability

**"Network timeout"**
- Solution: Verify external API server is responding and accessible

### Support
If you encounter issues not covered here, check:
1. Your API token permissions and validity
2. External API server status and connectivity  
3. Browser console for detailed error messages

---

## 🎯 Quick Start Checklist

- [ ] Obtain admin Bearer token from BU Sports API
- [ ] Navigate to any External API section
- [ ] Enter and validate your token
- [ ] Start managing facilities, bookings, and analytics
- [ ] Monitor real-time synchronization with external system

**Ready to go!** Your admin dashboard now has full integration with the BU Sports external API system.