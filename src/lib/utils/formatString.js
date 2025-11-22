export function capitalizeFirstLetter(word) {
    if (typeof(word) !== "string" || word.length === 0){
        return ""
    }
    return word.charAt(0).toUpperCase() + word.slice(1);
}

export function toTitleCase(sentence) {
    if (typeof(sentence) !== "string" || sentence.length === 0){
        return ""
    }
    return sentence.split(" ").map(word => {
        return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
    }).join(' ');
}