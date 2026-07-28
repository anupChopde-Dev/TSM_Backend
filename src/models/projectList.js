import mongoose from 'mongoose';

const projectListSchema = new mongoose.Schema({
  projectName: {
    type: String,
    required: true,
    trim: true,
  },
  startDate: {
    type: Date,
    required: true,
  },
  endDate: {
    type: Date,
    required: true,
  },
  users: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  }],
  selectedTaskIds: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'TaskList',
    required: true,
  }],
}, {
  timestamps: true,
});

const ProjectList = mongoose.model('ProjectList', projectListSchema);

export default ProjectList;
