const { list } = require("./endpoints");

exports.capitalizeFirstLetter = (s) => {
    if (typeof s !== 'string') return ''
    return s.charAt(0).toUpperCase() + s.slice(1);
}
exports.sortBy = (predicat, list) => { //predicat est une vaut "name" ou "category" list est le getall du repository
    if (predicat == 'name') {
        return list.sort(function (a, b) {
            if (a.Name < b.Name) { return -1; }
            if (a.Name > b.Name) { return 1; }
            return 0;
        });
    } else if (predicat == 'category') {
        return list.sort(function (a, b) {
            if (a.Category < b.Category) { return -1; }
            if (a.Category > b.Category) { return 1; }
            return 0;
        });
    }
}
//exports.endsWith = (s, c) => {
//    if (typeof s !== 'string' && typeof c !== 'string') return false
//    return s.charAt(s.length) == c;
//}
//woups ca existe deja 
exports.getIdByName = (name, list) => {
    let id = 0
    list.forEach(element => {
        if (element.Name == name)
            id = element.Id;
    });
    return id;
}
exports.allNamelike = (string, list) => {
    let curratedList = []
    string = string.slice(0, -1) //enlever '*'
    list.forEach(element => {
        if (element.Name.startsWith(string))
            curratedList.push(element);
    });
    return curratedList;
}
exports.allWhereCategoryIs = (category, list) => {
    let curratedList = []
    list.forEach(element => {
        if (element.Category == category)
            curratedList.push(element);
    });
    return curratedList;
}
exports.isNameinList = (name, list) => {
    let exists = false;
    list.forEach(element => {
        if (element.Name == name)
            exists = true;
    });
    return exists
}
exports.isUrlValid = (url) => {
    let tabDomain = ['.com', '.ca', '.fr', '.qc', '.edu', '.gov', '.net', '.org'];
    let bool = false;
    tabDomain.forEach(element => {
        if (url.includes(element))
            bool = true;
    })
    return bool;
}
exports.validate = (bookmark, list) => {
    let res = {}
    if (isNaN(bookmark.id))
        res = { "Erreur": "id n'est pas un chiffre" };
    if (bookmark.Name == null || bookmark.Name == '' || bookmark.Category == null || bookmark.Category == '' || bookmark.Url == null || bookmark.Url == '')
        res = { "Erreur": "un des parametre n'est pas valide" };
    if (this.isNameinList(bookmark.Name, list))
        res = { "Erreur": "ce nom existe deja" };
    if (!this.isUrlValid(bookmark.Url))
        res = { "Erreur": "l'url n'as pas un domaine valide" };
    if(res = {})
        return "valid"
    else
        return res
}