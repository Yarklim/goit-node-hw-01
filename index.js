const { program } = require('commander');

program
  .option('-a, --action <type>', 'choose action')
  .option('-i, --id <type>', 'user id')
  .option('-n, --name <type>', 'user name')
  .option('-e, --email <type>', 'user email')
  .option('-p, --phone <type>', 'user phone');

program.parse();

const options = program.opts();

const contacts = require('./contacts');

async function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case 'list':
      const allContacts = await contacts.listContacts();
      return console.table(allContacts);

    case 'get':
      const oneContact = await contacts.getContactById(id);
      return console.table(oneContact);

    case 'add':
      const newContact = await contacts.addContact({ name, email, phone });
      return console.table(newContact);

    case 'remove':
      const removeContact = await contacts.removeContact(id);
      return console.table(removeContact);

    default:
      return console.warn('\x1B[31m Unknown action type!');
  }
}

invokeAction(options);
