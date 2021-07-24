const fs = require("fs").promises;
const path = require("path");
const { v4 } = require("uuid");

const contactsPath = path.join(__dirname, "db", "contacts.json");

async function listContacts() {
  try {
    const file = await fs.readFile(contactsPath);
    const data = JSON.parse(file);
    // console.log(data)
    return data;
  } catch (error) {
    console.log(error);
  }
}

async function getContactById(contactId) {
  try {
    const contacts = await listContacts();
    const contact = contacts.filter((elem) => elem.id === contactId);
    console.log(contact)
    return contact;
  } catch (error) {
    console.log(error);
  }
}

async function removeContact(contactId) {
  try {
    const contacts = await listContacts();
    const contact = contacts.filter(({ id }) => id !== contactId);
    const dataString = JSON.stringify(contact);
    fs.writeFile(contactsPath, dataString);
  } catch (error) {
    console.log(error);
  }
}

async function addContact(name, email, phone) {
  try {
    const contacts = await listContacts();
    const addingContact = { name, email, phone, id: v4() };
    console.log(addingContact)
    contacts.push(addingContact);
    const dataString = JSON.stringify(contacts);
    fs.writeFile(contactsPath, dataString);
  } catch (error) {
    console.log(error);
  }
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
