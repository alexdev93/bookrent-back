const { AbilityBuilder, Ability } = require('@casl/ability');

function defineAbilitiesFor(user) {
    const { can, cannot, build } = new AbilityBuilder(Ability);

    if (user.role === 'admin') {
        can('manage', 'all');
        can('approve', 'User', { role: 'owner' });
        can('approve', 'Book');
    } else if (user.role === 'owner' && user.isApproved) {
        can('read', 'Book', { ownerId: user.id });
        can('update', 'Book', { ownerId: user.id });
        can('delete', 'Book', { ownerId: user.id });
        can('create', 'Book');
    } else if (user.role === 'renter') {
        can('read', 'Book', { status: 'approved', isApproved: true });
        can('create', 'Rental');
        can('read', 'Rental', { renterId: user.id });
    }

    cannot('manage', 'User', { role: 'admin' });

    return build();
}

module.exports = defineAbilitiesFor;
