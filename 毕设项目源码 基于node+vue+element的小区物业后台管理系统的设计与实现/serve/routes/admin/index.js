module.exports = app => {
    const express = require('express')
    const router = express.Router()
    const jwt = require('jsonwebtoken')
    const assert = require('http-assert')
        // 创建接口
    router.post('/', async(req, res) => {
        const model = await req.Model.create(req.body)
        res.send(model)
    })

    // 更新修改接口
    router.put('/:id', async(req, res) => {
        const model = await req.Model.findByIdAndUpdate(req.params.id, req.body)
        res.send(model)
    })

    // 密码修改的接口
    router.put('/password/:id', async(req, res) => {
        // 结构赋值获取到的name和password
        const {
            username,
            password,
            newPassword
        } = req.body
            // 1.根据用户名找用户
        const user = await req.Model.findOne({
                username
            }).select('+password')
            // 是之前在用户集合里 select设为 false, 加.select('+password') 才可以在2.校验密码时取到 user.password 进行校验
        assert(user, 422, '用户不存在，请联系星豪物业')
            // if (!user) {
            //     return res.status(422).send({
            //         message: '用户不存在'
            //     })
            // }
            // 2.校验密码
            // compareSync 比较 password用户提交的明文密码 和 密文密码是否匹配,会返回布尔值
        const isValid = require('bcryptjs').compareSync(password, user.password)
        assert(isValid, 422, '账号或密码错误，请联系星豪物业')
        req.body.password = newPassword;
        const model = await req.Model.findByIdAndUpdate(req.params.id, req.body)
        res.send(model)
    });


    // 删除和批量删除接口
    router.delete('/:idArr', async(req, res) => {
        const {
            idArr
        } = req.params; // type: string
        const newIdArr = idArr.split(","); //格式化为我们需要的
        await req.Model.deleteMany({
            _id: {
                $in: newIdArr
            }
        })
        res.send({
            success: true
        })
    });



    // 根据id查询
    router.get('/id/:id', async(req, res) => {
        const model = await req.Model.findById(req.params.id)
        res.send(model)
    });

    // fetch 查询接口列表 
    router.get('/fetch/:pageNum/:pageSize', async(req, res) => {
        let pageNum = parseInt(req.params.pageNum)
        let pageSize = parseInt(req.params.pageSize)
        let total = await req.Model.countDocuments({});
        const model = await req.Model.find().skip((pageNum - 1) * pageSize).limit(pageSize).sort({
            '_id': -1
        })
        res.send({
            data: model,
            total: total
        })
    });

    //  name 模糊查询 集合 houses 
    router.get('/houses/:pageNum/:pageSize/:name', async(req, res) => {
        let pageNum = parseInt(req.params.pageNum)
        let pageSize = parseInt(req.params.pageSize)
        let total = await req.Model.find({
            'name': {
                $regex: req.params.name
            },
        }).count()
        const model = await req.Model.find({
            'name': {
                $regex: req.params.name
            },
        }).skip((pageNum - 1) * pageSize).limit(pageSize);
        res.send({
            data: model,
            total: total
        })
    })

    // //  title 模糊查询 集合 announcements 
    router.get('/announcements/:pageNum/:pageSize/:title', async(req, res) => {
        let pageNum = parseInt(req.params.pageNum)
        let pageSize = parseInt(req.params.pageSize)
        let total = await req.Model.find({
            'title': {
                $regex: req.params.title
            },
        }).count()
        const model = await req.Model.find({
            'title': {
                $regex: req.params.title
            },
        }).skip((pageNum - 1) * pageSize).limit(pageSize);
        res.send({
            data: model,
            total: total
        })
    })

    //  _id 模糊查询 集合 announcements 小程序用
    router.get('/announcementsId/:id', async(req, res) => {
            let model = await req.Model.findById(req.params.id)
            res.send(model)

        })
        //  _id 模糊查询 集合 announcements 小程序用
    router.get('/repairmentsId/:id', async(req, res) => {
        let model = await req.Model.findById(req.params.id)
        res.send(model)

    })



    //  carCard 模糊查询 集合 cars 
    router.get('/cars/:pageNum/:pageSize/:carCard', async(req, res) => {
        let pageNum = parseInt(req.params.pageNum)
        let pageSize = parseInt(req.params.pageSize)
        let total = await req.Model.find({
            'carCard': {
                $regex: req.params.carCard
            },
        }).count()
        const model = await req.Model.find({
            'carCard': {
                $regex: req.params.carCard
            },
        }).skip((pageNum - 1) * pageSize).limit(pageSize);
        res.send({
            data: model,
            total: total
        })
    })

    //  username 模糊查询 集合 adminUsers 
    router.get('/adminUsers/:pageNum/:pageSize/:username', async(req, res) => {
        let pageNum = parseInt(req.params.pageNum)
        let pageSize = parseInt(req.params.pageSize)
        let total = await req.Model.find({
            'username': {
                $regex: req.params.username
            },
        }).count()
        const model = await req.Model.find({
            'username': {
                $regex: req.params.username
            },
        }).skip((pageNum - 1) * pageSize).limit(pageSize);
        res.send({
            data: model,
            total: total
        })
    })

    //  name 模糊查询 集合 repairments 
    router.get('/repairments/:pageNum/:pageSize/:name', async(req, res) => {
        let pageNum = parseInt(req.params.pageNum)
        let pageSize = parseInt(req.params.pageSize)
        let total = await req.Model.find({
            'name': {
                $regex: req.params.name
            },
        }).count()
        const model = await req.Model.find({
            'name': {
                $regex: req.params.name
            },
        }).skip((pageNum - 1) * pageSize).limit(pageSize);
        res.send({
            data: model,
            total: total
        })
    })

    //  name 模糊查询 集合 repairers 
    router.get('/repairers/:pageNum/:pageSize/:name', async(req, res) => {
        let pageNum = parseInt(req.params.pageNum)
        let pageSize = parseInt(req.params.pageSize)
        let total = await req.Model.find({
            'name': {
                $regex: req.params.name
            },
        }).count()
        const model = await req.Model.find({
            'name': {
                $regex: req.params.name
            },
        }).skip((pageNum - 1) * pageSize).limit(pageSize);
        res.send({
            data: model,
            total: total
        })
    })

    //  name 模糊查询 集合 repairers 
    router.get('/users/:pageNum/:pageSize/:username', async(req, res) => {
        let pageNum = parseInt(req.params.pageNum)
        let pageSize = parseInt(req.params.pageSize)
        let total = await req.Model.find({
            'username': {
                $regex: req.params.username
            },
        }).count()
        const model = await req.Model.find({
            'username': {
                $regex: req.params.username
            },
        }).skip((pageNum - 1) * pageSize).limit(pageSize);
        res.send({
            data: model,
            total: total
        })
    })



    // // 登录校验中间件
    const resourceMiddleware = require('../../middleware/resource')
    app.use('/admin/api/rest/:resource', resourceMiddleware(), router)

    // 上传图片的接口
    const multer = require('multer')
    const upload = multer({
        dest: __dirname + '/../../uploads'
    })
    app.post('/admin/api/upload', upload.single('file'), async(req, res) => {
        const file = req.file
        file.url = `http://localhost:3000/uploads/${file.filename}`
        res.send(file)
    })

    // 后台登录接口
    app.post('/admin/api/login', async(req, res) => {
            // 结构赋值获取到的name和password
            const {
                username,
                password
            } = req.body
                // 1.根据用户名找用户
            const AdminUser = require('../../models/AdminUser')
            const user = await AdminUser.findOne({
                    username
                }).select('+password')
                // .select('+password') 是在用户集合里 select设为 false
            assert(user, 422, '用户不存在，请联系星豪物业')
                // if (!user) {
                //     return res.status(422).send({
                //         message: '用户不存在'
                //     })
                // }
                // 2.校验密码
                // compareSync 比较明文和密文是否匹配,会返回布尔值
            const isValid = require('bcryptjs').compareSync(password, user.password)
            assert(isValid, 422, '账号或密码错误，请联系星豪物业')

            // if (!isValid) {
            //     return res.status(422).send({
            //         message: '账号或密码错误'
            //     })
            // }
            // 3.返回token
            const token = jwt.sign({
                id: user._id,
            }, app.get('secret'))
            res.send({
                token: token,
                username: user.username
            })
        })
        // 微信小程序登录接口
    app.post('/WeChat/api/login', async(req, res) => {
        // 结构赋值获取到的name和password
        const {
            username,
            password
        } = req.body
            // 1.根据用户名找用户
        const User = require('../../models/User')
        const user = await User.findOne({
                username
            }).select('+password')
            // .select('+password') 是在用户集合里 select设为 false
        assert(user, 422, '用户不存在，请联系星豪物业')
            // if (!user) {
            //     return res.status(422).send({
            //         message: '用户不存在'
            //     })
            // }
            // 2.校验密码
            // compareSync 比较明文和密文是否匹配,会返回布尔值
        const isValid = require('bcryptjs').compareSync(password, user.password)
        assert(isValid, 422, '账号或密码错误')
            // if (!isValid) {
            //     return res.status(422).send({
            //         message: '账号或密码错误'
            //     })
            // }

        // 3.返回token
        const token = jwt.sign({
            id: user._id,
        }, app.get('secret'))
        res.send({
            token: token,
            id: user._id,
            username: user.username,
            nickName: user.nickName,
            avatarUrl: user.avatarUrl,
        })
    })

    // 错误处理函数 配合 http-assert 插件使用
    app.use(async(err, req, res, next) => {
        res.status(err.statusCode || 500).send({
            message: err.message
        })
    })
}