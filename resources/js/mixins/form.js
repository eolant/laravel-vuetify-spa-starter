import formatter from '~/helpers/formatter'

export default {
  data: () => ({
    loading: false,
    valid: true,
    labels: {},
    form: {},
    rules: {},
    errors: {}
  }),

  created() {
    for (let key in this.form) {
      if (this.form[key] !== null && typeof this.form[key] === 'object') {
        for (let i in this.form[key]) {
          let key2 = key + '.' + i
          this.errors[key2] = []
          if (!this.labels[key2]) {
            this.labels[key2] = formatter.titlecase(i)
          }
        }
      }
      else {
        this.errors[key] = []
        if (!this.labels[key]) {
          this.labels[key] = formatter.titlecase(key)
        }
      }
    }

    this.rules.required = (field) => ((v) => !!v || 'The ' + (this.labels && this.labels[field] && this.labels[field].toLowerCase() + ' ') + 'field is required')
  },

  methods: {
    handleErrors(errors) {
      if (errors) {
        this.setErrors(errors)
      }
      else {
        this.clearErrors()
      }
    },

    setErrors(errors) {
      for (let key in this.errors) {
        this.errors[key] = errors[key] || []
      }
    },

    clearErrors(key = false) {
      if (key) {
        if (this.errors[key].length) {
          this.errors[key] = []
        }
      }
      else {
        for (let key in this.errors) {
          this.errors[key] = []
        }
      }
    }
  }
}
