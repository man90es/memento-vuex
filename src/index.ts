const defaultLocalStorageAttr = "vuex"
const defaultImportMutation   = "import"

type VuexState = {
	[key: string]: any
}

type VuexMutation = {
	type: string
}

export default function(persistentMutations: { [key: string]: string }, localStorageAttr = defaultLocalStorageAttr, importMutation = defaultImportMutation) {
	let data: VuexState = {}

	return function(store: any) {
		// Parse and commit existing data on start
		const backup = localStorage.getItem(localStorageAttr)
		if (null !== backup) {
			data = JSON.parse(backup)
			store.commit(importMutation, data)
		}

		// Watch and save mutations
		store.subscribe((mutation: VuexMutation, state: VuexState) => {
			const mutationType = mutation.type

			if (mutationType in persistentMutations && defaultImportMutation !== mutationType) {
				data[persistentMutations[mutationType]] = state[persistentMutations[mutationType]]
				localStorage[localStorageAttr] = JSON.stringify(data)
			}
		})
	}
}
