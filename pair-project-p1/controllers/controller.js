const { Category, Course } = require('../models')
const { Op, where } = require('sequelize')

class Controller {
    static home(req, res) {
        Category.findAll({})
        .then((result) => {
            res.render('home', {result})
        })
        .catch(err => {
            console.log(err)
            res.send(err)
        })
    }
    static coursesList(req, res) {
        const {categoryId} = req.params
        Category.findAll({where: {id: categoryId}, include: [{model: Course}]})
        .then((result) => {
            console.log(result[0].dataValues.Courses)
            let getResult = result[0]
            res.render('coursesList', {getResult})
            
        })
        .catch(err => {
            console.log(err)
            res.send(err)
        })
    }
    static formAddCourses(req, res) {
        res.send('ini formAddCourses')
    }
    static createCourses(req, res) {
        res.send("ini createCourses")
    }
    static coursesDetail(req, res) {
        res.send('ini coursesDetail')
    }
    static deleteCourses(req, res) {
        res.send('ini deleteCourses')
    }
    static formEditCourses(req, res) {
        res.send('ini formEditCourses')
    }
    static updateCourses(req, res) {
        res.send('ini updateCourses')
    }
    static formAddCategory(req, res) {
        res.render('addCategory')
    }
    static createCategory(req, res) {
        Category.create({name: req.body.name})
        .then(() => {
            res.redirect('/')
        })
        .catch(err => {
            console.log(err)
            res.send(err)
        })
    }
    static deleteCategory(req, res) {
        const {categoryId} = req.params
        Category.destroy({where: {id: categoryId}})
        .then(() => {
            res.redirect('/')
        })
        .catch(err => {
            console.log(err)
            res.send(err)
        })
    }
    static formEditCategory(req, res) {
        const {categoryId} = req.params
        Category.findAll({where: {id: categoryId}})
        .then((result) => {
            let getResult = result[0]
            res.render('editCategory', {getResult})
        })
        .catch(err => {
            console.log(err)
            res.send(err)
        })
    }
    static updateCategory(req, res) {
        let data = {name: req.body.name}
        Category.update(data, {where: {id: req.params.categoryId}})
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