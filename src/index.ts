const defaultLocalStorageAttr = "vuex"
const defaultImportMutation   = "import"

type VuexState = {
	[key: string]: any
}

type VuexMutation = {
	type: string
}

type VuexStore = {
	commit: (mutationName: string, data: any) => any
	subscribe: (handler: (mutation: VuexMutation, state: VuexState) => void) => any
}

export default function(persistentMutations: { [key: string]: string }, localStorageAttr = defaultLocalStorageAttr, importMutation = defaultImportMutation) {
	let data: VuexState = {}

	return function(store: VuexStore) {
		// Parse and commit existing data on start
		const backup = localStorage.getItem(localStorageAttr)
		if (null !== backup) {
			data = JSON.parse(backup)
			store.commit(importMutation, data)
		}

		// Watch and save mutations
		store.subscribe((mutation, state) => {
			const mutationType = mutation.type

			if (mutationType in persistentMutations && defaultImportMutation !== mutationType) {
				data[persistentMutations[mutationType]] = state[persistentMutations[mutationType]]
				localStorage[localStorageAttr] = JSON.stringify(data)
			}
		})
	}
}
