const express = require("express");
const {
  getAllNotes,
  getNote,
  addNote,
  deleteNote,
  updateNote,
  updatePin,
  updateBookmark,
  updateComplete,
  updateImage,
} = require("../Controller/NoteController");

const router = express.Router();

router.get("/:id", getAllNotes);
router.post("/", getNote);
router.post("/:id", addNote);
router.delete("/:id", deleteNote);
router.patch("/:id", updateNote);

router.get("/updatepin/:id", updatePin);
router.get("/updatebookmark/:id", updateBookmark);
router.get("/updatecomplete/:id", updateComplete);
router.post("/updateimage/:id", updateImage);

module.exports = router;
