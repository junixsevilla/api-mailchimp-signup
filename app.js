const express = require("express");
const bodyParser = require("body-parser");
const https = require("https");

const app = express();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function(req, res) {
    res.sendFile(__dirname + "/signup.html");
});

app.post("/", function(req, res) {
    const firstName= req.body.fName;
    const lastName= req.body.lName;
    const emailAdd= req.body.email;

    console.log(firstName, lastName, emailAdd);

    const data = {
        members: [
            {
                email_address: emailAdd,
                status: "subscribed",
                merged_fields: {
                    FNAME: firstName,
                    LNAME: lastName
                }
            }
        ]
    };

    const jsonData = JSON.stringify(data);
    const url = "https://us7.api.mailchimp.com/3.0/lists/4d40f14226";
    
    const options = {
        method: "POST",
        auth: "junix:659edd6e22d59d2e72349b2f8dea6e77-us7 "
    }


    const request = https.request(url, options, function(response) {
        response.on("data", function(data){
            console.log(JSON.parse(data));

        });

    });

    request.write(jsonData);
    request.end();
});


// https.get("/", function(response) {
//     console.log("Status code is: " + response.statusCode);

// });


app.listen(3000, function () {
    console.log("Server is running on port 3000.")
})

// api key: 
// 27b5f1fd86fbd1e3e7b69ed36c921276-us7

// unique id for audience
//4d40f14226


