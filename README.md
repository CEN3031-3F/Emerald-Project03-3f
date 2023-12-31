# CaSMM

> Computation and Science Modeling through Making

Cloud-based programming interface

![Deploy Staging](https://github.com/STEM-C/CaSMM/workflows/Deploy%20Staging/badge.svg)
![Deploy Production](https://github.com/STEM-C/CaSMM/workflows/Deploy%20Production/badge.svg)

<br/>

## Application

### `client` 
[client](/client#client) is the frontend of the application. It is powered by [React](https://reactjs.org/) and [Blockly](https://developers.google.com/blockly).

### `server`

[server](/server#server) is the web server and application server. It is powered by [Node](https://nodejs.org/en/) and [Strapi](https://docs-v3.strapi.io/developer-docs/latest/getting-started/introduction.html).

### `compile`

  [compile](/compile#compile) is an arduino compiler service. It is an unofficial fork of [Chromeduino](https://github.com/spaceneedle/Chromeduino).

<br/>

## Environments

> The project is divided into three conceptual environments.

### Development
#### Structure

The development environment is composed of five servers. The first one is run with the [Create React App](https://create-react-app.dev/docs/getting-started/) dev server. The later four are containerized with docker and run with [docker compose](https://docs.docker.com/compose/).

* `casmm-client-dev` - localhost:3000

* `casmm-server-dev` - localhost:1337/admin

* `casmm-compile-dev` 

* `casmm-db-dev` - localhost:5432

  > The first time the db is started, the [init_db.sh](/scripts/init_db.sh) script will run and seed the database with an environment specific dump. Read about Postgres initialization scripts [here](https://github.com/docker-library/docs/blob/master/postgres/README.md#initialization-scripts). To see how to create this dump, look [here](https://github.com/DavidMagda/CaSMM_fork_2023/blob/develop/scripts/readme.md).

* `casmm-compile_queue-dev`

#### Running

`casmm-client-dev`

1. Follow the [client](/client#setup) setup
2. Run `yarn start` from `/client`

`casmm-server-dev`, `casmm-compile-dev`, `casmm-db-dev`, and `casmm-compile_queue-dev`

1. Install [docker](https://docs.docker.com/get-docker/)

2. Run `docker compose up` from `/`

   > Grant permission to the **scripts** and **server** directories if you are prompted
   

### Staging

### Instructions for deployment

1. Open a terminal window and run the command “docker compose up” in the home directory. 
2. Then open another terminal window and run “cd client” and then “yarn start”
3. Go to http://localhost:1337/admin and login with username superadmin@mail.com and password TN9q6RZhDaw6 to get access to the database.
4. Open a new browser tab and go to http://localhost:3000/teacherlogin and login with username headmaster@hogwarts.com and password easypassword to get teacher view.
5. Open a new browser tab and go to http://localhost:3000 and enter code 1997 , remove a student, and choose Harry P. pass:🦉to get student view

#### Structure

The staging environment is a Heroku app. It is composed of a web dyno, compile dyno, Heroku Postgres add-on, and Heroku Redis add-on.

* `casmm-staging` - [casmm-staging.herokuapp.com](https://casmm-staging.herokuapp.com/)
  * The web dyno runs `server`
  * The compile dyno runs `compile`

#### Running

`casmm-staging` is automatically built from the latest commits to branches matching `release/v[0-9].[0-9]`. Heroku runs the container orchestration from there.

### Production

#### Structure

The production environment is a Heroku app. It is composed of a web dyno, compile dyno, Heroku Postgres add-on, and Heroku Redis add-on.

* `casmm` - [www.casmm.org](https://www.casmm.org/)
  * The web dyno runs `server`
  * The compile dyno runs `compile`

#### Running

`casmm` is automatically built from the latest commits to `master`. Heroku runs the container orchestration from there.

<br/>

## Maintenance

All three components of the application have their own dependencies managed in their respective `package.json` files. Run `npm outdated` in each folder to see what packages have new releases. Before updating a package (especially new major versions), ensure that there are no breaking changes. Avoid updating all of the packages at once by running `npm update` because it could lead to breaking changes. 

### Strapi

This is by far the largest and most important dependency we have. Staying up to date with its [releases](https://github.com/strapi/strapi/releases) is important for bug/security fixes and new features. When it comes to actually upgrading Strapi make sure to follow the [migration guides](https://docs-v3.strapi.io/developer-docs/latest/update-migration-guides/migration-guides.html#v3-guides)!

<br/>

## CI/CD

All of the deployments and releases are handled automatically with [GitHub Actions](https://docs.github.com/en/actions). The workflows implement custom [Actions](https://github.com/STEM-C/CaSMM/actions) that live in the [auto](https://github.com/STEM-C/auto) repo.

<br/>

## Contributing

### Git Flow 

> We will follow this git flow for the most part — instead of individual release branches, we will have one to streamline staging deployment 

![Git Flow](https://nvie.com/img/git-model@2x.png)

### Branches

#### Protected

> Locked for direct commits — all commits must be made from a non-protected branch and submitted via a pull request with one approving review

- **master** - Production application

#### Non-protected

> Commits can be made directly to the branch

- **release** - Staging application
- **develop** - Working version of the application
- **feature/<`scaffold`>-<`feature-name`>** - Based off of develop
  - ex. **feature/cms-strapi**
- **hotfix/<`scaffold`>-<`fix-name`>** - Based off of master
  - ex. **hotfix/client-cors**

### Pull Requests

Before submitting a pull request, rebase the feature branch into the target branch to resolve any merge conflicts.

- PRs to **master** should squash and merge
- PRs to all other branches should create a merge commit

### Features
- Add new assessments to database or delete assessments.
![C557C690-454E-49FD-809F-E34A23F81B93_1_201_a](https://github.com/CEN3031-3F/Emerald-Project03-3f/assets/100593849/bdce05d1-fdf5-477b-a2a9-4f4b5ecc025a)
![76CC2EF8-35BC-4E43-BC9E-BDB294EAA604_1_201_a](https://github.com/CEN3031-3F/Emerald-Project03-3f/assets/100593849/91c55595-1777-4510-8b31-77c4253a75db)

- Retrieve assessments from database
- Link assessment data between Student
- Print the assessments to the Student view
- Create toggle switch
![64627067-8D49-4274-87EA-8E463AE37040_1_201_a](https://github.com/CEN3031-3F/Emerald-Project03-3f/assets/100593849/b857911a-f7ab-405a-84e5-aec45ef7d07d)

- Create the traditional question design (more like canvas style)
![2B64B4CD-121A-4703-B258-F6978FFE6C01](https://github.com/CEN3031-3F/Emerald-Project03-3f/assets/100593849/476b5e1a-029b-4a78-be71-ec13dbba6bd4)

- Implement the toggle switch and the nw question design in both of the student and teacher view. 
- Implement a intuitive tutorial for the assessment application we are implementing
![3EF72579-BCA1-43DF-B477-96C3C3F321A6](https://github.com/CEN3031-3F/Emerald-Project03-3f/assets/100593849/a976a11c-6ec0-41b6-b0b3-76aa90350b18)

- Implement the fritzing questions and code block questions

### How to run the project locally
- Run yarn start from client in project folder
- Open docker
## Teacher
- http://localhost:3000/teacherlogin
- Email: headmaster@hogwarts.com
- Password: easypassword
## Student
- http://localhost:3000/
- Join Code: 1997
- Remove a student
- Choose Harry P. pass:🦉  to get student view

### How to update database and server connections

### Update the database and STRAPI dump files in your file directory
Done by Sam Reasor on 12/12/23 at 1:36 pm

### Outstanding work
- Fritzing and Code Block questions are not supported by our assessment currently.
- Implementation of an "Update" button on the mentor view so teachers can edit existing assessments.
- Grading and question submission is not implemented yet.

### Built Upon
- We created functionality within the mentor view to allow teachers to create assessments and publish them to classrooms. 
- Students are assigned a classroom, and all students within a classroom will be able to view the assessments created in that classroom


