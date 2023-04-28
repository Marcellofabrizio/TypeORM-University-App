import { AppDataSource } from "./data-source"
import { User } from "./entity/User"
import * as express from "express"
import * as cors from "cors"
import * as bodyParser from "body-parser"

const port = process.env.PORT || 3000;
const app = express();
app.use(cors());
app.use(bodyParser.json());

app.listen((port), () => {
  AppDataSource.initialize().then(async () => {
      console.log("Inserting a new user into the database...")
      const user = new User()
      user.firstName = "Timber"
      user.lastName = "Saw"
      user.age = 25
      await AppDataSource.manager.save(user)
      console.log("Saved a new user with id: " + user.id)

      console.log("Loading users from the database...")
      const users = await AppDataSource.manager.find(User)
      console.log("Loaded users: ", users)

      console.log("Here you can setup and run express / fastify / any other framework.")
  }).catch(error => console.log(error))
})
