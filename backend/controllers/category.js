import Category from "../models/category.js";
const categoryController = {
//add category 
    createCategory: async (req, res) => {
        try {
            const { name, parent, image } = req.body;
            //check parent ID was existing
            const ExistingParent = await Category.findOne({ _id: parent });
            if (!ExistingParent && !parent == null)
                return res.status(400).json({
                    message: "This ID has NO parent category",
                });

            const newCategory = new Category({
                name, parent, image
            });
            await newCategory.save();
            res.json({
                message: "Category create success",
                data: newCategory,
            });
        } catch (err) {
            return res.status(500).json({ message: err.message });
        }
    },
// get main category in the data base
    getMainCategory: async (req, res) => {

        try {
            const categories = await Category.find({ parent: { $exists: false } });
            res.json({ message: "Category parent file fetch success", data: categories });
        } catch (err) {
            return res.status(500).json({ message: err.message });
        }
    },
// get sub category in the data base
    getSubCategory: async (req, res) => {
        
        try {

            const subCategories = await Category.find({ parent: { $exists: true} });
            res.json({ message: " Sub Category file fetch success", data: subCategories });
        } catch (err) {
            return res.status(500).json({ message: err.message });
        }
    },
    getIdSubCategory: async (req, res) => {
        const {parent} = req.body;
        try {
           const subCategories = await Category.find({parent:parent});
            res.json({ message: " Sub Category file fetch success", data: subCategories });
        } catch (err) {
            return res.status(500).json({ message: err.message });
        }
    },


//get one category in the data base
    getOneCategory: async (req, res) => {
        const id = req.params.id;
        try {
            const category = await Category.findOne({ _id: id });
            res.json({ message: "Category fetch success", data: category });
        } catch (err) {
            return res.status(500).json({ message: err.message });
        }
    },
//update category details
    updateCategory: async (req, res) => {
        const id = req.params.id;
        const {name, parent,image} = req.body;

        try {
              await Category.findOneAndUpdate(
                { _id: id },
                { name, parent, image }
            );
            res.json({
                message: "Forum post update success",
                data: { name, parent, image },
            });
        } catch (err) {
            return res.status(500).json({ message: err.message });
        }
    },





};





export default categoryController;