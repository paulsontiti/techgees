"use client"
import React from 'react'
import { useState } from "react";

function RegisterForm() {
    const [form, setForm] = useState({ name: "", email: "", phone: "" });

     const WHATSAPP_GROUP_LINK =
    "https://chat.whatsapp.com/YOUR_GROUP_INVITE_LINK";

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const message = `Hello, my name is ${form.name}. I just registered for the Free 52 Weeks Frontend Web Development Program.`;
    const adminWhatsApp = `https://wa.me/2349167704504?text=${encodeURIComponent(
      message
    )}`;

    window.open(adminWhatsApp, "_blank");
    setTimeout(() => {
      window.location.href = WHATSAPP_GROUP_LINK;
    }, 1200);
  };
  return (
     <section
        id="register"
        className="bg-gradient-to-r from-green-600 to-emerald-500 py-20"
      >
        <div className="max-w-md mx-auto bg-white p-8 rounded-3xl shadow-xl">
          <h2 className="text-2xl font-bold text-center mb-6">
            Register & Join WhatsApp Class
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              className="w-full p-3 rounded border"
              placeholder="Full Name"
              required
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
            />
            <input
              className="w-full p-3 rounded border"
              placeholder="Email Address"
              type="email"
              required
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
            />
            <input
              className="w-full p-3 rounded border"
              placeholder="WhatsApp Number"
              required
              value={form.phone}
              onChange={(e) => setForm({ ...form, phone: e.target.value })}
            />
            <button className="w-full bg-green-600 text-white py-3 rounded-xl font-semibold hover:bg-green-700 transition">
              Join Free Program
            </button>
          </form>
        </div>
      </section>
  )
}

export default RegisterForm