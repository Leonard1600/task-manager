import mongoose from "mongoose";

const taskSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
      minlength: [3, "El título debe tener al menos 3 caracteres"],
    },
    completed: {
      type: Boolean,
      default: false,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

// Índice para mejorar performance por usuario
taskSchema.index({ user: 1, createdAt: -1 });

const Task = mongoose.model("Task", taskSchema);

export default Task;

