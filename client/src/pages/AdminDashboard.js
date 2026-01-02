import { useEffect, useState } from "react";
import api from "../services/api";

const AdminDashboard = () => {
  const [patents, setPatents] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchPatents = async () => {
    try {
      const res = await api.get("/admin/patents");
      setPatents(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPatents();
  }, []);

  const updateStatus = async (patentId, status) => {
    try {
      await api.patch(`/admin/patents/${patentId}/status`, { status });
      fetchPatents();
    } catch (err) {
      alert("Failed to update status");
    }
  };

  const deletePatent = async (patentId) => {
    if (!window.confirm("Are you sure you want to delete this patent?")) return;

    try {
      await api.delete(`/admin/patents/${patentId}`);
      fetchPatents();
    } catch (err) {
      alert("Failed to delete patent");
    }
  };

  if (loading) return <p className="p-6">Loading...</p>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>

      <div className="overflow-x-auto">
        <table className="w-full border">
          <thead className="bg-gray-200">
            <tr>
              <th className="border p-2">User</th>
              <th className="border p-2">Email</th>
              <th className="border p-2">Title</th>
              <th className="border p-2">Category</th>
              <th className="border p-2">Status</th>
              <th className="border p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {patents.map((p) => (
              <tr key={p._id}>
                <td className="border p-2">{p.user?.name}</td>
                <td className="border p-2">{p.user?.email}</td>
                <td className="border p-2">{p.patentDetails.title}</td>
                <td className="border p-2">{p.patentDetails.category}</td>
                <td className="border p-2">
                  <select
  disabled={p.status === "APPROVED"}
  value={p.status}
  onChange={(e) => updateStatus(p._id, e.target.value)}
  className="border p-1 disabled:bg-gray-200"
>

                    <option value="SUBMITTED">SUBMITTED</option>
                    <option value="UNDER_PROCESS">UNDER_PROCESS</option>
                    <option value="APPROVED">APPROVED</option>
                    <option value="REJECTED">REJECTED</option>
                  </select>
                </td>
                <td className="border p-2">
                  <button
                    onClick={() => deletePatent(p._id)}
                    className="bg-red-600 text-white px-3 py-1 rounded"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminDashboard;
