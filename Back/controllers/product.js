const Product = require('../models/product');

exports.insertProduct = (req, res, next) => {
    const product = new Product({...req.body});
    product.save().then(
      () => {
        res.status(201).json({
          message: 'Produit ajouté avec succès !'
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

exports.updateProduct = (req, res, next) => {
    const product = new Product({_id: req.params.id , ...req.body});
    Product.updateOne({_id: req.params.id}, product).then(
      () => {
        res.status(201).json({
          message: 'Produit modifé avec succès !'
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

exports.deleteProduct = (req, res, next) => {
    Product.deleteOne({_id: req.params.id}).then(
      () => {
        res.status(200).json({
          message: 'Produit supprimé avec succès !'
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

exports.getOneProduct = (req, res, next) => {
  console.log('ICIIII')
    Product.findOne({
      _id: req.params.id
    }).populate('category', 'name').then(
      (product) => {
        res.status(200).json(product);
      }
    ).catch(
      (error) => {
        res.status(404).json({
          error: error
        });
      }
    );
}

exports.getProductByCategory = (req, res, next) => {
  Product.find({
    category: req.params.id
  }).populate('category', 'name').then(
    (product) => {
      res.status(200).json(product);
    }
  ).catch(
    (error) => {
      res.status(404).json({
        error: error
      });
    }
  );
}

exports.getAllProduct = (req, res, next) => {
    Product.find().populate('category', 'name').then(
      (products) => {
        res.status(200).json(products);
      }
    ).catch(
      (error) => {
        res.status(404).json({
          error: error
        });
      }
    );
}

exports.getProductsByName = (req, res, next) => {

  Product.find({ name: new RegExp(req.params.name, 'i') }).then(
    (products) => {
      res.status(200).json(products);
    }
  ).catch(
    (error) => {
      res.status(404).json({
        error: error
      });
    }
  );
}