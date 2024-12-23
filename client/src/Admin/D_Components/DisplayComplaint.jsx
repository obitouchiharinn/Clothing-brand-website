import React, { useEffect, useState } from "react";
import axios from "axios";

const Complaint = () => {
  const [complaints, setComplaints] = useState([]);
  const [error, setError] = useState("");
  
  // Fetch complaints from backend
  useEffect(() => {
    const fetchComplaints = async () => {
      try {
        const response = await axios.get("http://localhost:5000/complaints/get-complaints");
        if (response.data.success) {
          setComplaints(response.data.complaints);
        }
      } catch (err) {
        setError("Error fetching complaints");
      }
    };

    fetchComplaints();
  }, []);

  // Update complaint status
  const updateStatus = async (complaintId, status) => {
    try {
      const response = await axios.put("http://localhost:5000/complaints/update-complaint-status", {
        complaintId,
        status,
      });

      if (response.data.success) {
        // Update the complaint status locally
        setComplaints((prevComplaints) =>
          prevComplaints.map((complaint) =>
            complaint.complaintNumber === complaintId
              ? { ...complaint, status }
              : complaint
          )
        );
      }
    } catch (err) {
      console.error("Error updating complaint status:", err);
      setError("Error updating complaint status");
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Complaints</h1>
      {error && <div className="text-red-500 mb-4">{error}</div>}
      <div className="overflow-x-auto">
        <table className="table-auto w-full text-left border-collapse border border-gray-200">
          <thead>
            <tr className="bg-gray-100 border-b border-gray-200">
              <th className="p-4">Complaint ID</th>
              <th className="p-4">Name</th>
              <th className="p-4">Email</th>
              <th className="p-4">Message</th>
              <th className="p-4">Status</th>
              <th className="p-4">Action</th>
            </tr>
          </thead>
          <tbody>
            {complaints.map((complaint) => (
              <tr key={complaint.complaintNumber} className="border-b">
                <td className="p-4">{complaint.complaintNumber}</td>
                <td className="p-4">{complaint.name}</td>
                <td className="p-4">{complaint.email}</td>
                <td className="p-4">{complaint.message}</td>
                <td className="p-4">
                  <span
                    className={`px-2 py-1 rounded ${
                      complaint.status === "Resolved"
                        ? "bg-green-200 text-green-800"
                        : "bg-yellow-200 text-yellow-800"
                    }`}
                  >
                    {complaint.status || "Pending"}
                  </span>
                </td>
                <td className="p-4">
                  <select
                    value={complaint.status || "Pending"}
                    onChange={(e) =>
                      updateStatus(complaint.complaintNumber, e.target.value)
                    }
                    className="border border-gray-300 rounded p-2"
                  >
                    <option value="Pending">Pending</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Resolved">Resolved</option>
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Complaint;
