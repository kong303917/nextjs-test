const Router = require('express').Router();

Router.get('/userInfo/:id', (req, res) => {
  console.log('/userInfo/:id - id: ', req.params.id);
  
  res.send({
    status: 200,
    data: {
      name: '小屁孩',
      sex: '男',
      age: '3'
    },
    message: ''
  });
});

module.exports = Router;