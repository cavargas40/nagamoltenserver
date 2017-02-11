var sqlite3 = require('sqlite3').verbose(),
    db = new sqlite3.Database('data/nm.db'),
    resp = require('./NMResponse'),
    MODEL = {};


USER = {};


MODEL.init = () => {    
    //MODEL.dropTables();
    MODEL.createTables();
    //MODEL.InsertData();
    // db.run("PRAGMA foreign_keys = off;");
    // db.run("PRAGMA foreign_keys = on;");

    //console.log("Table and Data created successful");
}


MODEL.dropTables = () => {
    db.run("DROP TABLE IF EXISTS attachments;");
    db.run("DROP TABLE IF EXISTS characters;");
    db.run("DROP TABLE IF EXISTS comments;");
    db.run("DROP TABLE IF EXISTS errorLog;");
    db.run("DROP TABLE IF EXISTS guildevents;");
    db.run("DROP TABLE IF EXISTS infolist;");
    db.run("DROP TABLE IF EXISTS posts;");
    db.run("DROP TABLE IF EXISTS posttype;");
    db.run("DROP TABLE IF EXISTS raidguide;");
    db.run("DROP TABLE IF EXISTS raids;");
    db.run("DROP TABLE IF EXISTS rol;");
    db.run("DROP TABLE IF EXISTS users;");
}

