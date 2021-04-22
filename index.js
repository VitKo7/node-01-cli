const contacts = require("./contacts");
const argv = require("yargs").argv;

function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case "list":
      contacts.listContacts().then((data) => console.table(data));
      // const result = async contacts.listContacts(); //! not working;
      // console.table(result)
      break;

    case "get":
      contacts.getContactById(id).then((data) => console.table(data));
      break;

    case "add":
      contacts
        .addContact(name, email, phone)
        .then((data) => console.table(data));
      break;

    case "remove":
      contacts.removeContact(id).then((data) => console.table(data));
      break;

    default:
      console.warn("\x1B[31m Unknown action type!");
  }
}

invokeAction(argv);
