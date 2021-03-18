import $ from 'jquery'; 

exports.example = () => {
    
    const app = $('#app')
    app.html($('<h1>Hello, World!</h1>'))
}