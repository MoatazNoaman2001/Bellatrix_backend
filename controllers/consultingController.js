import ConsultingModel from "../models/consultingModel.js";

export const getConsulting = async (req, res) => {
    try {
        const consulting = await ConsultingModel.findOne({});
        return res.status(200).json(consulting);
    } catch (e) {
        console.log(`error: ${e}`);
        return res.status(401).json({ message: e.message || e });
    }
};

export const createConsulting = async (req, res) => {
    try {
        let data = req.body;
        if (req.file) {
            if (!data.hero) data.hero = {};
            data.hero = typeof data.hero === 'string' ? JSON.parse(data.hero) : data.hero;
            data.hero.backgroundImage = `/uploads/${req.file.filename}`;
        }
        const consulting = new ConsultingModel(data);
        await consulting.save();
        return res.status(201).json(consulting);
    } catch (e) {
        console.log(`error: ${e}`);
        return res.status(400).json({ message: e.message || e });
    }
};

export const updateConsulting = async (req, res) => {
    try {
        let data = req.body;
        if (req.file) {
            if (!data.hero) data.hero = {};
            data.hero = typeof data.hero === 'string' ? JSON.parse(data.hero) : data.hero;
            data.hero.backgroundImage = `/uploads/${req.file.filename}`;
        }
        const consulting = await ConsultingModel.findOneAndUpdate({}, data, { new: true });
        return res.status(200).json(consulting);
    } catch (e) {
        console.log(`error: ${e}`);
        return res.status(400).json({ message: e.message || e });
    }
};

export const deleteConsulting = async (req, res) => {
    try {
        await ConsultingModel.deleteOne({});
        return res.status(200).json({ message: "Consulting deleted" });
    } catch (e) {
        console.log(`error: ${e}`);
        return res.status(400).json({ message: e.message || e });
    }
}; 