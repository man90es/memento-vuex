# memento-vuex
![install size](https://packagephobia.com/badge?p=memento-vuex)
[![license](https://img.shields.io/github/license/octoman90/memento-vuex)](https://github.com/octoman90/memento-vuex/blob/master/LICENSE)

A minimalist Vuex plugin for persistent data storage.

> **Warning**
>
> This project is not maintained anymore. I recommend using [Pinia](https://github.com/vuejs/pinia) and [pinia-plugin-persistedstate](https://github.com/prazdevs/pinia-plugin-persistedstate) instead.

## Installation

With Yarn:

```bash
yarn add memento-vuex
```

With NPM:

```bash
npm install memento-vuex
```

## Usage
```javascript
import Vuex from "vuex"
import Memento from "memento-vuex"

export default Vuex.createStore({
	state: {
		colour:  "red",
		size:    "big",
		visible: true,
	}

	plugins: [
		Memento(
			// Mutations to watch and attributes to back up
			{
				setColour: "colour",
				setSize:   "size",
				// state.visible won't be backed up
			},
			// A name under which the backup is stored in localStorage
			// It's "vuex" by default, but it's recommended to set it to something meaningful
			"memento-example",
			// The name of a mutation that copies data to state
			// It's "import" by default, but you may change it
			"import"
		)
	],

	mutations: {
		setColour(state, colour) {
			state.colour = colour
		},

		setSize(state, size) {
			state.size = size
		},

		toggleVisible(state) {
			state.visible = !state.visible
		},

		// You have to have a mutation that copies data to state
		// This is one of the shortest implementations
		import(state, backup) {
			Object.assign(state, backup)
		},
	},
}
