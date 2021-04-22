const fs = require("fs").promises;
// const fs = require("fs"); //w/o promises, use callback;
const path = require("path");

const contactsPath = path.join(__dirname, "db", "contacts.json");

const listContacts = async () => {
  try {
    const list = await fs.readFile(contactsPath, "utf8");
    const result = JSON.parse(list.toString());
    console.table(result);
    // return result;
  } catch (error) {
    console.error(error.message);
  }
};

// /* w/o promises, use callback; */
// async function listContacts() {
//   try {
//     const data = await fs.readFile(contactsPath, "utf8");
//     const result = JSON.parse(data);
//     console.table(result);
//  or
//     return result;
//   } catch (error) {
//     console.log(error);
//   }
// }

const getContactById = async (contactId) => {
  try {
    const data = await fs.readFile(contactsPath, "utf8"); // ! можно ли вынести код, который дублируется?
    const result = JSON.parse(data.toString()); // ! можно ли вынести код, который дублируется?

    //! как вывести предупреждение что такоего id нет? введите id в диапазоне от (result[0]) до (result.length)

    const filteredContacts = result.find(
      (contact) => contact.id === Number(contactId)
    );
    console.table(filteredContacts);
    // return filteredContacts;
  } catch (error) {
    console.error(error);
  }
};

const removeContact = async (contactId) => {
  try {
    const data = await fs.readFile(contactsPath, "utf8");
    const result = JSON.parse(data.toString());
    const updatedContacts = result.filter((contact) => contact.id != contactId);
    // console.log(updatedContacts);
    // return updatedContacts;

    const listNew = JSON.stringify(updatedContacts, null, "\t");
    await fs.writeFile(contactsPath, listNew);

    const dataNew = await fs.readFile(contactsPath, "utf8");
    const resultNew = JSON.parse(dataNew.toString());

    console.table(resultNew);
    // return resultNew;
  } catch (error) {
    console.error(error);
  }
};

const addContact = async (name, email, phone) => {
  try {
    const data = await fs.readFile(contactsPath, "utf8");
    const result = JSON.parse(data.toString());
    const lastId = result[result.length - 1].id;

    // console.log(lastId);

    const contactNew = {
      id: Number(lastId) + 1,
      name,
      email,
      phone,
    };

    const addedContacts = JSON.stringify([...result, contactNew], null, "\t");
    await fs.writeFile(contactsPath, addedContacts);

    const dataNew = await fs.readFile(contactsPath, "utf8");
    const resultNew = JSON.parse(dataNew.toString());

    console.table(resultNew);
    // return resultNew;
  } catch (error) {
    console.error(error);
  }
};

// listContacts();
// getContactById(contactId);
// removeContact(10);
// addContact("John Black", "john@mail.com", "(111) 222-3344");
// addContact(name, email, phone);

module.exports = { listContacts, getContactById, removeContact, addContact };
