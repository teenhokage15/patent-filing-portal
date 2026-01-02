import { useEffect, useState } from "react";
import api from "../services/api";
import PatentForm from "../components/PatentForm";
import StatusBadge from "../components/StatusBadge";

const UserDashboard = () => {
  const [patents, setPatents] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchPatents = async () => {
    try {
      const res = await api.get("/user/my-patents");
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

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">My Patents</h1>

      <PatentForm onSuccess={fetchPatents} />

      <div className="mt-8">
        {loading ? (
  <p className="text-gray-500">Loading your patents...</p>
) : patents.length === 0 ? (
  <div className="bg-yellow-100 p-4 rounded">
    <p className="font-semibold">No patents submitted yet</p>
    <p className="text-sm text-gray-700">
      Use the form above to submit your first patent.
    </p>
  </div>
) : (

          <table className="w-full border mt-4">
            <thead className="bg-gray-200">
              <tr>
                <th className="border p-2">Title</th>
                <th className="border p-2">Category</th>
                <th className="border p-2">Status</th>
                <th className="border p-2">Submitted</th>
              </tr>
            </thead>
            <tbody>
              {patents.map((p) => (
                <tr key={p._id}>
                  <td className="border p-2">{p.patentDetails.title}</td>
                  <td className="border p-2">{p.patentDetails.category}</td>
                  <td className="border p-2">
                    <td className="border p-2">
                        <StatusBadge status={p.status} />
                    </td>

                  </td>
                  <td className="border p-2">
                    {new Date(p.createdAt).toLocaleDateString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default UserDashboard;
