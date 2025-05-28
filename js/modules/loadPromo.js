/**
 * Loads promo discount from local JSON
 * file based on the given code.
 * 
 * @async
 * @export
 * @param {string} code - The promo code
 */
export async function loadPromo(code){
    const response = await fetch("../data/promo.json");
    const data = await response.json();
    const codes = data.codes;

    const match = codes.find(c => c.code === code);

    if (!match){
        return;
    }
    else{
        return match.amount;
    }
}