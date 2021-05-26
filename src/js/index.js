import '../styles/main.css'

// import debounce from 'lodash.debounce'
const debounce = require('lodash.debounce')
import API from './api/apiService'

import { alert } from '@pnotify/core'
import '@pnotify/core/dist/PNotify.css'
import '@pnotify/core/dist/BrightTheme.css'
import '@pnotify/core/dist/Material.css'

import { refs } from './refs'

import imgGallery from '../templates/image-card.hbs'

refs.searchForm.addEventListener('submit', serchImages)
// refs.input.addEventListener('input', debounce(serchImages, 500))
refs.loadMoreBtn.addEventListener('click', onloadMore)

const newApi = new API()

function serchImages(e) {
  e.preventDefault()
  newApi.query = e.currentTarget.elements.query.value

  if (refs.input.value === ' ') {
    return errorMsg()
  }

  newApi.resetPage()
  newApi.fetchImages().then((images) => {
    if (images.length === 0) {
      return errorMsg()
    } else {
      addGalleryMarkup(images)
      refs.loadMoreBtn.classList.remove('is-hidden')
    }
  })
}

function onloadMore() {
  newApi.fetchImages().then(addGalleryMarkup)
}

function addGalleryMarkup(image) {
  refs.galleryContainer.insertAdjacentHTML('beforeend', imgGallery(image))

  window.scrollTo({
    top: refs.galleryContainer.scrollHeight,
    behavior: 'smooth',
  })
}

function errorMsg() {
  return alert({
    type: 'error',
    text: 'Please enter correct image name!',
    styling: 'brighttheme',
    mode: 'light',
  })
}
