let data;
let barWidth = 10;
let padding = 10;
let canvasWidth;

let sortedRows = [];

function preload() {
  data = loadTable('data/data.csv', 'csv', 'header');
}

function setup() {
  sortedRows = [...data.getRows()];
  sortedRows.sort((a, b) => parseFloat(b.get("TagGNI")) - parseFloat(a.get("TagGNI")));

  canvasWidth = sortedRows.length * (barWidth + padding) + padding;
  createCanvas(canvasWidth, 2500); // 横向画布
  textSize(12); // 调整文字大小为12
  textAlign(CENTER, TOP);
  noStroke();
}

function draw() {
  background(255); // 清空画布

  let baseY = 1400;
  let hoveredIndex = -1;

  for (let i = 0; i < sortedRows.length; i++) {
    let row = sortedRows[i];
    let country = row.get("Country Name");
    let cost = parseFloat(row.get("Cost"));
    let powcost = Math.pow((cost), 2); // 对 Cost 进行平方处理
    let tagGNI = parseFloat(row.get("TagGNI"));
    let sqrtGNI = Math.sqrt(tagGNI);
    let vergleich = parseFloat(row.get("Vergleich")) / 100;

    // let l = map(tagGNI, 0, 250, 0, 1000);
    let l = map(sqrtGNI, 0, Math.sqrt(250), 0, 1000); // 使用平方根映射
    let costHeight = map(powcost, 0, 100, 0, 400); 
    let vergleichHeight = l * vergleich;

    let xPos = padding + i * (barWidth + padding);

    // 检查鼠标是否悬停在 GNI 主条上
    if (
      mouseX >= xPos &&
      mouseX <= xPos + barWidth &&
      mouseY >= baseY - l - 5 &&
      mouseY <= baseY
    ) {
      hoveredIndex = i;
    }

    // 绘制 Cost
    fill('lightgreen');
    rect(xPos, baseY, barWidth, costHeight, 4);

    // 绘制 GNI
    fill('lightblue');
    rect(xPos, baseY - l - 5, barWidth, l, 4);

    // 绘制 Vergleich
    fill('red');
    rect(xPos + 3, baseY - vergleichHeight - 2, barWidth - 6, vergleichHeight, 4);

    // 国家标签
    // fill(0);
    // push();
    // translate(xPos + barWidth / 2, baseY + 5);
    // rotate(PI / 4);
    // text(country, 0, 0);
    // pop();
  }

  // 如果有悬停，则显示 tooltip
  if (hoveredIndex !== -1) {
    let row = sortedRows[hoveredIndex];
    let country = row.get("Country Name");
    let cost = parseFloat(row.get("Cost")).toFixed(2);
    let tagGNI = parseFloat(row.get("TagGNI")).toFixed(2);
    let vergleich = parseFloat(row.get("Vergleich")).toFixed(1);

    fill(255);
    stroke(0);
    strokeWeight(0.5);
    rect(mouseX + 10, mouseY, 300, 120, 5); // 调整宽度为160，高度为80
    noStroke();
    fill(0);
    textAlign(LEFT, TOP);
    textSize(20); // 调整 tooltip 的文字大小为10
    text(`Country: ${country}\nTagGNI: ${tagGNI}\nCost: ${cost}\nVergleich: ${vergleich}%`, mouseX + 15, mouseY + 10); // 调整文字位置
  }
}
