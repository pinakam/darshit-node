const db = require("../config/database")

exports.createuser=  (req, res) => {
    const user = req.body;
    const query =`INSERT INTO users SET name = '${user.name}', email = '${user.email}'`
    db.query(query, user, (err, results) => {
      if (err){
          console.log(err)
          res.status(404).json({
              success:false,
              message:"user not updated successfully"
          })
      };
      res.json({ message: 'User created', user: results });
    });
  };
  

exports.readuser= (req, res) => {
    const query = 'SELECT * FROM users';
    db.query(query, (err, results) => {
      if (err){
          console.log(err)
      };
      res.send(results)
    });
  };


exports.updateuser=  (req, res) => {
    const userId = req.params.id;
    const newData = req.body;
    const query = 'UPDATE users SET ? WHERE id = ?';
    db.query(query, [newData, userId], (err, results) => {
      if (err) throw err;
      res.json({ message: 'User updated', user: results });
    });
  };
  
  
exports.deleteuser=  (req, res) => {
    const userId = req.params.id;
    const query = 'DELETE FROM users WHERE id = ?';
    db.query(query, userId, (err, results) => {
      if (err) throw err;
      res.json({ message: 'User deleted', user: results });
    });
  };

