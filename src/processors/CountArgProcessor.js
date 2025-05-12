import AbstractProcessor from "./AbstractProcessor.js";

class CountArgProcessor extends AbstractProcessor {
    /**
     * Method to count the number of people in each country
     * and the number of animals for each person
     * and add the count to the name of the country and person respectively
     * @param {Array} dataList - Array of countries with people and animals
     * @returns {Array} - Array of countries with updated names
     */
    process(dataList) {
        const result = dataList?.map(country => {
            if (!country?.people) {
                return country;
            }
            country.name = `${country.name} [${country.people?.length}]`;
            country.people = country.people.map(person => {
                person.name = `${person.name} [${person.animals?.length}]`;
                return person;
            });
            return country;
        });
        if (result?.length > 0) {
            return result;
        }
        return undefined;
    }
}

export default new CountArgProcessor();