- [URL] https://rtrepat-final-project-202207.herokuapp.com/

- [POST] users/register/

  - req.body.json = { "userName" , "password" }

- [POST] users/login/

  - req.body.json = { "userName": string , "password": string }

- [GET] sequence/

  - res.body.json = {sequence : {"name": sting, "pictograms": number[idPictogram], "id": string, "private": false } }

- [GET] sequence/create/

  - req.athoritzation = "Bearer validateToken"
  - req.body.json = {"name": sting, "pictograms": number[idPictogram], "id": string, "private": boolean}

  - res.body.json = {"sequence": { "name", "pictograms", "private", "owner", "id"}}
