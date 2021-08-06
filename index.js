const defaultLocalStorageAttr = "vuex"
const defaultImportMutation   = "import"

export default function(persistentMutations, localStorageAttr = defaultLocalStorageAttr, importMutation = defaultImportMutation) {
	let data = {}

	return function(store) {
		// Parse and commit existing data on start
		if (undefined !== localStorage[localStorageAttr]) {
			data = JSON.parse(localStorage[localStorageAttr])
			store.commit(importMutation, data)
		}

		// Watch and save mutations
		store.subscribe((mutation, state) => {
			if (mutation.type in persistentMutations && defaultImportMutation !== mutation.type) {
				data[persistentMutations[mutation.type]] = state[persistentMutations[mutation.type]]
				localStorage[localStorageAttr] = JSON.stringify(data)
			}
		})
	}
}
