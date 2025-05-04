let data;

function preload(){
    data = loadTable('data/data.csv', 'csv', 'header'); 
}

function setup() {
    createCanvas(1000, 600);
    noLoop();
    background(0);
    textSize(8);
    angleMode(RADIANS);

    let rows = data.getRows();    
    rows.sort((a, b) => parseFloat(b.get("GNI")) - parseFloat(a.get("GNI")));

    let numCountries = rows.length;
    let margin = 60;
    let barWidth = 10;
    let groupGap = 25;
    let categoryGap = 3;

    // Y 轴的最大 bar 高度
    let maxBarHeight = 300;
    let baseLine = height - 80;

    for (let i = 0; i < numCountries; i++) {
        let row = rows[i];
        let xStart = margin + i * (3 * (barWidth + categoryGap) + groupGap);

        // 获取数值并映射到高度
        let gniVal = map(parseFloat(row.get("GNI")), 480, 90810, 5, maxBarHeight);
        let costVal = map(parseFloat(row.get("Cost")), 1.93, 5.92, 5, maxBarHeight * 0.6);
        let affordVal = map(parseFloat(row.get("Affordability")), 0.17, 3.79, 5, maxBarHeight);

        // 每组3个 bar
        drawBar(xStart, baseLine, barWidth, gniVal, color(255, 150, 150)); // GNI
        drawBar(xStart + barWidth + categoryGap, baseLine, barWidth, costVal, color(100, 150, 255)); // Cost
        drawBar(xStart + 2 * (barWidth + categoryGap), baseLine, barWidth, affordVal, color(150, 255, 150)); // Affordability

        // 国家标签
        push();
        translate(xStart + 1.5 * (barWidth + categoryGap), baseLine + 5);
        rotate(PI / 4);
        fill(255);
        noStroke();
        textAlign(LEFT, TOP);
        text(row.getString("Country Name"), 0, 0);
        pop();
    }
}

function drawBar(x, baseY, barW, barH, barColor) {
    fill(barColor);
    noStroke();
    rect(x, baseY - barH, barW, barH);  // 向上绘制
}
