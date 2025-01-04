const express = require('express');
const router = express.Router();
const { Form } = require('../schema/form.schema');
const { Folder } = require('../schema/folder.schema');


router.get("/public/all", async (req, res) => {
  try {
      
      const folders = await Folder.find({ isPublic: true });

      
      const forms = await Form.find({ isPublic: true });

      const folderWithForms = folders.map(folder => ({
          ...folder.toObject(),
          forms: forms.filter(form => form.folderId && form.folderId.equals(folder._id)),
      }));

      const unlinkedForms = forms.filter(form => !form.folderId);

      res.status(200).json({
          folders: folderWithForms,
          unlinkedForms,
      });
  } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Error fetching public folders and forms" });
  }
});

router.get("/public/:folderIds/:formIds", async (req, res) => {
    try {
      const { folderIds, formIds } = req.params;
  
    
      const folderIdArray = folderIds.split(",");
      const formIdArray = formIds.split(",");
  
      const folders = await Folder.find({ _id: { $in: folderIdArray } });
      const forms = await Form.find({ _id: { $in: formIdArray } });

      res.status(200).json({
        folders,
        forms,
      });
    } catch (error) {
      console.error("Error fetching folders and forms by IDs:", error);
      res.status(500).json({ message: "Error fetching folders and forms" });
    }
  });
  




  

module.exports = router;
