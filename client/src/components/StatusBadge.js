const StatusBadge = ({ status }) => {
  const colors = {
    SUBMITTED: "bg-blue-600",
    UNDER_PROCESS: "bg-yellow-500",
    APPROVED: "bg-green-600",
    REJECTED: "bg-red-600",
  };

  return (
    <span
      className={`text-white px-3 py-1 rounded text-sm ${
        colors[status] || "bg-gray-500"
      }`}
    >
      {status.replace("_", " ")}
    </span>
  );
};

export default StatusBadge;
