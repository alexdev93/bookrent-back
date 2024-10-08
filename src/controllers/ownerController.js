const { User, Wallet } = require('../models');
const { ForbiddenError } = require('@casl/ability');

const getAllOwners = async (req, res) => {
    try {
        ForbiddenError.from(req.ability).throwUnlessCan('read', 'Owner');

        const owners = await User.findAll();
        res.json(owners);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const approveOwner = async (req, res) => {
    try {
        ForbiddenError.from(req.ability).throwUnlessCan('update', 'Owner');
        const ownerId = req.params.ownerId;
        const owner = await User.findByPk(req.params.ownerId);
        if (!owner) return res.status(404).json({ message: 'Owner not found' });

        const getRandomFloat = (min, max) =>
          (Math.random() * (max - min) + min).toFixed(2);
        owner.isApproved = true; 
        await owner.save();
        const walletCreated = await Wallet.create({
          ownerId: ownerId,
          balance: getRandomFloat(200, 1000),
        });
          const ownerWallet = await Wallet.findByPk(walletCreated.id, { include: [User] }) 
        res.json(ownerWallet);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const disableOwner = async (req, res) => {
    try {
        ForbiddenError.from(req.ability).throwUnlessCan('update', 'Owner');

        const owner = await User.findByPk(req.params.ownerId);
        if (!owner) return res.status(404).json({ message: 'Owner not found' });

        owner.status = 'disabled';
        await owner.save();

        await owner.getBooks().update({ available: false });

        res.json(owner);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

module.exports = { getAllOwners, approveOwner, disableOwner }