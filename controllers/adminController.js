const Category = require('../models/Category')

module.exports = {
    // TODO: RENDER => INDEX

    viewDashboard: (req, res) => {
        res.render('admin/dashboard/view_dashboard')
    },
    viewCategory: async (req, res) => {
        // GET ALL DATA FROM DB => Bind it to table
        const categories = await Category.find()

        res.render('admin/category/view_category', { categories })
    },
    viewItems: (req, res) => {
        res.render('admin/items/view_items')
    },
    viewBanks: (req, res) => {
        res.render('admin/banks/view_banks')
    },
    viewBooking: (req, res) => {
        res.render('admin/booking/view_booking')
    },

    // TODO : POST => ADD => DATABASE

    postCategory: async (req, res) => {
        const input = req.body.category__name

        if (input === null) return;

        // Send to DB
        await Category.create({ name: input }).then(() => {
            // redirect
            res.status(201).redirect('/admin/category')
        }).catch((e) => {
            // redirect
            console.log(e);
            res.redirect('/admin/category')
        })
    },






    // TODO: POST => EDIT => DATABASE
    updateCategory: async (req, res) => {
        const id = req.body.category__id
        const input = req.body.category__name

        if (id === null || input === null) return;

        await Category.findByIdAndUpdate(id, {
            name: input
        }).then(() => {
            // redirect
            res.status(201).redirect('/admin/category')
        }).catch((e) => {
            // redirect
            console.log(e);
            res.redirect('/admin/category')
        })
    }
    ,


    // TODO: POST => DELETE => DATABASE
    deleteCategory: async (req, res) => {
        const id = req.body.category__id
        const input = req.body.category__name

        if (id === null || input === null) return;

        await Category.findByIdAndDelete(id).then(() => {
            // redirect
            res.status(201).redirect('/admin/category')
        }).catch((e) => {
            // redirect
            console.log(e);
            res.redirect('/admin/category')
        })
    },
}