let data;
let barWidth = 10;
let padding = 10;
let canvasWidth;

let sortedRows = [];

function preload() {
  data = loadTable('data/data.csv', 'csv', 'header');
}

function setup() {
  // 按 TagGNI 降序排列
  sortedRows = [...data.getRows()];
  sortedRows.sort((a, b) => parseFloat(b.get("TagGNI")) - parseFloat(a.get("TagGNI")));

  // 根据国家数量计算横向总宽度
  canvasWidth = sortedRows.length * (barWidth + padding) + padding;
  createCanvas(canvasWidth, 2000); // 横向画布

  noStroke();
  textAlign(CENTER, TOP);
  textSize(8);

  let baseY = 1400; // 所有条形图的基线高度

  for (let i = 0; i < sortedRows.length; i++) {
    let row = sortedRows[i];
    let country = row.get("Country Name");
    let cost = float(row.get("Cost"));
    let tagGNI = float(row.get("TagGNI"));
    let vergleich = float(row.get("Vergleich")) / 100;

    let l = map(tagGNI, 0, 250, 0, 1000); // GNI 映射高度
    let costHeight = (cost, 0, 10, 0, 300); ;
    let vergleichHeight = l * vergleich;

    let xPos = padding + i * (barWidth + padding);

    // Cost Bar（底部反向）
    fill(200, 255, 200);
    rect(xPos, baseY - costHeight, barWidth, costHeight, 4);

    // GNI 主条
    fill(200, 100, 255);
    rect(xPos, baseY - costHeight - l - 5, barWidth, l, 4);

    // 比例小条
    fill(0, 200, 255);
    rect(xPos, baseY - costHeight - vergleichHeight - 5, barWidth, vergleichHeight * 0.6, 4);

    // 国家名
    fill(0);
    push();
    translate(xPos + barWidth / 2, baseY + 5);
    rotate(PI / 4);
    text(country, 0, 0);
    pop();
  }
}

function draw() {
  // 静态显示
}
