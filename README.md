### [multiapi-language-translator](https://github.com/warren-bank/node-multiapi-language-translator)

Multi-API language translation library. Supported APIs: [LibreTranslate&trade;](https://github.com/LibreTranslate/LibreTranslate), [DeepL&trade;](https://www.deepl.com/).

#### Requirements:

* access to a server hosting one of the supported language translation service APIs
  - [LibreTranslate](https://github.com/LibreTranslate/LibreTranslate#mirrors)
    * API key
    * API URL
  - [DeepL](https://www.deepl.com/en/pro-api)
    * API key

#### Supported Languages

* the list of supported input and output languages depends upon the chosen API
  - [LibreTranslate](https://github.com/warren-bank/node-libre-language-translator#supported-languages)
    * there is no guarantee for consistency, either between server instances or over time
    * to obtain a real-time list of supported languages from a specific server instance, directly query its `<API URL>/languages` [API](https://libretranslate.com/docs) endpoint
  - [DeepL](https://github.com/warren-bank/node-deepl-language-translator#supported-input-languages)

#### Installation

```bash
npm install @warren-bank/multiapi-language-translator
```

- - - - -

#### Library API (common usage)

* set_api(api_service, api_key, api_url)
  - input parameters:
    * api_service
      - type: string
      - name of the chosen language translation service
      - value is restricted to the enum: ["libre", "deepl"]
    * api_key
      - type: string | `null`
      - unique to the chosen language translation service
      - required by service: "deepl"
    * api_url
      - type: string | `null`
      - unique to the chosen language translation service
  - return value:
    * `undefined`

* translate(input_language_code, output_language_code, input_strings_array, optimize_duplicates)
  - input parameters:
    * input_language_code
      - type: string
      - value is restricted to the [list of supported languages](#supported-languages)
    * output_language_code
      - type: string
      - value is restricted to the [list of supported languages](#supported-languages)
    * input_strings_array
      - type: array of strings
      - each string will be translated from `input_language_code` to `output_language_code`
      - the order of strings is preserved in the resolved return value
    * optimize_duplicates
      - type: boolean
      - default: false
      - when true:
        * duplicate strings are removed from the request to the translation service
        * translations for duplicate input strings are positionally inserted into the response from the translation service
          - the resolved value is identical to that of a non-optimized request
          - the benefit is that the translation service performs less work
  - return value:
    * Promise that resolves to an array of translated strings in the same order as the input array
  - prerequisites:
    * `set_api()`
  - notes:
    * `init()` is called internally

#### Library API (advanced usage)

* init()
  - input parameters:
    * _none_
  - return value:
    * Promise that resolves when library is ready to use
  - prerequisites:
    * `set_api()`

* get_input_languages()
  - input parameters:
    * _none_
  - return value:
    * array of strings that identifies all valid input language codes
  - prerequisites:
    * `set_api()` and `init()`

* get_output_languages(input_language_code)
  - input parameters:
    * input_language_code
      - type: string
      - value is restricted to the [list of supported languages](#supported-languages)
  - return value:
    * array of strings that identifies all valid output language codes for the specified input language code
  - prerequisites:
    * `set_api()` and `init()`

* is_valid_input_language(input_language_code)
  - input parameters:
    * input_language_code
      - type: string
  - return value:
    * type: boolean
    * value indicates whether the specified input language code is in the [list of supported languages](#supported-languages)
  - prerequisites:
    * `set_api()` and `init()`

* is_valid_output_language(input_language_code, output_language_code)
  - input parameters:
    * input_language_code
      - type: string
      - value is restricted to the [list of supported languages](#supported-languages)
    * output_language_code
      - type: string
  - return value:
    * type: boolean
    * value indicates whether the specified output language code is in the [list of supported languages](#supported-languages) for the specified input language code
  - prerequisites:
    * `set_api()` and `init()`

#### Library API (very advanced usage)

* class: `DuplicatesStore`
  - constructor: DuplicatesStore(input_strings_array)
    * input parameters:
      - input_strings_array
        * type: array of strings
        * array may contain duplicate values
  - dehydrate_input_strings_array()
    * input parameters:
      - _none_
    * return value:
      - type: array of strings
      - array does not contain any duplicates
  - rehydrate_translated_strings_array(translated_strings_array)
    * input parameters:
      - translated_strings_array
        * type: array of strings
        * array does not contain any duplicates
    * return value:
      - type: array of strings
      - array may contain duplicate values

#### Library Examples

```javascript
const {set_api, translate} = require('@warren-bank/multiapi-language-translator')

const deepl_example = async () => {
  const api_service          = 'deepl'
  const api_key              = 'MY_DEEPL_TRANSLATE_API_KEY'
  const api_url              = null
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
```

- - - - -

#### Legal:

* copyright: [Warren Bank](https://github.com/warren-bank)
* license: [GPL-2.0](https://www.gnu.org/licenses/old-licenses/gpl-2.0.txt)
