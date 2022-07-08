function fromJSONToHTMLTable(inputJSON){
    const inputArray = JSON.parse(inputJSON);

    const headRow = (headersArray) => `<tr><th>${headersArray.map((str) => encodeURI(str)).join("</th><th>")}</th></tr>`;
    const dataRow = (dataArray) => `<tr><td>${dataArray.map((str) => encodeURI(str)).join("</td><td>")}</td></tr>`;

    const retval = ["<table>"];
    retval.push(headRow(Object.keys(inputArray[0])))
    inputArray.forEach((obj) => retval.push(dataRow(Object.values(obj))));
    retval.push("</table>");
    console.log(retval.join('\n'));


}

fromJSONToHTMLTable(`[{"Name":"Stamat","Score":5.5},{"Name":"Rumen","Score":6}]`);
