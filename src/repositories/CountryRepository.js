import data from "../data/data.js";

/**
 * Class to handle country data
 * and provide access to the data list.
 */
class CountryRepository {

    #dataList
    constructor() { 
        this.#dataList = data;
    }

    get dataList() {
        return structuredClone(this.#dataList);
    }
}

export default new CountryRepository();