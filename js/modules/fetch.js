/**
 * Fetches JSON data from the given URI using the Fetch API.
 * Handles HTTP errors and logs any exceptions to the console.
 *
 * @async
 * @export
 * @param {string} uri - The endpoint URL to fetch data from
 */
export async function fetchData(uri) {
    try {
        const response = await fetch(uri);

        if(!response.ok) {
            throw new Error(`Network Error: failed to fetch data\nError code: ${response.status}`);
        }

        const data = await response.json();
        
        return data;
    } catch (error) {
        console.log(error);
    }
}