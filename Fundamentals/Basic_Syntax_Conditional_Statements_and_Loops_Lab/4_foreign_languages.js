// Write a program, which prints the language, that a given country speaks. You can receive only the following combinations: 
// •	English is spoken in England and USA;
// •	Spanish is spoken in Spain, Argentina, and Mexico;
// •	For the others, we should print "unknown";
// Input
//      You will receive a single country name.
// Output
//      Print the language, which the country speaks, or if it is unknown for your program, print "unknown".

function get_language(country) {
    const en_countries = ['England', 'USA'];
    const sp_countries = ['Spain', 'Argentina', 'Mexico'];
    if (en_countries.includes(country)) {
        console.log('English');
    } else if (sp_countries.includes(country)) {
        console.log('Spanish');
    } else {
        console.log('unknown');
    }
}

get_language('Spain');