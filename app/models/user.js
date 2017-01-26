var sqlite3 = require('sqlite3').verbose(),
    db = new sqlite3.Database('data/nmdb.db'),
    resp = require('./NMResponse'),
    USER = {};

USER.init = function (name){
    this.id = "";
    this.name = name;
}

//crea y elimina la tabla usuarios
USER.createTable = function () {
    db.run("DROP TABLE IF EXISTS users");
    db.run("CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT)");
    console.log("the table 'users' has been created.")
}

//agrega un usuario
USER.addUser = function (userData) {
    var stmt = db.prepare("INSERT INTO users VALUES (?,?);")
    stmt.run(null, userData.name);
    stmt.finalize();
}

USER.getUser = function (userId, callback) {
    //si no hay user id, retorna todos los usuarios
    if (!userId) {
        var NMResp = new resp.Response();    
        db.all("SELECT * FROM users", (err, rows) => {
            if(err){
                NMResp.count = "0";
                NMResp.error = err;

                callback(null, NMResp);
                //throw err;
            }
            else{
                
                var filas = JSON.parse(JSON.stringify(rows));

                NMResp.count = filas.length;
                NMResp.data = rows;
                // var filas = JSON.parse(rows);
                // console.log(filas);
                
                console.log(NMResp);
                //console.log(NMResp.count, rows);
                callback(null,NMResp);
            }
        })
    }
    //si se quiere encontrar un usuario por el id
    else
    {
        var stmt = db.prepare("SELECT * FROM users WHERE id = ?");
        //se pasa el userId a la consulta
        stmt.bind(userId);
        stmt.get((err, row)=>{
            if(err){
                throw err;
            }  
            else{
                console.log("The user not exists.");
            }
        });

    }
}

//exporto el modulo para usarlo en el require.
module.exports = USER;