const fs = require("fs/promises");
const path = require("path");
const contactsList = path.join(__dirname, "db/contacts.json");
const { nanoid } = require("nanoid");

const listContacts = async () => {
  const data = await fs.readFile(contactsList);
  const contacts = JSON.parse(data);
  return contacts;
};

const getContactById = async (contactId) => {
  const contacts = await listContacts();
  const result = contacts.find((contact) => contact.id === contactId);
  return result || null;
};

const removeContact = async (contactId) => {
  const contacts = await listContacts();
  const index = contacts.findIndex((contact) => contact.id === contactId);
  if(index === -1) {
    return null;
  }
  const [contactDelete] = contacts.splice(index, 1);
  await fs.writeFile(contactsList, JSON.stringify(contacts, null, 2));
  return (contactDelete);
};

const addContact = async (data) => {
  const contacts = await listContacts();
  const newContact = {
    id: nanoid(),
    ...data,
  };
  contacts.push(newContact);
  await fs.writeFile(contactsList, JSON.stringify(contacts, null, 2));
  return newContact;
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
