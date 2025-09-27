function Profile() {
  const user = {
    name: "Ravi Kumar",
    email: "ravi.kumar@example.com",
    role: "Disaster Management Officer",
    location: "Odisha, India",
  };

  return (
    <div className="p-6 space-y-6 bg-gray-50 dark:bg-gray-900 min-h-screen">
      <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100 flex items-center gap-2">
        <span role="img" aria-label="user">👤</span> User Profile
      </h1>

      {/* User Info */}
      <div className="bg-gray-100 dark:bg-gray-700 p-6 rounded-lg shadow text-gray-900 dark:text-gray-100">
        <h2 className="text-lg font-semibold mb-4">User Information</h2>
        <p><span className="font-semibold">Name:</span> {user.name}</p>
        <p><span className="font-semibold">Email:</span> {user.email}</p>
        <p><span className="font-semibold">Role:</span> {user.role}</p>
        <p><span className="font-semibold">Location:</span> {user.location}</p>
      </div>

      {/* Preferences */}
      <div className="bg-gray-100 dark:bg-gray-700 p-6 rounded-lg shadow text-gray-900 dark:text-gray-100">
        <h2 className="text-lg font-semibold mb-4">Preferences</h2>
        <p>🔔 Alerts: Enabled</p>
        <p>🌙 Dark Mode: Auto</p>
      </div>
    </div>
  );
}

export default Profile;
