function createTemplate(template){
    const pattern = /{{(.+?)}}/g;

    return (data) => {
        return template.replace(pattern, (match, groupName) => {
            return data[groupName];
        })
    }
}

export {
    createTemplate, 
}