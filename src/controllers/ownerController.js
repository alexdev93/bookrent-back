const { User } = require('../models');
const { ForbiddenError } = require('@casl/ability');

const getAllOwners = async (req, res) => {
    try {
        // Check permissions
        ForbiddenError.from(req.ability).throwUnlessCan('read', 'Owner');

        const owners = await Owner.findAll();
        res.json(owners);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const approveOwner = async (req, res) => {
    try {
        // Check permissions
        ForbiddenError.from(req.ability).throwUnlessCan('update', 'Owner');

        const owner = await User.findByPk(req.params.ownerId);
        if (!owner) return res.status(404).json({ message: 'Owner not found' });

        owner.isApproved = true;
        await owner.save();
        res.json(owner);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const disableOwner = async (req, res) => {
    try {
        // Check permissions
        ForbiddenError.from(req.ability).throwUnlessCan('update', 'Owner');

        const owner = await User.findByPk(req.params.ownerId);
        if (!owner) return res.status(404).json({ message: 'Owner not found' });

        owner.status = 'disabled';
        await owner.save();

        // Disable all books of this owner
        await owner.getBooks().update({ available: false });

        res.json(owner);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

module.exports = { getAllOwners, approveOwner, disableOwner }