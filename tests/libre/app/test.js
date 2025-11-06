const {set_api, translate} = require('../../..')

const libre_example = async () => {
  const api_service          = 'libre'
  const api_key              = process.env.LIBRE_TRANSLATE_API_KEY
  const api_url              = process.env.LIBRE_TRANSLATE_API_URL
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

libre_example()
