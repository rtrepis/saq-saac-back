- [URL] https://rtrepat-final-project-202207.herokuapp.com/

- [POST] users/register/

  - req.body.json = { "userName" , "password" }

- [POST] users/login/

  - req.body.json = { "userName": string , "password": string }

- [GET] sequence/?pageSize=3&page=1

  - res.body.json = {sequences:[ {"name": sting, "pictograms": number[idPictogram], "id": string, "privately": false }]}

- [GET] sequence/:id

  - req.athoritzation? = "Bearer validateToken"

  - res.body.json = {"sequence": { "name", "pictograms", "privately", "owner", "id"}}

- [GET] sequence/create/

  - req.athoritzation = "Bearer validateToken"
  - req.body.json = {"name": sting, "pictograms": number[idPictogram], "id": string, "privately": boolean}

  - res.body.json = {"sequence": { "name", "pictograms", "privately", "owner", "id"}}

- [GET] sequence/owner/

  - req.athoritzation = "Bearer validateToken"

  - res.body.json = { "sequences": {"userName", "sequencesCreate": [{"name"", "pictograms": [idPictograms], "privately", "owner", "id"}] "id"} }

- [DELETE] sequence/delete/:id

  - req.athoritzation = "Bearer validateToken"

  - res.body.json = { message: "Sequence has been deleted" }

- [PUT] sequences/update/:id

  - req.athoritzation = "Bearer validateToken"
  - req.body.json = {"name": sting, "pictograms": number[idPictogram], "id": string, "privately": boolean}

  - res.body.json = {"sequence": { "name", "pictograms", "privately", "owner", "id"}}
