import mongoose from 'mongoose';

const ContentItemSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  type: {
    type: String,
    required: true,
    enum: ['text', 'textarea', 'image', 'array', 'navMenu', 'accordion', 'pages', 'footerLinks']
  },
  value: {
    type: mongoose.Schema.Types.Mixed,
    required: true
  },
  placeholder: {
    type: String
  },
  maxLength: {
    type: Number
  }
}, { _id: false });

const ContentSchema = new mongoose.Schema({
  section: {
    type: String,
    required: true,
    unique: true,
    enum: ['hero', 'navigation', 'footer', 'general', 'whySourced', 'pages', 'footerLinks']
  },
  items: [ContentItemSchema]
}, {
  timestamps: true
});

export default mongoose.models.Content || mongoose.model('Content', ContentSchema); 