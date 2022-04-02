# IF977-ESS-node-node-express

## How to run 🏃🏻‍♀️
`npm start`

### Get all songs registered 🎶
`http://localhost:3000/songs`

### Get specific song 🎵
`http://localhost:3000/songs/:id`
**param:** id of the song you want to find

### Create a new song ✨
`http://localhost:3000/songs`
**body:** json containing name, artist and album (all required)

### Edit song ✍🏻
`http://localhost:3000/songs/:id`
**param:** id of the song you want to edit
**body:** json containing name, artist and/or album with the content/contents you want to change

### Delete song 🗑️
`http://localhost:3000/songs/:id`
**param:** id of the song you want to delete
