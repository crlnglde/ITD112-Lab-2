import React, { useState, useEffect } from "react";
import { collection, getDocs, doc, deleteDoc, updateDoc } from "firebase/firestore";
import { db } from "../firebase";
import "../css/list.css";

const rowsPerPage = 10; // Number of rows to display per page

const NatDataList = () => {
  const [natData, setNatData] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [editForm, setEditForm] = useState({
    first_name: "",
    respondents: "",
    age: "",
    sex: "",
    ethnic: "",
    academic_performance: "",
    academic_description: "",
    iq: "",
    type_school: "",
    socio_economic_status: "",
    study_habit: "",
    nat_results: "",
  });

  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const natCollection = collection(db, "natData");
      const natSnapshot = await getDocs(natCollection);
      const dataList = natSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setNatData(dataList);
    };

    fetchData();
  }, []);

  const handleDelete = async (id) => {
    const natDocRef = doc(db, "natData", id);
    try {
      await deleteDoc(natDocRef);
      setNatData(natData.filter((data) => data.id !== id));
      alert("Data deleted successfully!");
    } catch (error) {
      console.error("Error deleting document: ", error);
    }
  };

  const handleEdit = (data) => {
    setEditingId(data.id);
    setEditForm({
      first_name: data.first_name,
      respondents: data.respondents,
      age: data.age,
      sex: data.sex,
      ethnic: data.ethnic,
      academic_performance: data.academic_performance,
      academic_description: data.academic_description,
      iq: data.iq,
      type_school: data.type_school,
      socio_economic_status: data.socio_economic_status,
      study_habit: data.study_habit,
      nat_results: data.nat_results,
    });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    const natDocRef = doc(db, "natData", editingId);
    try {
      await updateDoc(natDocRef, {
        first_name: editForm.first_name,
        respondents: editForm.respondents,
        age: Number(editForm.age),
        sex: editForm.sex,
        ethnic: editForm.ethnic,
        academic_performance: Number(editForm.academic_performance),
        academic_description: editForm.academic_description,
        iq: editForm.iq,
        type_school: editForm.type_school,
        socio_economic_status: editForm.socio_economic_status,
        study_habit: editForm.study_habit,
        nat_results: Number(editForm.nat_results),
      });
      setNatData(natData.map((data) =>
        data.id === editingId ? { id: editingId, ...editForm } : data
      ));
      setEditingId(null);
      alert("Data updated successfully!");
    } catch (error) {
      console.error("Error updating document: ", error);
    }
  };


      // Search filtering logic (search across all data)
  const filteredData = natData.filter((data) => {
    const fullName = `${data.first_name} ${data.respondents}`.toLowerCase();
    return fullName.includes(searchTerm.toLowerCase());
  });

  // Pagination logic for filtered data
  const totalRows = filteredData.length;
  const totalPages = Math.ceil(totalRows / rowsPerPage);

  const startIndex = (currentPage - 1) * rowsPerPage;
  const currentData = filteredData.slice(startIndex, startIndex + rowsPerPage);

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div className="table-container">
      <h2>Result List</h2>

            {/* Search Input */}
      <input
        type="text"
        placeholder="Search...."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="search-input"
      />

      {editingId ? (
        <form onSubmit={handleUpdate}>
          <input
            type="text"
            placeholder="First Name"
            value={editForm.first_name}
            onChange={(e) => setEditForm({ ...editForm, first_name: e.target.value })}
            required
          />
          <input
            type="text"
            placeholder="Last Name"
            value={editForm.respondents}
            onChange={(e) => setEditForm({ ...editForm, respondents: e.target.value })}
            required
          />
          <input
            type="number"
            placeholder="Age"
            value={editForm.age}
            onChange={(e) => setEditForm({ ...editForm, age: e.target.value })}
            required
          />
          <input
            type="text"
            placeholder="Sex"
            value={editForm.sex}
            onChange={(e) => setEditForm({ ...editForm, sex: e.target.value })}
            required
          />
          <input
            type="text"
            placeholder="Ethnic"
            value={editForm.ethnic}
            onChange={(e) => setEditForm({ ...editForm, ethnic: e.target.value })}
            required
          />
          <input
            type="number"
            placeholder="Academic Performance"
            value={editForm.academic_performance}
            onChange={(e) => setEditForm({ ...editForm, academic_performance: e.target.value })}
            required
          />
          <input
            type="text"
            placeholder="Academic Description"
            value={editForm.academic_description}
            onChange={(e) => setEditForm({ ...editForm, academic_description: e.target.value })}
            required
          />
          <input
            type="text"
            placeholder="IQ"
            value={editForm.iq}
            onChange={(e) => setEditForm({ ...editForm, iq: e.target.value })}
            required
          />
          <input
            type="text"
            placeholder="Type of School"
            value={editForm.type_school}
            onChange={(e) => setEditForm({ ...editForm, type_school: e.target.value })}
            required
          />
          <input
            type="text"
            placeholder="Socio-Economic Status"
            value={editForm.socio_economic_status}
            onChange={(e) => setEditForm({ ...editForm, socio_economic_status: e.target.value })}
            required
          />
          <input
            type="text"
            placeholder="Study Habit"
            value={editForm.study_habit}
            onChange={(e) => setEditForm({ ...editForm, study_habit: e.target.value })}
            required
          />
          <input
            type="number"
            placeholder="NAT Results"
            value={editForm.nat_results}
            onChange={(e) => setEditForm({ ...editForm, nat_results: e.target.value })}
            required
          />
          <button type="submit">Update Data</button>
          <button className="cancel-button" onClick={() => setEditingId(null)}>Cancel</button>
        </form>
      ) : (
        <>
          <table>
            <thead>
              <tr>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Age</th>
                <th>Sex</th>
                <th>Ethnic</th>
                <th>Academic Performance</th>
                <th>Academic Description</th>
                <th>IQ</th>
                <th>Type of School</th>
                <th>Socio-Economic Status</th>
                <th>Study Habit</th>
                <th>NAT Results</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
            {currentData.map((data) => (
                <tr key={data.id}>
                  <td>{data.first_name}</td>
                  <td>{data.respondents}</td>
                  <td>{data.age}</td>
                  <td>{data.sex}</td>
                  <td>{data.ethnic}</td>
                  <td>{data.academic_performance}</td>
                  <td>{data.academic_description}</td>
                  <td>{data.iq}</td>
                  <td>{data.type_school}</td>
                  <td>{data.socio_economic_status}</td>
                  <td>{data.study_habit}</td>
                  <td>{data.nat_results}</td>
                  <td>
                    <button className="edit-button" onClick={() => handleEdit(data)}>Edit</button>
                    <button className="delete-button" onClick={() => handleDelete(data.id)}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="pagination-controls">
            <button
              onClick={handlePreviousPage}
              disabled={currentPage === 1}
            >
              Previous
            </button>
            <span>
              Page {currentPage} of {totalPages}
            </span>
            <button
              onClick={handleNextPage}
              disabled={currentPage === totalPages}
            >
              Next
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default NatDataList;