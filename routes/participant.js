// routes/participant.js
const express = require("express");
const Participant = require("../models/Participant");
const router = express.Router();

// Obtener todas las duplas inscritas
router.get("/", async (req, res) => {
  try {
    const participants = await Participant.find();
    res.json(participants);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener participantes", error });
  }
});

router.post("/", async (req, res) => {
  try {
    const { player1, player2 } = req.body;

    // Verificar si alguno de los jugadores ya está inscrito
    const existingParticipant = await Participant.findOne({
      $or: [
        { "player1.email": player1.email },
        { "player2.email": player2.email },
      ],
    });

    if (existingParticipant) {
      return res.status(400).json({ message: "Uno de los jugadores ya está inscrito" });
    }

    // Convertir tournamentId a ObjectId
    const newParticipant = new Participant({
      player1,
      player2,
    });

    await newParticipant.save();
    res.status(201).json({ message: "Dupla inscrita exitosamente", newParticipant });

  } catch (error) {
    res.status(500).json({ message: "Error al inscribir la dupla", error });
  }
});

// Eliminar una dupla
router.delete("/:id", async (req, res) => {
  try {
    await Participant.findByIdAndDelete(req.params.id);
    res.json({ message: "Dupla eliminada exitosamente" });
  } catch (error) {
    res.status(500).json({ message: "Error al eliminar la dupla", error });
  }
});

// Actualizar una dupla
router.put("/:id", async (req, res) => {
  try {
    const updatedParticipant = await Participant.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json({ message: "Dupla actualizada exitosamente", updatedParticipant });
  } catch (error) {
    res.status(500).json({ message: "Error al actualizar la dupla", error });
  }
});

module.exports = router;