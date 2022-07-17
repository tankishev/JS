export { e, genDate };

function e(type, attributes, ...content) {
    const result = document.createElement(type);

    for (let [attr, value] of Object.entries(attributes || {})) {
        if (attr.substring(0, 2) == 'on') {
            result.addEventListener(attr.substring(2).toLocaleLowerCase(), value);
        } else {
            result[attr] = value;
        }
    }

    content = content.reduce((a, c) => a.concat(Array.isArray(c) ? c : [c]), []);

    content.forEach(e => {
        if (typeof e == 'string' || typeof e == 'number') {
            const node = document.createTextNode(e);
            result.appendChild(node);
        } else {
            result.appendChild(e);
        }
    });

    return result;
} 

function genDate(jsonDate, type){
    const d = new Date(jsonDate);
    if (type == 0){
        return `${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()} ${d.getHours()}:${d.getMinutes()}:${d.getSeconds()}`        
    }
    let ampm = 'AM';
    let hours = d.getHours();
    if (hours > 12) {
        hours -= 12;
        ampm = 'PM'
    }
    return `${d.getMonth() + 1}/${d.getDate()}/${d.getFullYear()}, ${hours}:${d.getMinutes()}:${d.getSeconds()} ${ampm}`        
}