function solve() {
  const input = document.getElementById('input').value
    .split(/\.\s?/)
    .filter((el) => el.length > 0);
  const output = document.getElementById('output');
  
  for (let i = 0; i < input.length; i += 3){
    const child = document.createElement('p');
    child.textContent = input.slice(i, i + 3).join('.') + '.';   
    output.appendChild(child);
  }
}