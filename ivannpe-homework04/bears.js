// Add your Bear Class here along with helper functions
const fs = require('fs');

class Bear{
    constructor(imagePath, label, weight){
        this.imagePath = imagePath;
        this.label = label;
        this.weight = weight;
    }
}

module.exports = {
    Bear: Bear,
    //reads files using readdir and readfile. gets content from file and parses as a json
    readFiles(dirname, onFileContent) {
        fs.readdir(dirname, function(err, filenames) {
          if (err) {
            throw(err);
            return;
          }
          filenames.forEach(function(filename) {
            fs.readFile(dirname + filename, 'utf-8', function(err, content) {
              if (err) {
                throw(err);
                return;
              }
              onFileContent(JSON.parse(content));
            });
          });
        });
      }
}

