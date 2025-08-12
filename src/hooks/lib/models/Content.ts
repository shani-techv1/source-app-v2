import mongoose, { Schema, Document } from 'mongoose';

export interface IContent extends Document {
  section: string;
  items: Array<{
    id: string;
    title: string;
    type: string;
    value: any;
    placeholder?: string;
    maxLength?: number;
  }>;
  createdAt: Date;
  updatedAt: Date;
}

const ContentItemSchema: Schema = new Schema({
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
    type: Schema.Types.Mixed,
    required: true
  },
  placeholder: {
    type: String
  },
  maxLength: {
    type: Number
  }
}, { _id: false });

const ContentSchema: Schema = new Schema({
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

// Create index for section
ContentSchema.index({ section: 1 });

export default mongoose.models.Content || mongoose.model<IContent>('Content', ContentSchema); 