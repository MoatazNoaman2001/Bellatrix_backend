import mongoose from 'mongoose';

const fieldSchema = new mongoose.Schema({
  label: String,
  type: String,
  placeholder: String,
  required: { type: Boolean, default: false },
  options: [String]
});

const contactInfoSchema = new mongoose.Schema({
  title: String,
  fields: [fieldSchema]
});

const companyInfoSchema = new mongoose.Schema({
  title: String,
  fields: [fieldSchema]
});

const messageSchema = new mongoose.Schema({
  label: String,
  placeholder: String
});

const modalContentSchema = new mongoose.Schema({
  title: String,
  subtitle: String,
  formFields: {
    contactInfo: contactInfoSchema,
    companyInfo: companyInfoSchema,
    message: messageSchema,
    submitNote: String,
    submitText: String
  }
});

export default mongoose.model('ModalContent', modalContentSchema);