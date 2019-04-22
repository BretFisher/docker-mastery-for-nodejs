parasails.registerPage('account-overview', {
  //  ╦╔╗╔╦╔╦╗╦╔═╗╦    ╔═╗╔╦╗╔═╗╔╦╗╔═╗
  //  ║║║║║ ║ ║╠═╣║    ╚═╗ ║ ╠═╣ ║ ║╣
  //  ╩╝╚╝╩ ╩ ╩╩ ╩╩═╝  ╚═╝ ╩ ╩ ╩ ╩ ╚═╝
  data: {
    isBillingEnabled: false,

    hasBillingCard: false,

    // Syncing/loading states for this page.
    syncingOpenCheckout: false,
    syncingUpdateCard: false,
    syncingRemoveCard: false,

    // Form data
    formData: { /* … */ },

    // Server error state for the form
    cloudError: '',

    // For the Stripe checkout window
    checkoutHandler: undefined,

    // For the confirmation modal:
    removeCardModalVisible: false,
  },

  //  ╦  ╦╔═╗╔═╗╔═╗╦ ╦╔═╗╦  ╔═╗
  //  ║  ║╠╣ ║╣ ║  ╚╦╝║  ║  ║╣
  //  ╩═╝╩╚  ╚═╝╚═╝ ╩ ╚═╝╩═╝╚═╝
  beforeMount: function (){
    _.extend(this, window.SAILS_LOCALS);

    this.isBillingEnabled = !!this.stripePublishableKey;

    // Determine whether there is billing info for this user.
    this.me.hasBillingCard = (
      this.me.billingCardBrand &&
      this.me.billingCardLast4 &&
      this.me.billingCardExpMonth &&
      this.me.billingCardExpYear
    );
  },
  mounted: async function() {
    //…
  },

  //  ╦╔╗╔╔╦╗╔═╗╦═╗╔═╗╔═╗╔╦╗╦╔═╗╔╗╔╔═╗
  //  ║║║║ ║ ║╣ ╠╦╝╠═╣║   ║ ║║ ║║║║╚═╗
  //  ╩╝╚╝ ╩ ╚═╝╩╚═╩ ╩╚═╝ ╩ ╩╚═╝╝╚╝╚═╝
  methods: {

    clickStripeCheckoutButton: async function() {

      // Prevent double-posting if it's still loading.
      if(this.syncingUpdateCard) { return; }

      // Show syncing state for opening checkout.
      this.syncingOpenCheckout = true;

      // Clear out error states.
      this.cloudError = false;

      // Open Stripe Checkout.
      var billingCardInfo = await parasails.util.openStripeCheckout(this.stripePublishableKey, this.me.emailAddress);
      // Clear the loading state for opening checkout.
      this.syncingOpenCheckout = false;
      if (!billingCardInfo) {
        // (if the user canceled the dialog, avast)
        return;
      }

      // Now that payment info has been successfully added, update the billing
      // info for this user in our backend.
      this.syncingUpdateCard = true;
      await Cloud.updateBillingCard.with(billingCardInfo)
      .tolerate(()=>{
        this.cloudError = true;
      });
      this.syncingUpdateCard = false;

      // Upon success, update billing info in the UI.
      if (!this.cloudError) {
        Object.assign(this.me, _.pick(billingCardInfo, ['billingCardLast4', 'billingCardBrand', 'billingCardExpMonth', 'billingCardExpYear']));
        this.me.hasBillingCard = true;
      }
    },

    clickRemoveCardButton: async function() {
      this.removeCardModalVisible = true;
    },

    closeRemoveCardModal: async function() {
      this.removeCardModalVisible = false;
      this.cloudError = false;
    },

    submittedRemoveCardForm: async function() {

      // Update billing info on success.
      this.me.billingCardLast4 = undefined;
      this.me.billingCardBrand = undefined;
      this.me.billingCardExpMonth = undefined;
      this.me.billingCardExpYear = undefined;
      this.me.hasBillingCard = false;

      // Close the modal and clear it out.
      this.closeRemoveCardModal();

    },

    handleParsingRemoveCardForm: function() {
      return {
        // Set to empty string to indicate the default payment source
        // for this customer is being completely removed.
        stripeToken: ''
      };
    },

  }
});
