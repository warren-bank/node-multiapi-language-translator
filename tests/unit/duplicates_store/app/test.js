const {DuplicatesStore} = require('../../../..')

const duplicates_store_example = async () => {
  const input_strings_array              = ['Hello world', 'Welcome to the jungle', 'Hello world', 'Welcome to the jungle']
  const deduped_translated_strings_array = ['Hallo Welt', 'Willkommen im Dschungel']

  const duplicates_store                 = new DuplicatesStore(input_strings_array)
  const deduped_input_strings_array      = duplicates_store.dehydrate_input_strings_array()
  const translated_strings_array         = duplicates_store.rehydrate_translated_strings_array(deduped_translated_strings_array)

  console.log(
    'count of input strings',
    '=',
    input_strings_array.length
  )
  console.log(
    'count of deduped input strings',
    '=',
    deduped_input_strings_array.length
  )
  console.log(
    'count of deduped translated strings',
    '=',
    deduped_translated_strings_array.length
  )
  console.log(
    'count of rehydrated translated strings',
    '=',
    translated_strings_array.length
  )

  console.log("\n" + '-'.repeat(40) + "\n")

  console.log(
    'input strings',
    '=',
    JSON.stringify(input_strings_array, null, 2)
  )
  console.log(
    'deduped input strings',
    '=',
    JSON.stringify(deduped_input_strings_array, null, 2)
  )
  console.log(
    'deduped translated strings',
    '=',
    JSON.stringify(deduped_translated_strings_array, null, 2)
  )
  console.log(
    'rehydrated translated strings',
    '=',
    JSON.stringify(translated_strings_array, null, 2)
  )
}

duplicates_store_example()
