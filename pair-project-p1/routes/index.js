const express = require('express');
const Controller = require('../controllers/controller');
const router = express.Router()


router.get('/student', Controller.studentHome)
router.get('/admin', Controller.home)//
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

router.get('/', Controller.verfication)
router.get('/category/add', Controller.formAddCategory)//
router.post('/category/add', Controller.createCategory)//
router.get('/category/delete/:categoryId', Controller.deleteCategory)//
router.get('/category/edit/:categoryId', Controller.formEditCategory)//
router.post('/category/edit/:categoryId', Controller.updateCategory)//
router.get('/:categoryId', Controller.coursesList)//
router.get('/student/:categoryId', Controller.coursesListStudent)//
router.get('/:categoryId/courses/add', Controller.formAddCourses)//
router.post('/:categoryId/courses/add', Controller.createCourses)//
router.get('/:categoryId/courses/:courseId', Controller.coursesDetail)//
router.get('/student/:categoryId/courses/:courseId', Controller.coursesDetailStudent)//
router.get('/:categoryId/courses/:courseId/delete', Controller.deleteCourses)
router.get('/:categoryId/courses/:courseId/edit', Controller.formEditCourses)//
router.post('/:categoryId/courses/:courseId/edit', Controller.updateCourses)//
module.exports = router;  