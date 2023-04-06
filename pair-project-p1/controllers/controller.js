const { Category, Course } = require('../models')
const { Op, where } = require('sequelize')

class Controller {
    static home(req, res) {
        Category.findAll({})
            .then((result) => {
                res.render('home', { result })
            })
            .catch(err => {
                console.log(err)
                res.send(err)
            })
    }
    static coursesList(req, res) {
        const { categoryId } = req.params
        Category.findAll({ where: { id: categoryId }, include: [{ model: Course }] })
            .then((result) => {
                console.log(result[0].dataValues.Courses)
                let getResult = result[0]
                res.render('coursesList', { getResult })

            })
            .catch(err => {
                console.log(err)
                res.send(err)
            })
    }
    static formAddCourses(req, res) {
        Category.findAll({ where: { id: req.params.categoryId } })
            .then((result) => {
                let getResult = result[0]
                res.render('addCourse', { getResult })
            })
            .catch(err => {
                console.log(err)
                res.send(err)
            })
    }
    static createCourses(req, res) {
        let data = {
            name: req.body.name,
            duration: req.body.duration,
            description: req.body.description,
            videoUrl: req.body.videoUrl,
            CategoryId: req.params.categoryId
        }
        Course.create(data)
            .then(() => {
                res.redirect(`/${req.params.categoryId}`)
            })
            .catch(err => {
                console.log(err)
                res.send(err)
            })
    }
    static coursesDetail(req, res) {
        const { categoryId, courseId } = req.params
        Course.findAll({ where: { id: courseId } })
            .then((result) => {
                let getResult = result[0]
                res.render('courseDetail', { getResult })
            })
            .catch(err => {
                console.log(err)
                res.send(err)
            })
    }
    static deleteCourses(req, res) {
        res.send('ini deleteCourses')
    }
    static formEditCourses(req, res) {
        const { categoryId, courseId } = req.params
        Course.findAll({ where: { id: courseId } })
            .then((result) => {
                let getResult = result[0]
                res.render('editCourse', {getResult})
            })
            .catch(err => {
                console.log(err)
                res.send(err)
            })
    }
    static updateCourses(req, res) {
        const { categoryId, courseId } = req.params
        let data = {
            name: req.body.name,
            duration: req.body.duration,
            description: req.body.description,
            videoUrl: req.body.videoUrl,
            CategoryId: categoryId
        }
        Course.update(data, {where: {id: courseId}})
        .then(() => {
            res.redirect(`/${categoryId}`)
        })
        .catch(err => {
            console.log(err)
            res.send(err)
        })
    }
    static formAddCategory(req, res) {
        const { categoryId } = req.params
        Course.destroy({ where: { id: categoryId } })
            .then(() => {
                res.redirect('/')
            })
            .catch(err => {
                console.log(err)
                res.send(err)
            })
        res.render('addCategory')
    }
    static createCategory(req, res) {
        Category.create({ name: req.body.name })
            .then(() => {
                res.redirect('/')
            })
            .catch(err => {
                console.log(err)
                res.send(err)
            })
    }
    static deleteCategory(req, res) {
        const { categoryId, courseId } = req.params
        Category.destroy({ where: { id: courseId } })
            .then(() => {
                res.redirect(`/${categoryId}`)
            })
            .catch(err => {
                console.log(err)
                res.send(err)
            })
    }
    static formEditCategory(req, res) {
        const { categoryId } = req.params
        Category.findAll({ where: { id: categoryId } })
            .then((result) => {
                let getResult = result[0]
                res.render('editCategory', { getResult })
            })
            .catch(err => {
                console.log(err)
                res.send(err)
            })
    }
    static updateCategory(req, res) {
        let data = { name: req.body.name }
        Category.update(data, { where: { id: req.params.categoryId } })
            .then(() => {
                res.redirect('/')
            })
            .catch(err => {
                console.log(err)
                res.send(err)
            })
    }
}

module.exports = Controller