// EmailForm.js
import React, { useState } from "react";
import "./EmailForm.css";

function EmailForm() {
  const [formData, setFormData] = useState({
    to: "",
    cc: "",
    bcc: "",
    subject: "",
    body: "",
    file: null,
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Convert file to base64
    const base64File = await toBase64(formData.file);
    const payload = {
      to: formData.to.split(",").map((e) => e.trim()),
      cc: formData.cc ? formData.cc.split(",").map((e) => e.trim()) : [],
      bcc: formData.bcc ? formData.bcc.split(",").map((e) => e.trim()) : [],
      subject: formData.subject,
      body: formData.body,
      base64File: base64File.split(",")[1], // remove metadata
      fileName: formData.file.name,
    };

    const res = await fetch(
      `https://springmailsender-production.up.railway.app/api/email/send-ccORbcc`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      }
    );

    alert(res.ok ? "Email Sent 🎉" : "Failed ❌");
  };

  const toBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });

  return (
    <form className="email-form" onSubmit={handleSubmit}>
      <h2>Send Email 🚀</h2>
      <input
        name="to"
        placeholder="To (comma separated)"
        onChange={handleChange}
        required
      />
      <input name="cc" placeholder="CC (optional)" onChange={handleChange} />
      <input name="bcc" placeholder="BCC (optional)" onChange={handleChange} />
      <input
        name="subject"
        placeholder="Subject"
        onChange={handleChange}
        required
      />
      <textarea
        name="body"
        placeholder="Email body..."
        onChange={handleChange}
        required
      />
      <input type="file" name="file" onChange={handleChange} required />
      <button type="submit">Send</button>
    </form>
  );
}

export default EmailForm;
