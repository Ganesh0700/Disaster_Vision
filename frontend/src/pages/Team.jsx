function Team() {
  const members = [
    {
      name: "Ganesh",
      role: "Fullstack Developer",
      photo: "https://via.placeholder.com/150", // apni photo ka link yaha lagao
    },
    // {
    //   name: "Ayush",
    //   role: "Frontend Developer",
    //   photo: "https://via.placeholder.com/150",
    // },
    // {
    //   name: "Yash",
    //   role: "Backend Developer",
    //   photo: "https://via.placeholder.com/150",
    // },
    // {
    //   name: "Aniket",
    //   role: "ML Engineer",
    //   photo: "https://via.placeholder.com/150",
    // },
  ];

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold text-center text-gray-800 mb-10">
        👨‍💻 Developed By Our Team
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {members.map((member, i) => (
          <div
            key={i}
            className="bg-white p-6 rounded-xl shadow-md border text-center"
          >
            <img
              src={member.photo}
              alt={member.name}
              className="w-28 h-28 rounded-full mx-auto mb-4"
            />
            <h2 className="text-xl font-semibold text-gray-700">{member.name}</h2>
            <p className="text-gray-500">{member.role}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Team;
