const router = require('express').Router();

// const { adminRegister, adminLogIn, deleteAdmin, getAdminDetail, updateAdmin } = require('../controllers/admin-controller.js');

const { adminRegister, adminLogIn, getAdminDetail} = require('../controllers/admin-controller.js');

const { sclassCreate, sclassList, deleteSclass, deleteSclasses, getSclassDetail, getSclassStudents } = require('../controllers/class-controller.js');
const { complainCreate, complainList } = require('../controllers/complain-controller.js');
const { noticeCreate, noticeList, deleteNotices, deleteNotice, updateNotice } = require('../controllers/notice-controller.js');
const {
    studentRegister,
    studentLogIn,
    getStudents,
    getStudentDetail,
    deleteStudents,
    deleteStudent,
    updateStudent,
    studentAttendance,
    deleteStudentsByClass,
    updateExamResult,
    clearAllStudentsAttendanceBySubject,
    clearAllStudentsAttendance,
    removeStudentAttendanceBySubject,
    removeStudentAttendance } = require('../controllers/student_controller.js');
const { subjectCreate, classSubjects, deleteSubjectsByClass, getSubjectDetail, deleteSubject, freeSubjectList, allSubjects, deleteSubjects, updateCurrentSession, getSubCodeBySubName } = require('../controllers/subject-controller.js');
const { teacherRegister, teacherLogIn, getTeachers, getTeacherDetail, deleteTeachers, deleteTeachersByClass, deleteTeacher, updateTeacherSubject, teacherAttendance } = require('../controllers/teacher-controller.js');

// Admin
router.post('/AdminReg', adminRegister);
router.post('/AdminLogin', adminLogIn);

router.get("/Admin/:id", getAdminDetail)
// router.delete("/Admin/:id", deleteAdmin)

// router.put("/Admin/:id", updateAdmin)

// Student

router.post('/StudentReg', studentRegister);
router.post('/StudentLogin', studentLogIn)

router.get("/Students/:id", getStudents)
router.get("/Student/:id", getStudentDetail)

router.delete("/Students/:id", deleteStudents)
router.delete("/StudentsClass/:id", deleteStudentsByClass)
router.delete("/Student/:id", deleteStudent)

router.put("/Student/:id", updateStudent)

router.put('/UpdateExamResult/:id', updateExamResult)

router.put('/StudentAttendance/:id', studentAttendance)

router.put('/RemoveAllStudentsSubAtten/:id', clearAllStudentsAttendanceBySubject);
router.put('/RemoveAllStudentsAtten/:id', clearAllStudentsAttendance);

router.put('/RemoveStudentSubAtten/:id', removeStudentAttendanceBySubject);
router.put('/RemoveStudentAtten/:id', removeStudentAttendance)

// Teacher

router.post('/TeacherReg', teacherRegister);
router.post('/TeacherLogin', teacherLogIn)

router.get("/Teachers/:id", getTeachers)
router.get("/Teacher/:id", getTeacherDetail)

router.delete("/Teachers/:id", deleteTeachers)
router.delete("/TeachersClass/:id", deleteTeachersByClass)
router.delete("/Teacher/:id", deleteTeacher)

router.put("/TeacherSubject", updateTeacherSubject)

router.post('/TeacherAttendance/:id', teacherAttendance)

// Notice

router.post('/NoticeCreate', noticeCreate);

router.get('/NoticeList/:id', noticeList);

router.delete("/Notices/:id", deleteNotices)
router.delete("/Notice/:id", deleteNotice)

router.put("/Notice/:id", updateNotice)

// Complain

router.post('/ComplainCreate', complainCreate);

router.get('/ComplainList/:id', complainList);

// Sclass

router.post('/SclassCreate', sclassCreate);

router.get('/SclassList/:id', sclassList);
router.get("/Sclass/:id", getSclassDetail)

router.get("/Sclass/Students/:id", getSclassStudents)

router.delete("/Sclasses/:id", deleteSclasses)
router.delete("/Sclass/:id", deleteSclass)

// Subject

router.post('/SubjectCreate', subjectCreate);
router.put('/subjects/:subCode/session', updateCurrentSession);

router.get('/AllSubjects/:id', allSubjects);
router.get('/ClassSubjects/:id', classSubjects);
router.get('/FreeSubjectList/:id', freeSubjectList);
router.get("/Subject/:id", getSubjectDetail)

