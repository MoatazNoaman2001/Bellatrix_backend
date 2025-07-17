import mongoose from 'mongoose';

const StepSchema = new mongoose.Schema({
  title: { type: String, required: true },
  desc: { type: String, required: true },
  details: { type: String, required: true },
  icon: { type: String, required: true },
  benefits: [{ type: String, required: true }]
});

const PayrollSchema = new mongoose.Schema({
  hero: {
    title: { type: String, required: true },
    subtitle: { type: String, required: true },
    backgroundImage: { type: String, required: true }
  },
  painPoints: [
    {
      text: { type: String, required: true }
    }
  ],
  howItWorks: {
    title: { type: String, required: true },
    description: { type: String, required: true }
  },
  workflowTitle: { type: String, required: true },
  workflowSubtitle: { type: String, required: true },
  workflowStepTitle: { type: String, required: true },
  stepper: {
    steps: [StepSchema]
  },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

PayrollSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

const PayrollModel = mongoose.model('Payroll', PayrollSchema);

export default PayrollModel; 