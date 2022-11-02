const express = require('express');
const fetchuser = require('../middleware/fetchuser');
const Note = require('../models/Note');
const { body, validationResult } = require('express-validator');

const router = express.Router();

// Route:1 fetching all notes on the route api/notes/fetchallnotes login required
router.get('/fetchallnotes', fetchuser, async (req, res) => {
    try {
        const notes = await Note.find({ user: req.user.id });   //req.user is coming from the middleware fetchuser
        res.json(notes);
    } catch (error) {
        res.status(500).send("internal server error occured");
    }
})

// Route:2 add a note using POST on the route api/notes/addnote login required
router.post('/addnote', fetchuser, [
    body('title', 'minimum length of the title should be 3').isLength({ min: 3 }), //this is from express validator
    body('description', 'description should be of 5 length').isLength({ min: 5 }),
], async (req, res) => {
    try {
        const { title, description, tag } = req.body;
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const note = new Note({
            title, description, tag, user: req.user.id
        })
        const savedNote = await note.save();
        res.json(savedNote);
    } catch (error) {
        console.log(error.message);
        res.status(500).send("internal server error occured");
    }
})


// Route:2 update a note using PUT on the route api/notes/updatenote login required
router.put('/updatenote/:id', fetchuser, async (req, res) => {
    try {
        const { title, description, tag } = req.body;

        const newNote = {};
        if (title) { newNote.title = title }
        if (description) { newNote.description = description }
        if (tag) { newNote.tag = tag }


        // find the note to be updated and update it
        let note =await Note.findById(req.params.id); //from notes note of the specfic id will be in note
        if (!note) {
            return res.status(404).send("not found")
        }


        // here if user !== user id that is requested     
        if (note.user.toString() !== req.user.id) {
            return res.status(401).send("not allowed");
        }
        note = await Note.findByIdAndUpdate(req.params.id, { $set: newNote }, { new: true })
        
        res.json(note)

    } catch (error) {
        console.log(error.message);
        res.status(500).send("internal server error occured");
    }

})


// Route:2 Delete a note using DELETE method on the route api/notes/deletenote login required
router.delete('/deletenote/:id', fetchuser, async (req, res) => {
    try {

        let note =await Note.findById(req.params.id); //from notes note of the specfic id will be in note
        if (!note) {
            return res.status(404).send("not found")
        }
        
        // here if user !== user id that is requested     
        if (note.user.toString() !== req.user.id) {
            return res.status(401).send("not allowed");
        }
        
        note = await Note.findByIdAndDelete(req.params.id);
        res.json({"success": "note has benn deleted", note:note})

    } catch (error) {
        console.log(error.message);
        res.status(500).send("internal server error occured");
    }
})


module.exports = router