router.get('/getSubCode/:subName', async (req, res) => {
  try {
    console.log(req.params.subName);
      const subName = req.params.subName;  // Get subName from the route parameter
      const subCode = await getSubCodeBySubName(subName);  // Call the controller function

      // Send the subCode in the response
      res.json({ subCode });
  } catch (error) {
      res.status(500).json({ message: error.message });  // Handle errors
  }
});

router.delete("/Subject/:id", deleteSubject)
router.delete("/Subjects/:id", deleteSubjects)
router.delete("/SubjectsClass/:id", deleteSubjectsByClass)



const MissedSession = require('../models/MissedSession');

// Get all missed sessions
router.get('/missed-sessions', async (req, res) => {
    try {
        const sessions = await MissedSession.find();  // Replace with your DB query logic
        res.json(sessions);
    } catch (err) {
        res.status(500).json({ message: 'Error fetching missed sessions' });
    }
});

// Report a missed session
router.post('/report-missed-session', async (req, res) => {
    const { teacherName, subjectName, className, date, startTime, endTime} = req.body;
    try {
        const newSession = new MissedSession({
            teacherName,
            subjectName,
            className,
            date,
            startTime,
            endTime,
            isRecovered: false,
        });

        const savedSession = await newSession.save();
        res.status(200).json(savedSession);
    } catch (err) {
        res.status(500).json({ message: 'Error reporting missed session' });
    }
});

// Mark a session as recovered
router.post('/recover-session/:sessionId', async (req, res) => {
    const { sessionId } = req.params;
    try {
        const session = await MissedSession.findById(sessionId);
        if (!session) {
            return res.status(404).json({ message: 'Session not found' });
        }

        session.isRecovered = true;
        await session.save();
        res.status(200).json(session);
    } catch (err) {
        res.status(500).json({ message: 'Error recovering session' });
    }
});


// Example database model for student attendance (use your actual database schema)
const Student = require('../models/studentSchema.js');
const Subject = require('../models/subjectSchema.js');

// Route to verify attendance
router.post('/verifyAttendance', async (req, res) => {
    const { sessionID, studentID } = req.body;
  
    // Fetch the student and session
    const student = await Student.findOne({ rollNum: studentID });
    
    const session = await AttendanceSession.findOne({ code: sessionID });
  
    if (!student) {
      return res.status(400).send({ message: 'Student not found.' });
    }
  
    if (!session) {
      return res.status(400).send({ message: 'Session not found.' });
    }
  
    // Check if the student has already been marked present for this session
    
    const studentsession = await AttendanceSession.findById(student.attendanceSession);
    
    if (student.attendanceMarked && studentsession && studentsession.code === session.code) {
        console.log("already marked");
      //return res.status(400).send({ message: 'Attendance already marked for this session.' });
      res.send({ verified: false, message: 'Attendance marked as present already!.' });
    }else{
        const session2 = await AttendanceSession.findOne().sort({ createdAt: -1 });
        console.log(session2.code);
    if(session2.code===sessionID)
    {
        const subject = await Subject.findOne({ subCode: session2.subCode });
        const name = subject.subName;
        student.attendanceMarked = true;
        student.attendanceSession = session._id;  // Store session ID to avoid duplicate attendance
        student.attendance.push({
            date: new Date(),
            status: 'Present', // or 'Absent' based on attendance
            subName: subject._id // This should be the subject ID from the session
          }); // Add attendance record to student's attendance array
        await student.save();
      
        res.send({ verified: true, message: 'Attendance marked as present.' });
    }else{
        res.send({ verified: false, message: 'Attendance code is incorrect.' });
    }
    
    }
  });

const AttendanceSession = require('../models/AttendanceSession');

// Function to get the latest teacher attendance code
async function getTeacherAttendanceCode() {
  const session = await AttendanceSession.findOne().sort({ createdAt: -1 });
  return session ? session.code : null;
}


router.post('/attendanceSessions', async (req, res) => {
  try {
    
    const { code, subCode } = req.body;
    console.log(code)
    console.log(subCode);
    const newSession = new AttendanceSession({ code, subCode });
    await newSession.save();
    res.status(201).send({ message: 'Attendance session created.' });
  } catch (error) {
    res.status(500).send({ message: 'Error creating session.' });
  }
});


module.exports = router;