import AbstractProcessor from "./AbstractProcessor.js";

class FilterArgProcessor extends AbstractProcessor {
    /**
     * Method to filter data based on a regex pattern
     * @param {string} pattern - The regex pattern to filter the data
     * @param {Array} dataList - The data list to be filtered
     * @returns {Array|undefined} - Filtered data or undefined if no match found
     */
    process(pattern, dataList) {
        if (!pattern || pattern.length === 0) {
            return undefined;
        }
        const regex = new RegExp(pattern);
        const result = dataList?.flatMap(country => {
            const people = country.people.flatMap(person => {
                const animals = person.animals.flatMap(animal => {
                    return regex.test(animal.name) ? animal : []
                });
                return animals.length > 0 ? { ...person, animals } : []
            });
            return people.length > 0 ? { ...country, people } : []
        });
        if (result?.length > 0) {
            return result;
        }
        return undefined;
    }
}

export default new FilterArgProcessor();