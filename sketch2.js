let data;
let barHeight = 10;
let padding = 10;
let canvasHeight;

function preload() {
  // 读取CSV文件
  data = loadTable('data/data.csv', 'csv', 'header');
}

function setup() {
  // 根据数据行数计算画布高度
  canvasHeight = data.getRowCount() * (barHeight + padding) + padding;
  createCanvas(1500, canvasHeight); // 设置动态画布高度
  
  noStroke();
  textAlign(LEFT, CENTER);
  
  // 遍历每一行数据，绘制条形
  for (let i = 0; i < data.getRowCount(); i++) {
    let country = data.getString(i, 'Country Name');
    let cost = float(data.getString(i, 'Cost'));
    let tagGNI = float(data.getString(i, 'TagGNI'));
    let vergleich = float(data.getString(i, 'Vergleich')) / 100;
    let l = map(tagGNI, 0, 250, 0, 1000); // 映射到0-100范围
    let xPos = 300;  // 条形的起始横坐标
    let yPos = padding + i * (barHeight + padding); // 条形的纵坐标
    
        
    // cost
    fill(200, 255, 200); // 给主条形设置颜色
    rect(xPos - cost * 20, yPos, cost * 20, barHeight, 10); // 使用圆角矩形绘制

    // 绘制大条形（根据TagGNI值）
    fill(200, 100, 255); // 给主条形设置颜色
    rect(xPos, yPos, l, barHeight, 10); // 使用圆角矩形绘制
    
    // 绘制小条形（根据Vergleich比例）
    fill(0, 200, 255); // 给小条形设置颜色
    rect(xPos, yPos + 2, l * vergleich, barHeight * 0.6, 10); // 小条形比例的宽度
      
    // 绘制国家名称
    fill(0);
    text(country, 10, yPos + barHeight / 2);
  }
}

function draw() {
  // 可以添加动态效果或者交互，当前实现静态显示
}
