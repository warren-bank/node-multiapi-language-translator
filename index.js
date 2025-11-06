const libre = require('@warren-bank/libre-language-translator')
const deepl = require('@warren-bank/deepl-language-translator')

// note: this class is identical in both "libre" and "deepl" libraries
const DuplicatesStore = require('@warren-bank/libre-language-translator/lib/optimize-duplicates/duplicates_store')

const api = {
  service: null,
  key:     null,
  url:     null
}

const set_api = (api_service, api_key, api_url) => {
  api.service = api_service
  api.key     = api_key
  api.url     = api_url
}

const validate_api = () => {
  if (!api.service)
    throw new Error('"api_service" is not defined. Must call "set_api".')

  switch(api.service) {
    case 'libre':
      if (!api.url)
        throw new Error('"api_url" is required by "libre" service.')
      break
    case 'deepl':
      if (!api.key)
        throw new Error('"api_key" is required by "deepl" service.')
      break
    default:
      throw new Error('"api_service" is invalid.')
  }
}

const init = async () => {
  validate_api()

  switch(api.service) {
    case 'libre':
      return await libre.init(api.url)
    case 'deepl':
      return await deepl.init(api.key, api.url)
  }
}

const get_input_languages = () => {
  validate_api()

  switch(api.service) {
    case 'libre':
      return libre.get_input_languages(api.url)
    case 'deepl':
      return deepl.get_input_languages()
  }
}

const get_output_languages = (input_language) => {
  validate_api()

  switch(api.service) {
    case 'libre':
      return libre.get_output_languages(api.url, input_language)
    case 'deepl':
      return deepl.get_output_languages()
  }
}

const is_valid_input_language = (input_language) => {
  validate_api()

  switch(api.service) {
    case 'libre':
      return libre.is_valid_input_language(api.url, input_language)
    case 'deepl':
      return deepl.is_valid_input_language(input_language)
  }
}

const is_valid_output_language = (input_language, output_language) => {
  validate_api()

  switch(api.service) {
    case 'libre':
      return libre.is_valid_output_language(api.url, input_language, output_language)
    case 'deepl':
      return deepl.is_valid_output_language(output_language)
  }
}

const translate = async (...args) => {
  // const [input_language_code, output_language_code, input_strings_array, optimize_duplicates] = args

  validate_api()

  switch(api.service) {
    case 'libre':
      return await libre.translate(api.key, api.url, ...args)
    case 'deepl':
      return await deepl.translate(api.key, api.url, ...args)
  }
}

module.exports = {
  DuplicatesStore,
  set_api,
  init, // returns a promise: library is ready to use once resolved
  get_input_languages,
  get_output_languages,
  is_valid_input_language,
  is_valid_output_language,
  translate // returns a promise: resolves to an array of translated strings
}
