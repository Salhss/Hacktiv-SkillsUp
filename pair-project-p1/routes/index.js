const express = require('express');
const Controller = require('../controllers/controller');
const router = express.Router()


router.get('/', Controller.landingPage)
router.get("/signup", Controller.getSignUp)
router.post("/signup", Controller.postSignUp)
router.get("/login", Controller.getLogin)
router.post("/login", Controller.postLogin)

router.use(function(req, res, next) {
    if(!req.session.userId) {
        const error = 'Please log in first!'
        res.redirect(`login?error=${error}`)
    } else {
        next()
    }
})

const student = function logMethod (req, res, next) {
    if(req.session.userRole !== 'student') {
        res.redirect("/admin");
    } else {
        next()
    }
  }

const admin = function logMethod (req, res, next) {
    if(req.session.userRole !== 'administrator') {
        res.redirect("/student");
    } else {
        next()
    }
  }

router.get('/student', student, Controller.studentHome)
router.get('/admin', admin, Controller.home)
router.get('/category/add', admin, Controller.formAddCategory)//
router.post('/category/add', admin, Controller.createCategory)//
router.get('/category/delete/:categoryId', admin, Controller.deleteCategory)//
router.get('/category/edit/:categoryId', admin, Controller.formEditCategory)//
router.post('/category/edit/:categoryId', admin, Controller.updateCategory)//
router.get('/:categoryId', admin, Controller.coursesList)//
router.get('/student/:categoryId', student, Controller.coursesListStudent)//
router.get('/:categoryId/courses/add', admin, Controller.formAddCourses)//
router.post('/:categoryId/courses/add', admin, Controller.createCourses)//
router.get('/:categoryId/courses/:courseId', admin, Controller.coursesDetail)//
router.get('/student/:categoryId/courses/:courseId', student, Controller.coursesDetailStudent)//
router.get('/:categoryId/courses/:courseId/delete', admin, Controller.deleteCourses)
router.get('/:categoryId/courses/:courseId/edit', admin, Controller.formEditCourses)//
router.post('/:categoryId/courses/:courseId/edit', admin, Controller.updateCourses)//
module.exports = router;  