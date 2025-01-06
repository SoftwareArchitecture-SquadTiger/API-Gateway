


## Acknowledgements

 - VSCODE
 - POSTMAN 
 - GITHUB
 - MONGDB


# Squard Tiger API gateway


This the intruction for call the API in team A by using API gateway :

# For team A side
After you have pull down the code from github. This is step you need to do to run it. 

You need to install the missing node and create an .env file inside the backend folder. To install the missing node. Then create a .env file inside backend folder.when it all set run the code 





## npm



```bash
  npm ci
```
    
## .env

![App Screenshot](https://ik.imagekit.io/hoangdat0704/TeamAEnv.PNG?updatedAt=1734576686858)


## Run 

```bash
cd .\Backend\
npm run dev
```
![App Screenshot](https://ik.imagekit.io/hoangdat0704/teamArun.PNG)

## API gateway  

Now move the the API side clone the api gateway side after clone from github. Install the node 
```bash
npm ci
```
Now setup the .env and get the IPv4 DNS servers from the network you connect 
![App Screenshot](https://ik.imagekit.io/hoangdat0704/network.PNG)

Then put in the .env 

```bash
PORT=5000
HOST={your IPv4}
TEAM_A_PORT=4000
TEAM_B_PORT=6000
```

## POSTMAN 
```bash
http://{your IPv4}:5000/client-server/projects
```
## API Reference in Gateway

#### Get all items

```http
  GET  /projects
```


#### Get project by id

```http
  GET /project/:id
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `string` | **Required**. Id of item to fetch |

#### Get project by status
```http
  GET /project/status/:status
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `status`      | `string` | **Required**. status of item to fetch |

#### GET a project by current amount less than or equal to
```http
  GET /project/amount/lte/:currentAmount
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `currentAmount`      | `string` | **Required**. Amount of item to fetch |

#### GET a  project by region
```http
  GET /project/region/:region
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `region`      | `string` | **Required**.Region of item to fetch |

#### GET a  project by country
```http
  GET /project/:id
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `country`      | `string` | **Required**. country of item to fetch |

#### GET a  project by date
```http
  GET /project/date/:startDate/:endDate
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `startDate`   `endDate`   | `string` | **Required**. startDate and endDate of item to fetch |

###  GET a project by current amount greater than or equal

```http
  GET /project/amount/gte/:currentAmount
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `currentAmount`      | `string` | **Required**. currentAmount of item to fetch |

###  GET all projects sorted by current amount ascending
```http
  GET /project/current-amount/asc
```



###  GET all projects sorted by current amount descending
```http
  GET /project/current-amount/desc
```



###  GET all projects sorted by target amount ascending
```http
  GET /project/target-amount/asc
```



###  GET all projects sorted by target amount descending
```http
  GET /project/target-amount/desc
```

### POST mean create a project

```http
  POST /project/create
```
example
![App Screenshot](https://ik.imagekit.io/hoangdat0704/post.PNG)

### Put update the project 

```http
  PUT /project/update/:id
  
```
| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `string` | **Required**. Id of item to put |

### Delete the project 
```http
  PUT /project/update/:id
```
| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `string` | **Required**. Id of item to Delete |


