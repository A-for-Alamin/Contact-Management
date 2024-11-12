import React, { useState } from "react";
import { ItemList } from "./components/itemList";
import "./App.css";

function App() {
  const [contacts, setContacts] = useState([]);
  const [newContact, setNewContact] = useState({
    name: "",
    phone: "",
    email: "",
  });
  const [editingContact, setEditingContact] = useState(null);
  const [search, setSearch] = useState("");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewContact((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddContact = (e) => {
    e.preventDefault();
    if (newContact.name && newContact.phone && newContact.email) {
      if (editingContact) {
        setContacts((prev) =>
          prev.map((contact) =>
            contact.id === editingContact.id
              ? { ...editingContact, ...newContact }
              : contact
          )
        );
        setEditingContact(null);
      } else {
        setContacts((prev) => [...prev, { id: Date.now(), ...newContact }]);
      }
      setNewContact({ name: "", phone: "", email: "" });
    }
  };

  const handleEditContact = (contact) => {
    setEditingContact(contact);
    setNewContact({
      name: contact.name,
      phone: contact.phone,
      email: contact.email,
    });
  };

  const handleDeleteContact = (id) => {
    setContacts(contacts.filter((contact) => contact.id !== id));
  };

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
  };

  const filteredContacts = contacts.filter((contact) =>
    contact.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="max-w-3xl mx-auto p-4">
      <h1 className="text-4xl font-bold text-center mb-4">
        Contact Management
      </h1>
      <input
        type="text"
        className="w-full p-2 border rounded mb-4"
        placeholder="Search contacts"
        value={search}
        onChange={handleSearchChange}
      />
      <form onSubmit={handleAddContact} className="mb-4">
        <div className="flex space-x-4">
          <input
            type="text"
            name="name"
            value={newContact.name}
            onChange={handleInputChange}
            className="w-full p-2 border rounded"
            placeholder="Name..."
            required
          />
          <input
            type="text"
            name="phone"
            value={newContact.phone}
            onChange={handleInputChange}
            className="w-full p-2 border rounded"
            placeholder="Phone..."
            required
          />
          <input
            type="email"
            name="email"
            value={newContact.email}
            onChange={handleInputChange}
            className="w-full p-2 border rounded"
            placeholder="Email..."
          />
        </div>
        <button
          type="submit"
          className="mt-2 bg-blue-500 text-white py-2 px-4 rounded w-full"
        >
          {editingContact ? "Update Contact" : "Add Contact"}
        </button>
      </form>

      <ul className="space-y-4">
        {filteredContacts.map((contact) => (
          <ItemList
            key={contact.id}
            {...contact}
            onEditClick={handleEditContact}
            onDelClick={handleDeleteContact}
          />
        ))}
      </ul>
    </div>
  );
}

export default App;
