async function get(req, res) {
    const data = {
        title: 'My EJS App'
      };
      res.render('index', data); // Render the 'index' template with the 'data' object
} 

module.exports = {
    get
}