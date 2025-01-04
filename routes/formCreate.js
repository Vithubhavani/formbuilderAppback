const express = require('express');
const router = express.Router();
const { FormCreate } = require('../schema/formCreate.schema');


router.post("/", async (req, res) => {
    try {
        const { title, elements } = req.body;
        const { user } = req;
        
        const createform = new FormCreate({
            title,
            elements, 
            creator: user
        });
        
        await createform.save();
        res.status(201).json({ formId: createform._id });
    } catch (error) {
        console.error("Error creating form:", error);
        res.status(500).json({ message: 'Error creating form', error: error.message });
    }
});


router.get("/", async (req, res) => {
    try {
        const createforms = await FormCreate.find();
        res.status(200).json(createforms);
    } catch (error) {
        console.error("Error fetching forms:", error);
        res.status(500).json({ message: 'Error fetching forms', error: error.message });
    }
});


router.get("/:id", async (req, res) => {
    try {
        const form = await FormCreate.findByIdAndUpdate(
            req.params.id,
            { $inc: { views: 1 } },
            { new: true }
        );

        if (!form) {
            return res.status(404).json({ message: 'Form not found' });
        }

        res.status(200).json(form);
    } catch (error) {
        console.error("Error fetching form:", error);
        res.status(500).json({ message: 'Error fetching form', error: error.message });
    }
});


router.put("/:id", async (req, res) => {
    try {
        const { title, elements } = req.body;
        const { user } = req;

        const form = await FormCreate.findByIdAndUpdate(
            req.params.id,
            { title, elements, creator: user },
            { new: true }
        );

        if (!form) {
            return res.status(404).json({ message: 'Form not found' });
        }

        res.status(200).json(form);
    } catch (error) {
        console.error("Error updating form:", error);
        res.status(500).json({ message: 'Error updating form', error: error.message });
    }
});


router.get("/:id/share", async (req, res) => {
    try {
        const form = await FormCreate.findById(req.params.id);

        if (!form) {
            return res.status(404).json({ message: 'Form not found' });
        }

        res.status(200).json(form);
    } catch (error) {
        console.error("Error sharing form:", error);
        res.status(500).json({ message: 'Error sharing form', error: error.message });
    }
});


router.get("/:id/results", async (req, res) => {
    try {
        const form = await FormCreate.findById(req.params.id);

        if (!form) {
            return res.status(404).json({ message: 'Form not found' });
        }

        res.status(200).json({
            title: form.title,
            views: form.views,
            submissions: form.submissions,
            submittedData: form.submittedData,
        });
    } catch (error) {
        console.error("Error fetching results:", error);
        res.status(500).json({ message: 'Error fetching results', error: error.message });
    }
});

router.put("/:id/submit", async (req, res) => {
    try {
        const { inputs } = req.body;

        const form = await FormCreate.findByIdAndUpdate(
            req.params.id,
            {
                $inc: { submissions: 1 },
                $push: { submittedData: { inputs } },
            },
            { new: true }
        );

        if (!form) {
            return res.status(404).json({ message: 'Form not found' });
        }

        res.status(200).json({ message: 'Form submitted successfully', form });
    } catch (error) {
        console.error("Error submitting form:", error);
        res.status(500).json({ message: 'Error submitting form', error: error.message });
    }
});

module.exports = router;
