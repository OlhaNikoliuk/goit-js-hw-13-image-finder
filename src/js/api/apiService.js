export default class NewApiService {
  constructor() {
    this.imageName = ''
    this.page = 1
  }

  fetchImages() {
    const baseUrl = 'https://pixabay.com/api/'
    const KEY = '21094416-818b6ee494a1708108f1a0838'

    return fetch(
      `${baseUrl}?image_type=photo&orientation=horizontal&q=${this.imageName}&page=${this.page}&per_page=12&key=${KEY}`,
    )
      .then((responce) => responce.json())
      .then((data) => {
        this.incrementPage()

        console.log(data.hits)
        return data.hits
      })
  }

  incrementPage() {
    this.page += 1
  }

  resetPage() {
    this.page = 1
  }

  get query() {
    return this.imageName
  }

  set query(newImageName) {
    this.imageName = newImageName
  }
}

// if (!responce.ok) {
//   throw Error(responce.status)
// } else {
//   responce.json().then((data) => {
//     this.incrementPage()

//     console.log(data.hits)
//     return data.hits
//   })
// }