MODEL.createTables = () => {
    db.run("CREATE TABLE rol ("
        + "    rolId       INTEGER      NOT NULL"
        + "                             PRIMARY KEY AUTOINCREMENT,"
        + "    description VARCHAR (60) DEFAULT NULL"
        + ");");

    db.run("CREATE TABLE users ("
        + "    userId       INTEGER       NOT NULL"
        + "                               PRIMARY KEY AUTOINCREMENT,"
        + "    name         VARCHAR (200) DEFAULT NULL,"
        + "    token        VARCHAR (200) DEFAULT NULL,"
        + "    imgavatar    VARCHAR (100) DEFAULT NULL,"
        + "    creationdate DATETIME      DEFAULT NULL,"
        + "    rol_rolId    INTEGER       NOT NULL"
        + "                               REFERENCES rol (rolId) "
        + ");");

    db.run("CREATE TABLE characters ("
        + "    characterId  INTEGER       NOT NULL"
        + "                               PRIMARY KEY AUTOINCREMENT,"
        + "    name         VARCHAR (200) DEFAULT NULL,"
        + "    urlarmory    VARCHAR (200) DEFAULT NULL,"
        + "    users_userId INTEGER       NOT NULL"
        + "                               REFERENCES users (userId) "
        + ");");

    db.run("CREATE TABLE comments ("
        + "    commentId        INTEGER       NOT NULL"
        + "                                   PRIMARY KEY AUTOINCREMENT,"
        + "    description      VARCHAR (200) DEFAULT NULL,"
        + "    date             DATETIME      DEFAULT NULL,"
        + "    eventOrPostId    INT (11)      DEFAULT NULL,"
        + "    list_commentType VARCHAR (20)  DEFAULT NULL,"
        + "    users_userId     INTEGER       NOT NULL"
        + "                                   REFERENCES users (userId) "
        + ");");

    db.run("CREATE TABLE errorLog ("
        + "    errorlogId     INTEGER        NOT NULL"
        + "                                  PRIMARY KEY AUTOINCREMENT,"
        + "    descriptionLog VARCHAR (2000) DEFAULT NULL,"
        + "    errordate      DATETIME       DEFAULT NULL,"
        + "    userId         INTEGER        DEFAULT '-1'"
        + ");");

    db.run("CREATE TABLE guildevents ("
        + "    guildEventId   INTEGER       NOT NULL"
        + "                                 PRIMARY KEY AUTOINCREMENT,"
        + "    creationDate   DATETIME      DEFAULT NULL,"
        + "    eventBeginDate DATETIME      DEFAULT NULL,"
        + "    eventEndDate   DATETIME      DEFAULT NULL,"
        + "    tittle         VARCHAR (70)  DEFAULT NULL,"
        + "    description    VARCHAR (400) DEFAULT NULL,"
        + "    minItemLvl     VARCHAR (70)  DEFAULT NULL,"
        + "    users_userId   INTEGER       NOT NULL"
        + "                                 REFERENCES users (userId) "
        + ");");

    db.run("CREATE TABLE infolist ("
        + "    infoListId  INTEGER       NOT NULL"
        + "                              PRIMARY KEY AUTOINCREMENT,"
        + "    [key]       VARCHAR (100) DEFAULT NULL,"
        + "    value       VARCHAR (100) DEFAULT NULL,"
        + "    description VARCHAR (250) DEFAULT NULL"
        + ");");


    db.run("CREATE TABLE posttype ("
        + "    postTypeId     INTEGER       NOT NULL"
        + "                                 PRIMARY KEY AUTOINCREMENT,"
        + "    description    VARCHAR (100) DEFAULT NULL,"
        + "    postTypeParent INTEGER"
        + ");");

    db.run("CREATE TABLE posts ("
        + "    postId              INTEGER        NOT NULL"
        + "                                       PRIMARY KEY AUTOINCREMENT,"
        + "    title               VARCHAR (100)  DEFAULT NULL,"
        + "    body                VARCHAR (1000) DEFAULT NULL,"
        + "    creationDate        VARCHAR (45)   DEFAULT NULL,"
        + "    users_userId        INTEGER        NOT NULL"
        + "                                       REFERENCES users (userId),"
        + "    postType_postTypeId INTEGER        NOT NULL"
        + "                                       REFERENCES posttype (postTypeId) "
        + ");");

    db.run("CREATE TABLE attachments ("
        + "    attachmentId INTEGER       NOT NULL"
        + "                               PRIMARY KEY AUTOINCREMENT,"
        + "    url          VARCHAR (200) DEFAULT NULL,"
        + "    uploaddate   DATETIME      DEFAULT NULL,"
        + "    posts_postId INTEGER       NOT NULL"
        + "                               REFERENCES posts (postId)"
        + ");");

    db.run("CREATE TABLE raids ("
        + "    raidId       INTEGER       NOT NULL"
        + "                               PRIMARY KEY AUTOINCREMENT,"
        + "    name         VARCHAR (100) DEFAULT NULL,"
        + "    imgpath      VARCHAR (150) DEFAULT NULL,"
        + "    creationDate DATETIME      DEFAULT NULL,"
        + "    lastUpdate   DATETIME      DEFAULT NULL,"
        + "    users_userId INTEGER       NOT NULL"
        + "                               REFERENCES users (userId) "
        + ");");

    db.run("CREATE TABLE raidguide ("
        + "    raidGuideId  INTEGER       NOT NULL"
        + "                               PRIMARY KEY AUTOINCREMENT,"
        + "    boss_name    VARCHAR (150) DEFAULT NULL,"
        + "    boss_image   VARCHAR (100) DEFAULT NULL,"
        + "    url_video    VARCHAR (100) DEFAULT NULL,"
        + "    raids_raidId INTEGER       NOT NULL"
        + "                               REFERENCES raids (raidId) "
        + ");");
}

