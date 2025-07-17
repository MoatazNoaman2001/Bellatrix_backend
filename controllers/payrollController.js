import PayrollModel from "../models/payrollModel.js";

export const getPayroll = async (req, res) => {
    try {
        const payroll = await PayrollModel.findOne({});
        return res.status(200).json(payroll);
    } catch (e) {
        console.log(`error: ${e}`);
        return res.status(401).json({ message: e.message || e });
    }
};

export const createPayroll = async (req, res) => {
    try {
        let data = req.body;
        if (req.file) {
            if (!data.hero) data.hero = {};
            data.hero = typeof data.hero === 'string' ? JSON.parse(data.hero) : data.hero;
            data.hero.backgroundImage = `/uploads/${req.file.filename}`;
        }
        const payroll = new PayrollModel(data);
        await payroll.save();
        return res.status(201).json(payroll);
    } catch (e) {
        console.log(`error: ${e}`);
        return res.status(400).json({ message: e.message || e });
    }
};

export const updatePayroll = async (req, res) => {
    try {
        let data = req.body;
        if (req.file) {
            if (!data.hero) data.hero = {};
            data.hero = typeof data.hero === 'string' ? JSON.parse(data.hero) : data.hero;
            data.hero.backgroundImage = `/uploads/${req.file.filename}`;
        }
        const payroll = await PayrollModel.findOneAndUpdate({}, data, { new: true });
        return res.status(200).json(payroll);
    } catch (e) {
        console.log(`error: ${e}`);
        return res.status(400).json({ message: e.message || e });
    }
};

export const deletePayroll = async (req, res) => {
    try {
        await PayrollModel.deleteOne({});
        return res.status(200).json({ message: "Payroll deleted" });
    } catch (e) {
        console.log(`error: ${e}`);
        return res.status(400).json({ message: e.message || e });
    }
}; 