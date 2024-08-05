const { AbilityBuilder, Ability } = require('@casl/ability');

const defineAbilitiesFor = (user) => {
    const { can, cannot, build } = new AbilityBuilder(Ability);

    if (user.role === 'admin') {
        can('manage', 'all');
    } else if (user.role === 'owner') {
        can('manage', 'Book', { ownerId: user.id });
        can('read', 'Book');
        cannot('approve', 'Book');
    } else {
        can('read', 'Book');
    }

    return build();
};

module.exports = (req, res, next) => {
    req.ability = defineAbilitiesFor(req.user);
    next();
};
