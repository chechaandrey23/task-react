export default class Paginator {
	#countRows = 0;
	#currentPage = 1;
	#lastAddCountRow = 0;

	#appends = 0;
	#deleted = 0;

	#hasMore = false;

	constructor(defaultCountRows) {
		this.#countRows = defaultCountRows * 1;
	}

	replace(state, stateName, data) {
		if(!Array.isArray(data)) throw new Error('Third argument must be Array');
		this.#currentPage = 1;
		state[stateName] = [...data];
		//if(data.length >= this.#countRows) {
			this.#currentPage++;// only 1 page
			this.#lastAddCountRow = 0;
		//} else {
			//this.#lastAddCountRow = data.length;
		//}
		this.#hasMore = data.length>0?true:false;
	}

	remove(state, stateName, fn) {
		if(typeof fn !== 'function') throw new Error('Third argument must be Function');
		//const limit = state[stateName].length - this.#lastAddCountRow;
		let appended = 0;
		state[stateName] = state[stateName].filter((entry, index, array) => {
			const res =  fn(entry, index, array);
			if(res) {
				//if(entry.__append__) appended++;
				this.#lastAddCountRow--;
				if(this.#lastAddCountRow < 0) {
					this.#lastAddCountRow = this.#countRows - 1;
					this.#currentPage--;
					if(this.#currentPage < 1) this.#currentPage = 1;
				}
				this.#deleted++;
			}
			return !res;
		});
		this.#appends -= appended;
	}

	append(state, stateName, data) {
		if(!Array.isArray(data)) throw new Error('Third argument must be Array');
		let appended = 0;
		state[stateName] = [...(data.map((entry) => {
			if(entry) {
				//entry.__append__ = true;
				appended++;
				this.#lastAddCountRow++;
				if(this.#lastAddCountRow >= this.#countRows) {
					this.#currentPage++;// only 1 page
					this.#lastAddCountRow = 0;
				}
			}
			return entry;
		})), ...state[stateName]];
		this.#appends += appended;
	}

	addWithReplace(state, stateName, data, fn) {
		if(!Array.isArray(data)) throw new Error('Third argument must be Array');
		if(this.#lastAddCountRow === 0) {
			state[stateName] = [...state[stateName], ...data];
		} else {
			state[stateName] = [...[...state[stateName]].filter((entry) => {
				if(data.findIndex((el) => {return fn.call(null, el, entry)}) > -1) {
					return false;
				} else {
					return true;
				}
			}), ...data];
		//	const end = state[stateName].length - this.#lastAddCountRow;
		//	state[stateName] = [...state[stateName].slice(0, end<0?0:end), ...data];
		}
		//if(data.length >= this.#countRows) {
		if(data.length > 0) {
			this.#currentPage++;// only 1 page
			this.#lastAddCountRow = 0;
		}

		this.#hasMore = data.length>0?true:false;
		//} else {
		//	this.#lastAddCountRow = data.length;
		//}
	}
	/*
	addToEnd(state, stateName, data) {
		if(!Array.isArray(data)) throw new Error('Third argument must be Array');
		state[stateName] = [...state[stateName], ...data];
		this.#lastAddCountRow += data.length;
		if(this.#lastAddCountRow >= this.#countRows) {
			this.#currentPage += Math.floor(this.#lastAddCountRow/this.#countRows);
			this.#lastAddCountRow = this.#lastAddCountRow % this.#countRows;
		}
	}
	*/
	getPageForQuery() {
		return this.#currentPage;
	}

	getDefaultCountRows() {
		return this.#countRows;
	}

	getAppends() {
		return this.#appends;
	}

	getDeleted() {
		return this.#deleted;
	}

	hasMore() {
		return this.#hasMore;
	}
}
