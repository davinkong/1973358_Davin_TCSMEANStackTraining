

const prompt = require("prompt-sync")({ sigint: true});



    let firstName = prompt ("Please enter your First Name: ");
    let lastName = prompt ("Please enter your Last Name: ");
    let gender = prompt ("Please enter your Gender: ");
    let email = prompt ("Please enter your email address: ");
    let today = new Date();
    let min = today.getMinutes();
    let hour = today.getHours();
    let day = String(today.getDate()).padStart(2, '0');
    let month = String(today.getMonth() +1).padStart(2, '0');
    let year = today.getFullYear();

    const displayTime = month+"/"+day+"/"+year+" at "+hour+":"+min;

    let user = {
        firstName,
        lastName ,
        gender,
        email,
        displayTime,
    }
    var fs = require('fs')

fs.readFile('./records.json', 'utf-8', function(err, data) {
	if (err) throw err

	var arrayOfObjects = JSON.parse(data)
	arrayOfObjects.user.push(user)

	console.log(arrayOfObjects)

	fs.writeFile('./records.json', JSON.stringify(arrayOfObjects,null,2), 'utf-8', function(err) {
		if (err) throw err
		console.log('Saved!')
        
	})
})