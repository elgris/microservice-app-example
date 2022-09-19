var Connection = require('tedious').Connection;
var config = {  
    server: 'your_server.database.windows.net',  //update me
    authentication: {
        type: 'default',
        options: {
            userName: 'your_username', //update me
            password: 'your_password'  //update me
        }
    },
    options: {
        // If you are on Microsoft Azure, you need encryption:
        encrypt: true,
        database: 'app_db'  //update me
    }
};
var Request = require('tedious').Request;
var TYPES = require('tedious').TYPES;

class SqlClient {
    constructor (userName) {
        this._table = userName;
        this._connection = new Connection(config);
        this._connection.on('connect', function(err) {
            console.log("Connected");
        });
        this._connection.connect();
        this.createTable()
        this._lastUsedID = this._getLastID()
    }

    create (todo) {
        var sqlStmt = "INSERT app_db." + this._table + " (ID, Message) OUTPUT INSERTED.ID VALUES (@ID, @Message);"
        var request = new Request(sqlStmt, function(err) {
            if (err) {
                console.log(err);
            }
        });
        request.addParameter('ID', TYPES.Int, todo.id);
        request.addParameter('Message', TYPES.NVarChar, todo.content);
        request.on('row', function(columns) {
            columns.forEach(function(column) {
                console.log("Inserted id: " + column.value);
            });
        });
        this._connection.execSql(request);
        this._lastUsedID = id;
    }

    delete (id) {
        var sqlStmt = "DELETE from app_db." + this._table + " where ID = (@ID)";
        var request = new Request(sqlStmt, function(err) {
            if (err) {
                console.log(err);
            }
        });
        request.addParameter('ID', TYPES.Int, id);
        this._connection.execSql(request);
    }

    list () {
        var sqlStmt = "SELECT ID, Message from app_db." + this._table + ";"
        var request = new Request(sqlStmt, function(err) {
            if (err) {
                console.log(err);
            }
        });
        var result = ""
        request.on('row', function(columns) {
            columns.forEach(function(column) {
                result += column.value + " ";
            })
        });

        request.on('done', function(rowCount, more) {
            console.log(rowCount + ' rows returned');
        });
        return result
    }

    createTable() {
        var sqlStmt = "if OBJECT_ID ('app_db." + this._table + "') is not null CREATE TABLE app_db." + this._table + "(ID int, Message varchar(100));"
        var request = new Request(sqlStmt, function(err) {
            if (err) {
                console.log(err);
            }
        });
        this._connection.execSql(request);
    }

    getNextID() {
        var id = this._lastUsedID + 1
        return id
    }

    _getLastID() {
        // get max id from table
    }
}

module.exports = SqlClient