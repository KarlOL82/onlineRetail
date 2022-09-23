const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');


// Fetch all rows from the Tag table
router.get('/', async (req, res) => {
  try {
    const tagData = await Tag.findAll({
      include: [
        {
          model: Product,
          attributes: ["id", "product_name", "price", "stock"],
        },
      ],
    });

    if (!tagData) {
      res.status(404).json({ message: "No matching Tag found!" });
      return;
    }

    res.status(200).json(tagData);
  } catch (err) {
    res.status(500).json(err);
  }
  
});

// Fetch one row from the Tag table by its unique id
router.get('/:id', async (req, res) => {
  try {
    const tagData = await Tag.findByPk(req.params.id, {
      include: [
        {
          model: Product,
          attributes: ["id", "product_name", "price", "stock"],
        },
      ],
    });

    if (!tagData) {
      res.status(404).json({ message: "No matching Tag found!" });
      return;
    }

    res.status(200).json(tagData);
  } catch (err) {
    res.status(500).json(err);
  }
  
});

// Create a new instance of the Tag model in the Tag table
router.post('/', async (req, res) => {
  try {
    const newTag = await Tag.create({
      tag_name: req.body.tag_name,
    });
    res.status(200).json(newTag);
  } catch (err) {
    res.status(400).json(err);
  }
  
});

// Update an existing row in the Tag table
router.put('/:id', async (req, res) => {
  try {
    const updatedTag = await Tag.update(
      {
        tag_name: req.body.tag_name,
      },
      {
        where: {
          id: req.params.id,
        },
      }
    );

    if (!updatedTag[0]) {
      res.status(404).json({ message: "No Tag found with this id" });
      return;
    } else {
      return res.status(200).json(updatedTag);
    }
  } catch (err) {
    console.log(err);
    res.json(err);
  }
  
});

// Delete an existing row from the Tag table
router.delete('/:id', async (req, res) => {
  try {
    const tagData = await Tag.destroy({
      where: {
        id: req.params.id,
      },
    });

    if (!tagData) {
      res.status(404).json({ message: "No Category found with this id!" });
      return;
    }

    res.status(200).json(tagData);
  } catch (err) {
    res.status(500).json(err);
  }
  
});

module.exports = router;
