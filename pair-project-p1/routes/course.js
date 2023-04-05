const express = require('express');
const Controller = require('../controllers/controller');
const router = express.Router()


router.get('/add', Controller.formAddCourses)
router.post('/add', Controller.createCourses)
router.get('/:courseId', Controller.coursesDetail)
router.get('/:courseId/delete', Controller.deleteCourses)
router.get('/:courseId/edit', Controller.formEditCourses)
router.post('/:courseId/edit', Controller.updateCourses)

module.exports = router;