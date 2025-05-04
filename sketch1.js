let data;

function preload(){
    data = loadTable('data/data.csv', 'csv', 'header'); 
}

function setup() {
    createCanvas(800, 800);
    noLoop();
    
    let rows = data.getRows();    

    // 按 GNI 排序
    rows.sort((a, b) => parseFloat(b.get("GNI")) - parseFloat(a.get("GNI")));
    
    let numCountries = rows.length;
    let radii = linspace(50, 200, numCountries);  
    let angleStep = TWO_PI / (numCountries / 4); 
    let centerX = width / 2;
    let centerY = height / 2;

    background(0);

    for (let i = 0; i < numCountries; i++) {
        let angle = angleStep * i;
        let radius = radii[i];

        // get data
        let costSize = map(parseFloat(rows[i].get("Cost")), 1.93, 5.92, 5, 50); 
        let gniSize = map(parseFloat(rows[i].get("GNI")), 480, 90810, 5, 50); 
        let alpha = map(parseFloat(rows[i].get("Percent cannot afford")), 0, 93.6, 0, 255); 

        let affordLength = map(parseFloat(rows[i].get("Affordability")), 0.17, 3.79, 10, 50); 
        let x = centerX + radius * cos(angle);
        let y = centerY + radius * sin(angle);

        strokeWeight(0.5);
        // cost
        stroke(100, 150, 255);
        fill(100, 150, 255, 100);
        ellipse(x, y, costSize, costSize);
        //gni
        stroke(255, 150, 150);
        fill(255, 150, 150, alpha);
        ellipse(x, y, gniSize, gniSize);

      // affordability - line
        // stroke('white');
        // let lineX = x + affordLength * cos(angle);
        // let lineY = y + affordLength * sin(angle);
        // line(x, y, lineX, lineY);

        // country
        noStroke();
        textSize(4);
        textAlign(CENTER, CENTER);
        fill(255);
        text(rows[i].getString("Country Name"), x, y);
    }
}

function linspace(start, end, num) {
    let arr = [];
    let step = (end - start) / (num - 1);
    for (let i = 0; i < num; i++) {
        arr.push(start + step * i);
    }
    return arr;
}