MODEL.InsertData = () => {
    db.run("INSERT INTO rol (rolId, description) VALUES (1, 'admin');");
    db.run("INSERT INTO rol (rolId, description) VALUES (2, 'common');");
    db.run("INSERT INTO rol (rolId, description) VALUES (3, 'cmanager');");

    db.run("INSERT INTO users (userId, name, token, imgavatar, creationdate, rol_rolId) VALUES (1, 'Carlos Andres Vargas Lopez', 'facebook|10154909623984568', 'https://scontent.xx.fbcdn.net/v/t1.0-1/p50x50/15401037_10154816515154568_1573898395974141240_n.jpg?oh=d809ac9d41eaed5f460e58fb678cabfa&" + "oe=594AFD40', 'now', 1);");

    db.run("INSERT INTO infolist (infoListId, key, value, description) VALUES (1, 'commentType', 'POST', 'Comentarios de los post del foro o noticias.');");
    db.run("INSERT INTO infolist (infoListId, key, value, description) VALUES (2, 'commentType', 'GUILDEV', 'Comentarios de los eventos de la guild.');");

    db.run("INSERT INTO posttype (postTypeId, description, postTypeParent) VALUES (1, 'Foros Generales', NULL);");
    db.run("INSERT INTO posttype (postTypeId, description, postTypeParent) VALUES (2, 'Foros Multimedia', NULL);");
    db.run("INSERT INTO posttype (postTypeId, description, postTypeParent) VALUES (3, 'Foros de la Comunidad', NULL);");
    db.run("INSERT INTO posttype (postTypeId, description, postTypeParent) VALUES (4, 'Reglamentos', 1);");
    db.run("INSERT INTO posttype (postTypeId, description, postTypeParent) VALUES (5, 'Progreso PVE', 2);");
    db.run("INSERT INTO posttype (postTypeId, description, postTypeParent) VALUES (6, 'Eventos', 1);");
    db.run("INSERT INTO posttype (postTypeId, description, postTypeParent) VALUES (7, 'Noticias & Avisos', 1);");
    db.run("INSERT INTO posttype (postTypeId, description, postTypeParent) VALUES (8, 'Soporte Tecnico', 3);");
    db.run("INSERT INTO posttype (postTypeId, description, postTypeParent) VALUES (9, 'Reportar a un Jugador', 3);");
    db.run("INSERT INTO posttype (postTypeId, description, postTypeParent) VALUES (10, 'Addons', 3);");
    db.run("INSERT INTO posttype (postTypeId, description, postTypeParent) VALUES (11, 'Guias de Profesiones', 3);");
    db.run("INSERT INTO posttype (postTypeId, description, postTypeParent) VALUES (12, 'Guias de Clase', 3);");
    db.run("INSERT INTO posttype (postTypeId, description, postTypeParent) VALUES (13, 'Presentaciones', 3);");
    db.run("INSERT INTO posttype (postTypeId, description, postTypeParent) VALUES (14, 'Discusión General', 3);");

    db.run("INSERT INTO raidguide (raidGuideId, boss_name, boss_image, url_video, raids_raidId) VALUES (1, 'Nythendra', 'ui-ej-boss-nythendra', 'n9dk_aOgWzE', 1);");
    db.run("INSERT INTO raidguide (raidGuideId, boss_name, boss_image, url_video, raids_raidId) VALUES (2, 'Il''gynoth, Corazon de la corrupción', 'ui-ej-boss-ilgynoth-heart-of-corruption', 'Wy7UshIvRyo', 1);");
    db.run("INSERT INTO raidguide (raidGuideId, boss_name, boss_image, url_video, raids_raidId) VALUES (3, 'Elerethe Renferal', 'ui-ej-boss-elerethe-renferal', 'f7lhzlnnQW4', 1);");
    db.run("INSERT INTO raidguide (raidGuideId, boss_name, boss_image, url_video, raids_raidId) VALUES (4, 'Ursoc', 'ui-ej-boss-ursoc', 'AQd5kdJ7OlE', 1);");
    db.run("INSERT INTO raidguide (raidGuideId, boss_name, boss_image, url_video, raids_raidId) VALUES (5, 'Dragones de Pesadilla', 'ui-ej-boss-dragons-of-nightmare', '11tSo8-Mey8', 1);");
    db.run("INSERT INTO raidguide (raidGuideId, boss_name, boss_image, url_video, raids_raidId) VALUES (6, 'Cenarius', 'ui-ej-boss-cenarius', '1C4ijqIgytk', 1);");
    db.run("INSERT INTO raidguide (raidGuideId, boss_name, boss_image, url_video, raids_raidId) VALUES (7, 'Xavius', 'ui-ej-boss-xavius', 'qpwb60z6bvw', 1);");
    db.run("INSERT INTO raidguide (raidGuideId, boss_name, boss_image, url_video, raids_raidId) VALUES (8, 'Odyn', 'ui-ej-boss-odyn', 'ZS78mRperec', 2);");
    db.run("INSERT INTO raidguide (raidGuideId, boss_name, boss_image, url_video, raids_raidId) VALUES (9, 'Guarm', 'ui-ej-boss-guarm', 'qnD_b4yTR2Q', 2);");
    db.run("INSERT INTO raidguide (raidGuideId, boss_name, boss_image, url_video, raids_raidId) VALUES (10, 'Helya', 'ui-ej-boss-helya', 'zm3pcdk8H_A', 2);");
    db.run("INSERT INTO raidguide (raidGuideId, boss_name, boss_image, url_video, raids_raidId) VALUES (11, 'Skorpyron', 'ui-ej-boss-skorpyron', 'ulTuV-jfcVo', 3);");
    db.run("INSERT INTO raidguide (raidGuideId, boss_name, boss_image, url_video, raids_raidId) VALUES (12, 'Anomalía Cronomática', 'ui-ej-boss-chronomatic-anomaly', 'wc2tcYv92RI', 3);");
    db.run("INSERT INTO raidguide (raidGuideId, boss_name, boss_image, url_video, raids_raidId) VALUES (13, 'Trilliax', 'ui-ej-boss-trilliax', 'QvsJGIHm8F4', 3);");
    db.run("INSERT INTO raidguide (raidGuideId, boss_name, boss_image, url_video, raids_raidId) VALUES (14, 'Hoja de Hechizo Aluriel', 'ui-ej-boss-spellblade-aluriel', 'qQ70WpnvYU8', 3);");
    db.run("INSERT INTO raidguide (raidGuideId, boss_name, boss_image, url_video, raids_raidId) VALUES (15, 'Krosus', 'ui-ej-boss-krosus', 'rxIAezy4XIE', 3);");
    db.run("INSERT INTO raidguide (raidGuideId, boss_name, boss_image, url_video, raids_raidId) VALUES (16, 'Alto botanista Tel''arn', 'ui-ej-boss-botanist', 'BZPcrb1uDT4', 3);");
    db.run("INSERT INTO raidguide (raidGuideId, boss_name, boss_image, url_video, raids_raidId) VALUES (17, 'Tichondrius', 'ui-ej-boss-tichondrius', 'mP7rr5Awads', 3);");
    db.run("INSERT INTO raidguide (raidGuideId, boss_name, boss_image, url_video, raids_raidId) VALUES (18, 'Adivino Etraeus', 'ui-ej-boss-star-augur-etraeus', 'gDWuuL9hpIU', 3);");
    db.run("INSERT INTO raidguide (raidGuideId, boss_name, boss_image, url_video, raids_raidId) VALUES (19, 'Gran Magistrix Elisande', 'ui-ej-boss-grand-magistrix-elisande', 'E-udWcRoI5k', 3);");
    db.run("INSERT INTO raidguide (raidGuideId, boss_name, boss_image, url_video, raids_raidId) VALUES (20, 'Gul''dan', 'ui-ej-boss-guldan', 'qlkX6b7TJwU', 3);");

    db.run("INSERT INTO raids (raidId, name, imgpath, creationDate, lastUpdate, users_userId) VALUES (1, 'Pesadilla Esmeralda', 'emeraldnightmare', '2017-01-30 19:58:50', NULL, 1);");
    db.run("INSERT INTO raids (raidId, name, imgpath, creationDate, lastUpdate, users_userId) VALUES (2, 'Prueba del Valor', 'trialofvalor', '2017-01-30 20:04:31', NULL, 1);");
    db.run("INSERT INTO raids (raidId, name, imgpath, creationDate, lastUpdate, users_userId) VALUES (3, 'Fortaleza Nocturna', 'nighthold', '2017-01-30 20:05:57', NULL, 1);");
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
            if (err) {
                NMResp.count = "0";
                NMResp.error = err;

                callback(null, NMResp);
                //throw err;
            }
            else {

                var filas = JSON.parse(JSON.stringify(rows));

                NMResp.count = filas.length;
                NMResp.data = rows;
                // var filas = JSON.parse(rows);
                // console.log(filas);

                //console.log(NMResp);
                //console.log(NMResp.count, rows);
                callback(null, NMResp);
            }
        })
    }
    //si se quiere encontrar un usuario por el id
    else {
        var stmt = db.prepare("SELECT * FROM users WHERE id = ?");
        //se pasa el userId a la consulta
        stmt.bind(userId);
        stmt.get((err, row) => {
            if (err) {
                throw err;
            }
            else {
                console.log("The user not exists.");
            }
        });

    }
}

//initializing model.
MODEL.USER = USER;

//exporto el modulo para usarlo en el require.
module.exports = MODEL;