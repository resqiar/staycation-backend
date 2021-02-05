const Category = require('../models/Category')
const Banks = require('../models/Banks')
const Item = require('../models/Item')
const Image = require('../models/Image')

const fs = require('fs-extra');
const path = require('path');

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
    viewItems: async (req, res) => {
        try {
            const category = await Category.find() // => relations to category DB
            const item = await Item.find().populate({ // ? POPULATE IMAGES
                path: 'imgId',
                select: 'id imageURL'
            }).populate({ // ? POPULATE CATEGORY
                path: 'categoryId',
                select: 'id name'
            })

            res.render('admin/items/view_items', {
                category, 
                item,
                status: 'items'
            })
        } catch (e) {
            console.log(e)
            res.redirect('/admin/items')
        }
    },
    viewImages: async (req, res) => {
        try {
            // ? THIS ID IS SEND FROM viewItem METHOD
            // ? TO GET ACCESS TO SELECTED ITEM ID 
            const { id } = req.params
            const category = await Category.find() // => relations to category DB
            
            const item = await Item.findOne({ _id: id }).populate({ 
                path: 'imgId',
                select: 'id imageURL'
            })

            res.render('admin/items/view_items', { 
                id,
                item,
                status: 'images'
            })
        } catch (error) {
            console.log(e)
            res.redirect('/admin/items')
        }
    },
    viewBanks: async (req, res) => {
        try {
            // GET ALL DATA FROM DB => Bind it to table
        const banks = await Banks.find()
        res.render('admin/banks/view_banks', { banks })
        } catch (e) {
            console.log(e);
            res.redirect('/admin/banks')
        }
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

    postBanks: async (req, res) => {
        const input = req.body
        const logo = req.file

        if (input === null) return;

        try {
            // send to DB
            await Banks.create({
                bankName: input.banks_bank,
                accountName: input.banks_accountName,
                accountNumber: input.banks_accountNumber,
                logoURL: `images/${logo.filename}`,
            })
            res.redirect('/admin/banks')
        } catch (e) {
            console.log(e)
            res.redirect('/admin/banks')
        }
    },

    postItems: async (req, res) => {
        const { nameItems, priceItems, cityItems, countryItems, categoryItems, descItems} = req.body
        const images = req.files // array of images
        
        if ({ nameItems, priceItems, cityItems, countryItems, categoryItems, descItems} === undefined) return;
        console.log(categoryItems);
        try {
            // TODO: find category selected
            const _category = await Category.findOne({_id: categoryItems})

            // TODO: add new items
            const newItem = await Item.create({
                name: nameItems,
                price: priceItems,
                city: cityItems,
                country: countryItems,
                desc: descItems,
                categoryId: _category._id,
            })

            
            // TODO: Relation => push to other collections (Category)
            _category.itemId.push({_id: newItem._id})
            await _category.save()

            // TODO: Save Images
            if(images !== undefined){
                for (let i = 0; i < images.length; i++) {
                    const _image = await Image.create({ 
                        imageURL : `images/items/${images[i].filename}`,
                        itemId : newItem._id
                    }) 


                    // TODO: save to items list
                    newItem.imgId.push({ _id: _image._id })
                    newItem.save()
                }
            }

            res.redirect('/admin/items')
        } catch (e) {
            console.log(e);
            res.redirect('/admin/items')
        }
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
    },
    updateBanks: async (req, res) => {
        const id = req.body.banks_id
        const input = req.body
        const logo = req.file 

        if (id === undefined || input === undefined) return;

        try {
            const _bank = await Banks.findOne({ _id: id })

            if (logo === undefined) {
                await Banks.findByIdAndUpdate(id, {
                    bankName: input.banks_bank,
                    accountName: input.banks_accountName,
                    accountNumber: input.banks_accountNumber
                })
    
                res.redirect('/admin/banks')
            }else {
                await Banks.findByIdAndUpdate(id, {
                    bankName: input.banks_bank,
                    accountName: input.banks_accountName,
                    accountNumber: input.banks_accountNumber,
                    logoURL: `images/${logo.filename}`,
                })

                // TODO: IF USER UPDATING LOGO 
                await fs.unlink(path.join(`./public/${_bank.logoURL}`))

                res.redirect('/admin/banks')
            }
        } catch (e) {
            console.log(e)
            res.redirect('/admin/banks')
        }
    },


    // TODO: POST => DELETE => DATABASE
    deleteCategory: async (req, res) => {
        const id = req.body.category__id

        if (id === undefined) return;

        await Category.findByIdAndDelete(id).then(() => {
            // redirect
            res.status(201).redirect('/admin/category')
        }).catch((e) => {
            // redirect
            console.log(e);
            res.redirect('/admin/category')
        })
    },
    deleteBanks: async (req, res) => {
        const id = req.body.banks_id

        if (id === undefined) return;
        const _bank = await Banks.findOne({ _id: id })
        try {
            await Banks.findByIdAndDelete(id)

            // DELETE LOGO
            await fs.unlink(path.join(`./public/${_bank.logoURL}`))

            // redirect
            res.status(201).redirect('/admin/banks')
        } catch (e) {
            // redirect
            console.log(e);
            res.redirect('/admin/banks')
        }
    }
}