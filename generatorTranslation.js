const fs = require('fs');
const readline = require('readline');

async function processLineByLine() {
  const fileStream = fs.createReadStream('districts.txt');

  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity
  });
  // Note: we use the crlfDelay option to recognize all instances of CR LF
  // ('\r\n') in input.txt as a single line break.

  for await (const line of rl) {
    // Each line in input.txt will be successively available here as `line`.
    const regex = /(?<=L3_).*?(?=\')/gm;
    // const regex = /(?<=value:\s\').*?(?=\')/gm;

    data = line.toString();
    const found = data.match(regex);
    const replaced = found[0].split('_').join(' ');
    const final = titleCase(replaced) + '\n'

    console.log('final: ', final);

    // data = data.replace(/(?<=value:\s\').*?(?=\')/gm, `${replaced}`);
    // data = data + '\n'
    // console.log(`Line from file: ${data}`);

    fs.appendFile('./output_translations.txt', final, err => {
      if (err) {
        console.error(err);
      }
      // file written successfully
    });
  }
}

function titleCase(str) {
  return str.toLowerCase().split(' ').map(function(word) {
    return word.replace(word[0], word[0].toUpperCase());
  }).join(' ');
}
processLineByLine();
