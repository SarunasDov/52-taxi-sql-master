const mysql = require('mysql2/promise');

const app = {}

app.init = async () => {
    // prisijungti prie duomenu bazes
    const connection = await mysql.createConnection({
        host: 'localhost',
        user: 'root',
        database: 'taxi',
    });

    let sql = '';
    let rows = [];


    sql = 'SELECT * FROM `taxi`';
    [rows] = await connection.execute(sql);

    console.log(`Visi taksistai bendrai ivykde ${rows.length} keliones.`);

    sql = 'SELECT * FROM `taxi`';
    [rows] = await connection.execute(sql);
    let dr = [];
    for (let i = 0; i < rows.length; i++) {
        dr.push(rows[i].driver)
    }
    const filter = new Set(dr);
    const uniqueDrivers = [...filter]



    console.log(`Taksistais dirba: ${uniqueDrivers.join(', ')}.`);

    sql = 'SELECT * FROM `taxi`';
    [rows] = await connection.execute(sql);
    let dist = 0;
    for (const row of rows) {
        dist += parseInt(row.distance)
    }

    console.log(`Visu kelioniu metu nuvaziuota ${dist.toFixed()} km.`);



    sql = 'SELECT * FROM `taxi`';
    [rows] = await connection.execute(sql);
    let ivert = []
    for (const row of rows) {
        if (row.driver === 'Jonas') {
            ivert.push(row.rating)
        }
    }
    let rate = 0;
    for (const grade of ivert) {
        rate += grade
    }
    const finalGrade = rate / ivert.length
    console.log(`Jono ivertinimas yra ${finalGrade} zvaigzdutes.`);



    sql = 'SELECT * FROM `taxi`';
    [rows] = await connection.execute(sql);
    let kainos = [];
    for (let i = 0; i < rows.length; i++) {
        kainos.push(rows[0].driver)
        if (!kainos.includes(rows[0].driver)) {
            kainos.push(rows[i].price)
        }
    }
    let vidKaina = 0;
    for (const kaina of kainos) {
        vidKaina += kaina
    }
    const vidutineKaina = vidKaina / kainos.length
    console.log(`Vidutine kelioniu kaina yra ${vidutineKaina} EUR / km.`);
}


app.init();

module.exports = app;