
<template lang='pug'>
.card
  .card-body
    p(v-if='confirm' v-cloak)
      | Are you sure you want to remove your account?
      br
      | You will lose all progress you've made on your courses.

    .confirm(v-if='confirm' v-cloak)
      button.button.danger.-has-icon.-small(type='button' @click='deleteAccount')
        span
          i.fa.fa-trash-alt
          | Yes

      button.button.primary.-small(type='button' @click='confirm = false')
        | Cancel

    button.button.danger.-has-icon.-small(type='button' @click='confirm = true' v-if='!confirm' v-cloak)
      span
        i.fa.fa-trash-alt
        | Delete Account
</template>

<script>
export default {
  name: 'account-delete',

  data () {
    return {
      confirm: false
    }
  },

  methods: {
    deleteAccount () {
      this.$store.dispatch('account/deleteUser')
        .then(() => {
          this.$toast.show('Your account has been deleted.', {
            duration: 7000,
            className: 'vm-toasted',
            action: {
              text: 'Close',
              onClick: (e, toastObject) => {
                toastObject.goAway(0)
              }
            }
          })
          this.$store
            .dispatch('account/userLogout')
            .then(() => {
              this.$router.push('/')
            })
            .catch(error => {
              console.log(error)
            })
        })
        .catch((error) => {
          console.log(error)
        })
    }
  }
}
</script>

<style lang='stylus' scoped>
.confirm .button
  display inline-block
  margin-right 20px
</style>
