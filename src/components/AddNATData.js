import React, { useState } from "react";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../firebase";
import "../css/add.css";

const AddNatData = () => {
  const [firstName, setFirstName] = useState("");
  const [respondents, setRespondents] = useState(""); // Store last name
  const [age, setAge] = useState("");
  const [sex, setSex] = useState("");
  const [ethnic, setEthnic] = useState("");
  const [academicPerformance, setAcademicPerformance] = useState("");
  const [academicDescription, setAcademicDescription] = useState("");
  const [iq, setIq] = useState("");
  const [typeSchool, setTypeSchool] = useState("");
  const [socioEconomicStatus, setSocioEconomicStatus] = useState("");
  const [studyHabit, setStudyHabit] = useState("");
  const [natResults, setNatResults] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addDoc(collection(db, "natData"), {
        first_name: firstName,
        respondents, // Last name
        age: Number(age),
        sex,
        ethnic,
        academic_performance: Number(academicPerformance),
        academic_description: academicDescription,
        iq,
        type_school: typeSchool,
        socio_economic_status: socioEconomicStatus,
        study_habit: studyHabit,
        nat_results: Number(natResults),
      });
      setRespondents("");
      setFirstName("");
      setRespondents("");
      setAge("");
      setSex("");
      setEthnic("");
      setAcademicPerformance("");
      setAcademicDescription("");
      setIq("");
      setTypeSchool("");
      setSocioEconomicStatus("");
      setStudyHabit("");
      setNatResults("");
      alert("Data added successfully!");
      window.location.reload();
    } catch (error) {
      console.error("Error adding document: ", error);
    }
  };

  return (
    <div className="form-container">
      <h2>Input NAT Data</h2>
    
      <form onSubmit={handleSubmit}>
      <input
          type="text"
          placeholder="First Name"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Last Name"
          value={respondents}
          onChange={(e) => setRespondents(e.target.value)}
          required
        />
        <input
          type="number"
          placeholder="Age"
          value={age}
          onChange={(e) => setAge(e.target.value)}
          required
        />

        <select
          value={sex}
          onChange={(e) => setSex(e.target.value)}
          required
        >
          <option value="" disabled selected>Sex</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
        </select>

        <input
          type="text"
          placeholder="Ethnic"
          value={ethnic}
          onChange={(e) => setEthnic(e.target.value)}
          required
        />
        <input
          type="number"
          placeholder="Academic Performance"
          value={academicPerformance}
          onChange={(e) => setAcademicPerformance(e.target.value)}
          required
        />

        <select
          value={academicDescription}
          onChange={(e) => setAcademicDescription(e.target.value)}
          required
        >
          <option value="" disabled>Academic Description</option>
          <option value="Did not meet expectation">Did not meet expectation</option>
          <option value="Fairly Satisfactory">Fairly Satisfactory</option>
          <option value="Satisfactory">Satisfactory</option>
          <option value="Outstanding">Outstanding</option>
        </select>

        <select
          value={iq}
          onChange={(e) => setIq(e.target.value)}
          required
        >
          <option value="" disabled>IQ</option>
          <option value="Low">Low</option>
          <option value="Average">Average</option>
          <option value="High">High</option>
        </select>

        <select
          value={typeSchool}
          onChange={(e) => setTypeSchool(e.target.value)}
          required
        >
          <option value="" disabled>Type of School</option>
          <option value="Public">Public</option>
          <option value="Private">Private</option>
        </select>

        <select
          value={socioEconomicStatus}
          onChange={(e) => setSocioEconomicStatus(e.target.value)}
          required
        >
          <option value="" disabled>Socio-Economic Status</option>
          <option value="Below poverty line">Below poverty line</option>
          <option value="On poverty line">On poverty line</option>
          <option value="Above poverty line">Above poverty line</option>
        </select>

        <select
          value={studyHabit}
          onChange={(e) => setStudyHabit(e.target.value)}
          required
        >
          <option value="" disabled>Study Habit</option>
          <option value="Poor">Poor</option>
          <option value="Good">Good</option>
          <option value="Excellent">Excellent</option>
        </select>

        <input
          type="number"
          placeholder="NAT Results"
          value={natResults}
          onChange={(e) => setNatResults(e.target.value)}
          required
        />
        <button type="submit">Add Data</button>
      </form>

    </div>
  );
};

export default AddNatData;
