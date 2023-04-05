const express = require('express');
const Controller = require('../controllers/controller');
const router = express.Router()

router.get('/', Controller.home)//
router.get('/category/add', Controller.formAddCategory)//
router.post('/category/add', Controller.createCategory)//
router.get('/category/delete/:categoryId', Controller.deleteCategory)//
router.get('/category/edit/:categoryId', Controller.formEditCategory)//
router.post('/category/edit/:categoryId', Controller.updateCategory)//
router.get('/:categoryId', Controller.coursesList)//
router.use('/:categoryId/courses', require("./course"))
module.exports = router;