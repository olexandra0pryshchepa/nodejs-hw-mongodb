import express from 'express';
import { getAllContacts, getContactById } from './services/contacts.js';

const setupServer = () => {
  const app = express();
  const PORT = process.env.PORT || 3000;

  app.use(express.json());

  app.get('/contacts', async (req, res) => {
    try {
      const contacts = await getAllContacts();
      res.json(contacts);
    } catch (error) {
      res.status(500).json({ message: "Error fetching contacts", error: error.message });
    }
  });

  app.get('/contacts/:id', async (req, res) => {
    const contactId = req.params.id;
    try {
      const contact = await getContactById(contactId);
      if (!contact) {
        return res.status(404).json({ message: "Contact not found" });
      }
      res.json(contact);
    } catch (error) {
      res.status(500).json({ message: "Error fetching contact", error: error.message });
    }
  });

  app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });
};

export default setupServer;
