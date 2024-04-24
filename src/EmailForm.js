import React, { useState } from "react";
import axios from "axios";

function EmailForm() {
  const [emailData, setEmailData] = useState({
    to: "",
    subject: "",
    text: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEmailData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:4000/send-email", emailData);
      alert("Email sent successfully!");
    } catch (error) {
      console.error("Error occurred:", error);
      alert("Failed to send email.");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="email"
        name="to"
        placeholder="Recipient Email"
        value={emailData.to}
        onChange={handleChange}
        required
      />
      <input
        type="text"
        name="subject"
        placeholder="Subject"
        value={emailData.subject}
        onChange={handleChange}
        required
      />
      <textarea
        name="text"
        placeholder="Message"
        value={emailData.text}
        onChange={handleChange}
        required
      ></textarea>
      <button type="submit">Send Email</button>
    </form>
  );
}

export default EmailForm;

