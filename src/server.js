import express from 'express';
import { ObjectId } from 'mongodb';
import { getAllContacts, getContactById } from './services/contacts.js';

const setupServer = () => {
  const app = express();
  const PORT = process.env.PORT || 3000;

  app.use(express.json());

  app.get('/contacts', async (req, res) => {
    try {
      const contacts = await getAllContacts();
     res.status(200).json({
      status: 200,
      message: "Successfully found contacts!",
      data: contacts,
    });
  } catch (error) {
    res.status(500).json({
      status: 500,
      message: "Error fetching contacts", error: error.message,});
  }
});

   app.get('/contacts/:id', async (req, res) => {
    const contactId = req.params.id;
    try {
       const contact = await getContactById(ObjectId(contactId));
      if (!contact) {
        return res.status(404).json({
          status: 404,
          message: "Contact not found",
        });
      }
      res.status(200).json({
        status: 200,
        message: `Successfully found contact with id ${contactId}`,
        data: contact,
      });
    } catch (error) {
      res.status(500).json({
        status: 500,
        message: "Error fetching contact",
        error: error.message,
      });
    }
  });

  app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });
};

export default setupServer;
