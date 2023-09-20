const Notes = require("../Models/NoteModel");
const cloudinary = require("../utils/cloudinary");

// TODO: get all notes of the user
const getAllNotes = async (req, res) => {
  const id = req.params.id;
  try {
    const notes = await Notes.find();
    const userNotes = notes.filter((note) => note.creatorID.toString() === id);

    return res
      .json({
        succcess: true,
        message: "All notes fetch successfully!",
        userNotes,
      })
      .status(200);
  } catch (error) {
    res.json({
      succcess: false,
      error: "Failed to get all notes!",
    });
  }
};
// TODO: get the specific notes
const getNote = async (req, res) => {
  try {
    const { postID } = req.body;
    const note = await Notes.findById(postID);
    return res
      .json({
        succcess: true,
        message: "Note fetch successfully!",
        note,
      })
      .status(200);
  } catch (error) {
    res.json({
      succcess: false,
      error: "Failed to get note!",
    });
  }
};
// TODO: create new note
const addNote = async (req, res) => {
  const { title, description, isPinned, isBookmarked, image } = req.body;
  const id = req.params.id;
  try {
    if (image) {
      //? if theres an image
      const result = await cloudinary.uploader.upload(image, {
        folder: "Notary",
      });

      const newNote = await new Notes({
        creatorID: id,
        title,
        description,
        isPinned,
        isBookmarked,
        image: {
          imageID: result.public_id,
          url: result.secure_url,
        },
      });

      await newNote.save();
      return res.status(200).json({
        success: true,
        message: "Posted successfully!",
        newNote,
      });
    } else {
      const newNote = await new Notes({
        creatorID: id,
        title,
        description,
        isPinned,
        isBookmarked,
      });
      await newNote.save();
      return res.status(200).json({
        success: true,
        message: "Posted successfully!",
        newNote,
      });
    }
  } catch (error) {
    return res
      .json({
        succcess: false,
        message: "Failed to add new note!",
      })
      .status(500);
  }
};
// TODO: delete specific note
const deleteNote = async (req, res) => {
  const id = req.params.id;
  try {
    const note = await Notes.findById(id);

    if (note.image.imageID) {
      await cloudinary.uploader.destroy(note.image.imageID);
    }

    const deletedNote = await Notes.findByIdAndRemove(id);
    return res.status(200).json({
      success: true,
      message: "Note deleted successfully!",
      deletedNote,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: "Failed to delete note!",
    });
  }
};
// TODO: update specific note
const updateNote = async (req, res) => {
  const { title, description } = req.body;
  const id = req.params.id;
  try {
    const note = await Notes.findOne({ _id: id });

    if (title) note.title = title;
    if (description) note.description = description;
    await note.save();
    return res.status(200).json({
      success: true,
      message: "Note update successfully",
      note,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: "Failed to update note!",
    });
  }
};

const updateImage = async (req, res) => {
  const id = req.params.id;
  const { image } = req.body;
  try {
    const note = await Notes.findById(id);

    if (!note.image.url) {
      if (image) {
        const result = await cloudinary.uploader.upload(image, {
          folder: "Notary",
        });
        note.image.imageID = result.public_id;
        note.image.url = result.secure_url;
      }
    } else {
      if (image) {
        //* get the image in cloudinary and delete
        const imgID = note.image.imageID;
        await cloudinary.uploader.destroy(imgID);

        //* upload a new image and replace in database
        const result = await cloudinary.uploader.upload(image, {
          folder: "Notary",
        });

        note.image.imageID = result.public_id;
        note.image.url = result.secure_url;
      }
    }

    await note.save();
    return res.status(200).json({
      success: true,
      message: "Note image updated successfully",
      note,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: "Failed to update image note!",
    });
  }
};

// TODO: update pin
const updatePin = async (req, res) => {
  const id = req.params.id;
  try {
    const note = await Notes.findById(id);
    note.isPinned = !note.isPinned;
    await note.save();
    res.status(200).json({
      success: 200,
      message: "Note pinned update!",
      note,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: "Failed to pin note!",
    });
  }
};
// TODO: update bookmark
const updateBookmark = async (req, res) => {
  const id = req.params.id;
  try {
    const note = await Notes.findById(id);
    note.isBookmarked = !note.isBookmarked;
    await note.save();
    res.status(200).json({
      success: 200,
      message: "Note bookmarked update!",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: "Failed to pin note!",
    });
  }
};
// TODO: update completed
const updateComplete = async (req, res) => {
  const id = req.params.id;
  try {
    const note = await Notes.findById(id);
    note.isCompleted = !note.isCompleted;
    await note.save();
    res.status(200).json({
      success: 200,
      message: "Note complete update!",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: "Failed to pin note!",
    });
  }
};

module.exports = {
  getAllNotes,
  getNote,
  addNote,
  deleteNote,
  updateNote,
  updatePin,
  updateBookmark,
  updateComplete,
  updateImage,
};
