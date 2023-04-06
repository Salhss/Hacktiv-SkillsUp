const { Category, Course, Profile, User } = require('../models')
const { Op, where } = require('sequelize')
const bcrypt = require('bcryptjs');

class Controller {
    static getSignUp(req, res){
        res.render('signup')
    }

    static postSignUp(req, res){
        const newProfile = {
            name: req.body.name,
            gender: req.body.gender,
            birthDate: req.body.birthDate,
            phoneNumber: req.body.phoneNumber
        }

        Profile.create(newProfile)
        .then((profile) => {
            const newUser = {
                name: req.body.username,
                email: req.body.email,
                role: req.body.role,
                password: req.body.password,
                ProfilId: profile.id
            }

            return User.create(newUser)
        })
        .then(() => {
            res.redirect('/login')
        })
        .catch((error) => {
            console.error(error);
          })
    }

    static getLogin(req, res){
        const { error } = req.query
        res.render('login', { error })
    }

    static postLogin(req, res){
        const { username, password } = req.body

        User.findOne({ where: {name: username} })
        .then((user) => {
            if(user) {
                const isPasswordValid = bcrypt.compareSync(password, user.password);

                if(isPasswordValid) {

                    req.session.userId = user.id;
                    req.session.userRole = user.role;

                    if(user.role === 'administrator') {
                        return res.redirect('/admin')
                    } else {
                        return res.redirect('/student')
                    }


                } else {
                    const error = "invalid username/password"
                    return res.redirect(`/login?error=${error}`)
                }
            } else {
                const error = "invalid username/password"
                return res.redirect(`/login?error=${error}`)
            }
        })
        .catch((err) => {res.send(err)
        console.log(err)})
    }
    static landingPage(req, res) {
        res.render('landingpage')
    }
    static home(req, res) {
        const {search} = req.query
        let option = {}
        if(search) {
            option = {where: {name: {[Op.iLike]: `%${search}%`}}}
        }
        Category.findAll(option)
            .then((result) => {
                res.render('home', { result })
            })
            .catch(err => {
                console.log(err)
                res.send(err)
            })
    }
    static studentHome(req, res) {
        const {search} = req.query
        let option = {}
        if(search) {
            option = {where: {name: {[Op.iLike]: `%${search}%`}}}
        }
        Category.findAll(option)
            .then((result) => {
                res.render('studentHome', { result })
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
    static coursesListStudent(req, res) {
        const { categoryId } = req.params
        Category.findAll({ where: { id: categoryId }, include: [{ model: Course }] })
            .then((result) => {
                console.log(result[0].dataValues.Courses)
                let getResult = result[0]
                res.render('coursesListStudent', { getResult })

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
    static coursesDetailStudent(req, res) {
        const { categoryId, courseId } = req.params
        Course.findAll({ where: { id: courseId } })
            .then((result) => {
                let getResult = result[0]
                res.render('courseDetailStudent', { getResult })
            })
            .catch(err => {
                console.log(err)
                res.send(err)
            })
    }
    static deleteCourses(req, res) {
        const { categoryId, courseId } = req.params
        Course.destroy({ where: { id: courseId } })
            .then(() => {
                res.redirect(`/${categoryId}`)
            })
            .catch(err => {
                console.log(err)
                res.send(err)
            })
        // res.send('ini deleteCourses')
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
       res.render('addCategory')
    }
    static createCategory(req, res) {
        Category.create({ name: req.body.name })
            .then(() => {
                res.redirect('/admin')
            })
            .catch(err => {
                console.log(err)
                res.send(err)
            })
    }
    static deleteCategory(req, res) {
        const { categoryId } = req.params
        Category.destroy({ where: { id: categoryId } })
            .then(() => {
                res.redirect(`/admin`)
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
                res.redirect('/admin')
            })
            .catch(err => {
                console.log(err)
                res.send(err)
            })
    }

    static getLogout(req, res) {
        req.session.destroy((err) => {
            if (err) {
                res.send(err)
            } else {
                res.redirect('/')
            }
        })
    }
}

module.exports = Controller