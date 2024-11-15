const Subject = require('../models/subjectSchema.js');
const Teacher = require('../models/teacherSchema.js');
const Student = require('../models/studentSchema.js');
const mongoose = require('mongoose');

const subjectCreate = async (req, res) => {
    try {
        const subjects = req.body.subjects.map((subject) => ({
            subName: subject.subName,
            subCode: subject.subCode,
            sessions: subject.sessions,
            current_session: subject.current_session,
        }));

        const existingSubjectBySubCode = await Subject.findOne({
            'subjects.subCode': subjects[0].subCode,
            school: req.body.adminID,
        });

        if (existingSubjectBySubCode) {
            res.send({ message: 'Sorry this subcode must be unique as it already exists' });
        } else {
            const newSubjects = subjects.map((subject) => ({
                ...subject,
                sclassName: req.body.sclassName,
                school: req.body.adminID,
            }));

            const result = await Subject.insertMany(newSubjects);
            res.send(result);
        }
    } catch (err) {
        res.status(500).json(err);
    }
};

const allSubjects = async (req, res) => {
    try {
        let subjects = await Subject.find({ school: req.params.id })
            .populate("sclassName", "sclassName")
        if (subjects.length > 0) {
            res.send(subjects)
        } else {
            res.send({ message: "No subjects found" });
        }
    } catch (err) {
        res.status(500).json(err);
    }
};

const classSubjects = async (req, res) => {
    try {
        let subjects = await Subject.find({ sclassName: req.params.id })
        if (subjects.length > 0) {
            res.send(subjects)
        } else {
            res.send({ message: "No subjects found" });
        }
    } catch (err) {
        res.status(500).json(err);
    }
};

const freeSubjectList = async (req, res) => {
    try {
        let subjects = await Subject.find({ sclassName: req.params.id, teacher: { $exists: false } });
        if (subjects.length > 0) {
            res.send(subjects);
        } else {
            res.send({ message: "No subjects found" });
        }
    } catch (err) {
        res.status(500).json(err);
    }
};

const getSubjectDetail = async (req, res) => {
    try {
        let subject = await Subject.findById(req.params.id);
        if (subject) {
            subject = await subject.populate("sclassName", "sclassName")
            subject = await subject.populate("teacher", "name")
            res.send(subject);
        }
        else {
            res.send({ message: "No subject found" });
        }
    } catch (err) {
        res.status(500).json(err);
    }
}

const deleteSubject = async (req, res) => {
    try {
        const deletedSubject = await Subject.findByIdAndDelete(req.params.id);

        // Set the teachSubject field to null in teachers
        await Teacher.updateOne(
            { teachSubject: deletedSubject._id },
            { $unset: { teachSubject: "" }, $unset: { teachSubject: null } }
        );

        // Remove the objects containing the deleted subject from students' examResult array
        await Student.updateMany(
            {},
            { $pull: { examResult: { subName: deletedSubject._id } } }
        );

        // Remove the objects containing the deleted subject from students' attendance array
        await Student.updateMany(
            {},
            { $pull: { attendance: { subName: deletedSubject._id } } }
        );

        res.send(deletedSubject);
    } catch (error) {
        res.status(500).json(error);
    }
};

const deleteSubjects = async (req, res) => {
    try {
        const deletedSubjects = await Subject.deleteMany({ school: req.params.id });

        // Set the teachSubject field to null in teachers
        await Teacher.updateMany(
            { teachSubject: { $in: deletedSubjects.map(subject => subject._id) } },
            { $unset: { teachSubject: "" }, $unset: { teachSubject: null } }
        );

        // Set examResult and attendance to null in all students
        await Student.updateMany(
            {},
            { $set: { examResult: null, attendance: null } }
        );

        res.send(deletedSubjects);
    } catch (error) {
        res.status(500).json(error);
    }
};

const deleteSubjectsByClass = async (req, res) => {
    try {
        const deletedSubjects = await Subject.deleteMany({ sclassName: req.params.id });

        // Set the teachSubject field to null in teachers
        await Teacher.updateMany(
            { teachSubject: { $in: deletedSubjects.map(subject => subject._id) } },
            { $unset: { teachSubject: "" }, $unset: { teachSubject: null } }
        );

        // Set examResult and attendance to null in all students
        await Student.updateMany(
            {},
            { $set: { examResult: null, attendance: null } }
        );

        res.send(deletedSubjects);
    } catch (error) {
        res.status(500).json(error);
    }
};

/*const updateCurrentSession = async (req, res) => {
    try {
        const { id } = req.params;
        const { current_session } = req.body;

        console.log("Received id:", id);
        console.log("Received current_session:", current_session);

        // Convert id to ObjectId if it's not already in the correct format
        const numericId = parseInt(id, 10);
        const subjectId = new mongoose.Types.ObjectId(numericId);
        console.log("Converted subjectId:", numericId);
        
        const subject = await Subject.findOneAndUpdate({ subCode:numericId }, { current_session }, { new: true });

        console.log("Updated subject:", subject);
        res.status(200).json(subject);
    } catch (error) {
        console.error("Error updating session:", error);
        res.status(500).json({ message: 'Error updating session', error });
    }
};*/

const updateCurrentSession = async (req, res) => {
    try {
        const { subCode } = req.params;  // Use subCode from URL params
        const { increment } = req.body;  // Get increment from body

        console.log("Received subCode:", subCode);
        console.log("Received increment:", increment);

        // Find the subject by subCode and increment the current_session
        const subject = await Subject.findOneAndUpdate(
            { subCode: subCode },  // Find the subject by subCode
            { $inc: { current_session: increment } },  // Increment the current_session
            { new: true }  // Return the updated subject
        );

        console.log("Updated subject:", subject);
        res.status(200).json(subject);  // Send the updated subject as a response
    } catch (error) {
        console.error("Error updating session:", error);
        res.status(500).json({ message: 'Error updating session', error });
    }
};

const getSubCodeBySubName = async (subName) => {
    try {
        // Find the subject by subName
        const subject = await Subject.findOne({ subName: subName });

        // Check if subject exists
        if (!subject) {
            throw new Error('Subject not found');
        }

        // Return the subCode
        return subject.subCode;
    } catch (error) {
        console.error('Error getting subCode:', error);
        throw error;
    }
};



module.exports = { subjectCreate, freeSubjectList, classSubjects, getSubjectDetail, deleteSubjectsByClass, deleteSubjects, deleteSubject, allSubjects, updateCurrentSession, getSubCodeBySubName };