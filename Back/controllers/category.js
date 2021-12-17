const Category = require('../models/category');

exports.insertCategory = (req, res, next) => {
    const category = new Category({...req.body});
    category.save().then(
      () => {
        res.status(201).json({
          message: 'Catégorie ajouté avec succès !'
        });
      }
    ).catch(
      (error) => {
        res.status(400).json({
          error: error
        });
      }
    );
} 

exports.updateCategory = (req, res, next) => {
    const category = new Category({_id: req.params.id , ...req.body});
    Category.updateOne({_id: req.params.id}, category).then(
      () => {
        res.status(201).json({
          message: 'Catégorie modifé avec succès !'
        });
      }
    ).catch(
      (error) => {
        res.status(400).json({
          error: error
        });
      }
    );
} 

exports.deleteCategory = (req, res, next) => {
    Category.deleteOne({_id: req.params.id}).then(
      () => {
        res.status(200).json({
          message: 'Catégorie supprimé avec succès !'
        });
      }
    ).catch(
      (error) => {
        res.status(400).json({
          error: error
        });
      }
    );
}

exports.getOneCategory = (req, res, next) => {
    Category.findOne({
      _id: req.params.id
    }).then(
      (category) => {
        res.status(200).json(category);
      }
    ).catch(
      (error) => {
        res.status(404).json({
          error: error
        });
      }
    );
}

exports.getAllCategory = (req, res, next) => {
    Category.find().then(
      (categories) => {
        res.status(200).json(categories);
      }
    ).catch(
      (error) => {
        res.status(404).json({
          error: error
        });
      }
    );
}