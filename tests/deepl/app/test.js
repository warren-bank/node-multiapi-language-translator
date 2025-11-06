const {set_api, translate} = require('../../..')

const deepl_example = async () => {
  const api_service          = 'deepl'
  const api_key              = process.env.DEEPL_TRANSLATE_API_KEY
  const api_url              = process.env.DEEPL_TRANSLATE_API_URL
  const input_language_code  = 'en'
  const output_language_code = 'de'
  const input_strings_array  = ['Hello world', 'Welcome to the jungle', 'Hello world', 'Welcome to the jungle']
  const optimize_duplicates  = true

  set_api(api_service, api_key, api_url)

  const translated_strings_array = await translate(input_language_code, output_language_code, input_strings_array, optimize_duplicates)

  console.log(
    `"${api_service}" translation from "${input_language_code}" to "${output_language_code}"`,
    '=',
    JSON.stringify(translated_strings_array, null, 2)
  )
}

deepl_example()
