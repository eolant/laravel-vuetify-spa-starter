const formatter = {
  titlecase(value) {
    return value.replace(/_/g, ' ').replace(/[\u00C0-\u1FFF\u2C00-\uD7FF\w]+\s*/g, (txt) => (txt.charAt(0).toUpperCase() + txt.substr(1)))
  }
}

export default formatter
