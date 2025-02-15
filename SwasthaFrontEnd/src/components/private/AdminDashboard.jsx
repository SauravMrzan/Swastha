import React from "react";
import "../css/AdminDashboard.css";

const AdminDashboard = () => {
  return (
    <div className="dashboard-container">
      {/* Sidebar */}
      <div className="sidebar">
        <h2>Swastha Admin</h2>
        <ul>
          {["Dashboard", "User Management", "Package Management", "Bookings", "Destinations", "Analytics", "Reviews", "Settings"].map((text) => (
            <li key={text}>
              <a href="#">{text}</a>
            </li>
          ))}
        </ul>
      </div>

      {/* Main Content */}
      <div className="main-content">
        <header>
          <h1>Welcome, Admin</h1>
        </header>

        {/* Dashboard Overview */}
        <div className="dashboard-overview">
          <div className="stats-card">
            <h3>Total Users</h3>
            <p>500</p>
          </div>
          <div className="stats-card">
            <h3>Total Bookings</h3>
            <p>1200</p>
          </div>
          <div className="stats-card">
            <h3>Total Doctors</h3>
            <p>15</p>
          </div>
          <div className="stats-card">
            <h3>Total Revenue</h3>
            <p>$15,000</p>
          </div>
        </div>

        {/* Recent Activities */}
        <div className="recent-activities">
          <h2>Recent Activities</h2>
          <ul>
            <li>Package "Himalayan Trek" approved</li>
            <li>New Customer: John Doe registered</li>
            <li>Booking #1102 confirmed for "Kathmandu Valley Tour"</li>
          </ul>
        </div>

        {/* User Management */}
        <div className="section">
          <h2>User Management</h2>
          <table>
            <thead>
              <tr>
                <th>User ID</th>
                <th>Name</th>
                <th>Email</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>#001</td>
                <td>John Doe</td>
                <td>john@example.com</td>
                <td>Active</td>
              </tr>
              <tr>
                <td>#002</td>
                <td>Jane Smith</td>
                <td>jane@example.com</td>
                <td>Inactive</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Package Management */}
        <div className="section">
          <h2>Package Management</h2>
          <table>
            <thead>
              <tr>
                <th>Package ID</th>
                <th>Package Name</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>#1001</td>
                <td>Himalayan Trek</td>
                <td>Approved</td>
                <td><button>Approve</button></td>
              </tr>
              <tr>
                <td>#1002</td>
                <td>Kathmandu Valley Tour</td>
                <td>Pending</td>
                <td><button>Approve</button></td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Booking Management */}
        <div className="section">
          <h2>Bookings</h2>
          <table>
            <thead>
              <tr>
                <th>Booking ID</th>
                <th>Customer Name</th>
                <th>Package</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>#1101</td>
                <td>John Doe</td>
                <td>Himalayan Trek</td>
                <td>Confirmed</td>
              </tr>
              <tr>
                <td>#1102</td>
                <td>Jane Smith</td>
                <td>Kathmandu Valley Tour</td>
                <td>Pending</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
