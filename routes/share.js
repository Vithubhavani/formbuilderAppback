// backend/routes/share.js
const express = require('express');
const router = express.Router();
const { Folder } = require('../schema/folder.schema');
const { Form } = require('../schema/form.schema');
const authMiddleware = require('../middleware/auth');

// Generate a shareable link
router.post('/generate-link', authMiddleware, async (req, res) => {
  try {
    const { folderId, formId, accessType } = req.body;
    const { user } = req;

    // Check if the user is the creator of the folder and form
    const folder = await Folder.findById(folderId);
    const form = await Form.findById(formId);
    
    if (!folder || !form) {
      return res.status(404).json({ message: 'Folder or Form not found' });
    }

    if (folder.creator.toString() !== user._id.toString() || form.creator.toString() !== user._id.toString()) {
      return res.status(403).json({ message: 'Unauthorized to share this folder/form' });
    }


    const shareLink = `http://localhost:5173/share/${folderId}/${formId}?access=${accessType}`;

    res.status(200).json({ link: shareLink });

  } catch (error) {
    console.error(error);
    res.status(400).json({ message: 'Error generating share link' });
  }
});

module.exports = router;
