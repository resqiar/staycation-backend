module.exports = {
    viewDashboard: (req, res) => {
        res.render('admin/dashboard/view_dashboard')
    },
    viewCategory: (req, res) => {
        res.render('admin/category/view_category')
    },
    viewItems: (req, res) => {
        res.render('admin/items/view_items')
    },
    viewBanks: (req, res) => {
        res.render('admin/banks/view_banks')
    },
    viewBooking: (req, res) => {
        res.render('admin/booking/view_booking')
    }
}