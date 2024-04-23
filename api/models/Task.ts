import { Schema, model } from "mongoose";

const TaskSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'User',
  },
  title: {
    type: String,
    required: true,
  },
  description: String,
  status: {
    type: String,
    enum: ["new", "in_progress", "complete"],
    default: "new",
    required: true ,
  },
});

const Task = model('Task', TaskSchema);

export default Task;
