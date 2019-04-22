module.exports = {


  friendlyName: 'Update password',


  description: 'Update the password for the logged-in user.',


  inputs: {

    password: {
      description: 'The new, unencrypted password.',
      example: 'abc123v2',
      required: true
    }

  },


  fn: async function (inputs) {

    // Hash the new password.
    var hashed = await sails.helpers.passwords.hashPassword(inputs.password);

    // Update the record for the logged-in user.
    await User.updateOne({ id: this.req.me.id })
    .set({
      password: hashed
    });

  }


};
