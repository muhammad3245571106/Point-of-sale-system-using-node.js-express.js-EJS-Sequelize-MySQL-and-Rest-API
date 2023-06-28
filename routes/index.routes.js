const express = require('express')
const router = express.Router()
const customerRoutes = require("./customer.routes.js")
const authRoutes = require("./auth.routes.js")
const jwt = require('jsonwebtoken');
const config = require('..//config/auth.config.js')
const { authJwt } = require("../middleware/index.middleware.js")
require("dotenv").config();
const nodemailer = require('nodemailer');

// backend routes
router.use("/api/customer", customerRoutes)
router.use("/api/auth", authRoutes)

router.get("/sendMail/:to", (req, res) => {
    var loginAttemp = ""
    const token = req.cookies.token;
    jwt.verify(token, config.secret, (err, decoded) => {
        loginAttemp = decoded.id
    })
    var toEmail =  req.params.to
    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.user,
            pass: process.env.pass
        }
    });
    let mailOptions = {
        from: `"Muhammad Awais" ${process.env.user}`,
        to: toEmail,
        subject: 'Some person login to your account!',
        // text: '20F-0166',
        html: `Customer with username <b>${loginAttemp}</b> login into your account. If this wasn't you, contact us at this email.`
    };
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log(error);
            res.redirect(`/sendMail/${toEmail}`)
        } else {
            console.log('Message sent: %s', info.messageId);
            res.redirect("/")
        }
    });
    return
})
// Retrieve the value of a cookie by name
username = ""
role = ""
// frontend routes
router.get("/addcategory" ,  [authJwt.verifyToken] , (req,res) => {
    res.render("addcategory", {user:{name:username, role:role}, active:"/addcategory"})
})
router.get("/addproduct" , [authJwt.verifyToken] ,(req,res) => {
    res.render("addproduct",{user:{name:username, role:role}, active:"/addproduct"})
})
router.get("/categorylist" , [authJwt.verifyToken] , (req,res) => {
    res.render("categorylist",{user:{name:username, role:role}, active:"/categorylist"})
})
router.get("/editcategory" , [authJwt.verifyToken] ,(req,res) => {
    const categoryNameForward = req.query.categoryNameForward; // Extract categoryName from URL
    const categoryDescriptionForward = req.query.categoryDescriptionForward;
    res.render('editcategory', { user:{name:username, role:role}, categoryNameForward: categoryNameForward, categoryDescriptionForward: categoryDescriptionForward});
})
router.get("/editproduct" ,[authJwt.verifyToken] , (req,res) => {
        const productNameForward = req.query.productNameForward
        const productDescriptionForward = req.query.descriptionForward
        const quantityForward = req.query.quantityForward
        const basePriceForward = req.query.basePriceForward
        const sellPriceForward = req.query.sellPriceForward
        const barCodeForward = req.query.barCodeForward
        const categoryNameForward = req.query.categoryForward
        const subCategoryNameForward = req.query.subCategoryForward
        const productId = req.query.productId
    res.render("editproduct", {user:{name:username, role:role}, 
        productNameForward:productNameForward,
        productDescriptionForward:productDescriptionForward,
        quantityForward:quantityForward,
        basePriceForward:basePriceForward,
        sellPriceForward:sellPriceForward,
        barCodeForward:barCodeForward,
        categoryNameForward:categoryNameForward,
        subCategoryNameForward:subCategoryNameForward,
        productId:productId
    })
})
router.get("/edit-sales" ,[authJwt.verifyToken] , (req,res) => {
    res.render("edit-sales", {user:{name:username, role:role}, active:"/edit-sales"})
})
router.get("/editsubcategory" , (req,res) => {
    const subcategoryNameForward = req.query.subcategoryNameForward; // Extract categoryName from URL
    const subcategoryDescriptionForward = req.query.subcategoryDescriptionForward;
    const parentCategoryForward = req.query.parentCategoryForward;
    res.render('editsubcategory', { user:{name:username, role:role},
        subcategoryNameForward: subcategoryNameForward,
        subcategoryDescriptionForward: subcategoryDescriptionForward,
        parentCategoryForward: parentCategoryForward
        });
})
router.get("/forgetpassword" , (req,res) => {
    res.render("forgetpassword")
})
router.get("/" ,[authJwt.verifyToken] , (req,res) => {
    const token = req.cookies.token;
    jwt.verify(token, config.secret, (err, decoded) => {
        username = decoded.id
})
role = "Admin"
    res.render("index" , {user:{name:username, role:role}, active:"/"})
})
router.get("/pos" , [authJwt.verifyToken] ,(req,res) => {
    res.render("pos", {user:{name:username, role:role}, active:"/pos"})
})
router.get("/product-details" ,[authJwt.verifyToken] , (req,res) => {
    res.render("product-details", {user:{name:username, role:role}, active:"/product-details"})
})
router.get("/productlist" ,[authJwt.verifyToken] , (req,res) => {
    res.render("productlist", {user:{name:username, role:role}, active:"/productlist"})
})
router.get("/profile" ,[authJwt.verifyToken] , (req,res) => {
    res.render("profile", {user:{name:username, role:role}, active:"/profile"})
})
router.get("/sales-details" ,[authJwt.verifyToken] , (req,res) => {
    res.render("sales-details", {user:{name:username, role:role}, active:"/sales-details"})
})
router.get("/saleslist" , [authJwt.verifyToken] ,(req,res) => {
    res.render("saleslist", {user:{name:username, role:role}, active:"/saleslist"})
})
router.get("/signin" , (req,res) => {
    res.render("signin")
})
router.get("/signup" , (req,res) => {
    res.render("signup")
})
router.get("/subaddcategory" ,[authJwt.verifyToken] , (req,res) => {
    res.render("subaddcategory", {user:{name:username, role:role}, active:"/subaddcategory"})
})
router.get("/subcategorylist" , [authJwt.verifyToken] ,(req,res) => {
    res.render("subcategorylist", {user:{name:username, role:role}, active:"/subcategorylist"})
})
router.get("/*" , (req,res) => {
    res.render("error-404")
})
module.exports = router;