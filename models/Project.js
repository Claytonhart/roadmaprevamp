const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const BoardSchema = require('./Board');

const ProjectSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  users: [
    {
      type: Schema.Types.ObjectId,
      ref: 'user'
    }
  ],
  owner: {
    type: Schema.Types.ObjectId,
    ref: 'user'
  },
  board: BoardSchema.schema,
  createdDate: {
    type: Date,
    default: Date.now
  },
  editedDate: {
    type: Date,
    default: Date.now
  }
});

module.exports = Project = mongoose.model('project', ProjectSchema);
