const yargs = require("yargs");
const { hideBin } = require("yargs/helpers");
const arr = hideBin(process.argv);
const { argv } = yargs(arr);
const contactsFunc = require("./contacts");

const invokeAction = async ({ action, id, name, email, phone }) => {
  switch (action) {
    case "list":
      const contacts = await contactsFunc.listContacts();
      console.log(contacts);
      break;
    case "get":
      const contact = await contactsFunc.getContactById(id);
      console.log(contact);
      break;
    case "add":
      const newContact = await contactsFunc.addContact({ name, email, phone });
      console.log(newContact);
      break;
    case "remove":
      const removeContact = await contactsFunc.removeContact(id);
      console.log(removeContact);
      break;
    default:
      console.warn("\x1B[31m Unknown action type!");
  }
};

invokeAction(argv);
