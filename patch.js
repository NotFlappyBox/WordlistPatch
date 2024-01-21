read = new FileReader;
read2 = new FileReader;

const fileSelector = document.getElementById('file-selector');
fileSelector.addEventListener('change', (event) => {
  const file = event.target.files[0];
  read.readAsText(file);
});

const fileSelector2 = document.getElementById('file-selector2');
fileSelector2.addEventListener('change', (event) => {
  const file = event.target.files[0];
  read2.readAsText(file);
});

function patch() {
  const data = JSON.parse(read.result);
  const patch = JSON.parse(read2.result);
  var keys = [];
  for (let i of data.items) {
    keys.push(i.key);
  }
  for (let i in patch.items) {
    if (!keys.includes(patch.items[i].key)) {
      data.items.push(patch.items[i]);
    }
  }
  var patchedData = JSON.parse(JSON.stringify(data));
  for (let i in data.items) {
    if (data.items[i].englishUsText == undefined) {
      patchedData.items[i].englishUsText = data.items[i].japaneseText;
      patchedData.items[i].englishUsFontType = data.items[i].japaneseFontType;
    }
    if (data.items[i].chineseTText == undefined) {
      patchedData.items[i].chineseTText = data.items[i].japaneseText;
      patchedData.items[i].chineseTFontType = data.items[i].japaneseFontType;
    }
    if (data.items[i].koreanText == undefined) {
      patchedData.items[i].koreanText = data.items[i].japaneseText;
      patchedData.items[i].koreanFontType = data.items[i].japaneseFontType;
    }
    if (data.items[i].chineseSText == undefined) {
      patchedData.items[i].chineseSText = data.items[i].japaneseText;
      patchedData.items[i].chineseSFontType = data.items[i].japaneseFontType;
    }
  }
  downloadObjectAsJson(patchedData, 'wordlist');
}

function downloadObjectAsJson(exportObj, exportName){
  var dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(exportObj));
  var downloadAnchorNode = document.createElement('a');
  downloadAnchorNode.setAttribute("href",     dataStr);
  downloadAnchorNode.setAttribute("download", exportName + ".json");
  document.body.appendChild(downloadAnchorNode); // required for firefox
  downloadAnchorNode.click();
  downloadAnchorNode.remove();
}