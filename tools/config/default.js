export const client = {
  lint: {
    styles: {
      input: ['src/main.sass', 'src/**/*.{scss,sass}', '!src/sass/vendors/*.{scss,sass}']
    }
  },
  styles: {
    watch: ['src/main.sass', 'src/**/*.{sass,scss}']
  }
}
