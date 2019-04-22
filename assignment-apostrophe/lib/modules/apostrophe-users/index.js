// This configures the apostrophe-users module to add an admin-level
// group by default:

module.exports = {
  groups: [
    {
      title: 'guest',
      permissions: [ ]
    },
    {
      title: 'admin',
      permissions: [ 'admin' ]
    }
  ]
};
