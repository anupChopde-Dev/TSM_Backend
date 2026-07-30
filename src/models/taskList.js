import mongoose from 'mongoose';

const taskListSchema = new mongoose.Schema({
  taskName: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    trim: true,
  },
  sp: {
    type: Number,
    required: true,
    min: 0,
  },
  priority: {
    type: String,
    enum: ['Urgent','Low', 'Medium', 'High'],
    required: true,
  },
  docs: {
    type: [String],
    default: [],
  },
  status: {
  type: String,
  default: "todo",
}
}, {
  timestamps: true,
});

const TaskList = mongoose.model('TaskList', taskListSchema);

export default TaskList;
