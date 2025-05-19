export async function loadPromo(code){
    const response = await fetch("/data/promo.json");
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