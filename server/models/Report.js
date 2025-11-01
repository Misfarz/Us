import mongoose from 'mongoose';

const reportSchema = new mongoose.Schema({
  reportedUserId: {
    type: String,
    required: true,
  },
  reporterId: {
    type: String,
    required: true,
  },
  reason: {
    type: String,
    required: true,
    enum: ['inappropriate_content', 'harassment', 'spam', 'hate_speech', 'other'],
  },
  description: {
    type: String,
    required: true,
  },
  messageId: {
    type: String,
    required: true,
  },
  roomId: {
    type: String,
    required: true,
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
  status: {
    type: String,
    enum: ['pending', 'reviewed', 'resolved'],
    default: 'pending',
  },
});

const Report = mongoose.model('Report', reportSchema);
export default Report;
