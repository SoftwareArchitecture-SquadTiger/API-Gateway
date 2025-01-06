
# Team B API


A brief description of what this project does and who it's for


## Acknowledgements

 - POSTMAN 
 - VSCODE
 - DOCKER
 


## Deployment

After pull down the project setup .env and download the node 

```bash
    cd /backend (or cd b and press tab)
    npm i
```



## .env

![App Screenshot](https://ik.imagekit.io/hoangdat0704/teambenv.PNG)

```bash
MONGO_URI = mongodb+srv://admin:iamadmin@monolithic-cluster.xgeha.mongodb.net/?retryWrites=true&w=majority&appName=Monolithic-Cluster
PORT = 6000
```
## Docker Deployment 

[Install Docker window ](https://docs.docker.com/desktop/setup/install/windows-install/)

Window can get bug. The best solution is search [Youtube](https://www.youtube.com/) or ask this [guy]

![App Screenshot](https://ik.imagekit.io/hoangdat0704/helper.PNG)

If he cant fix it, just download virtualbox linux and download Docker on it. Goodluck 



[Install Docker mac ](https://docs.docker.com/desktop/setup/install/mac-install/)

```bash
    docker-compose up -d --build
    docker-compose down -v
```

#### If you not use docker 

Comment out  function runKafkaResponseConsumer

![App Screenshot](https://ik.imagekit.io/hoangdat0704/doc.PNG)




## API Reference

```http
 http:HOST:5001/admin-server/
```

### Charity


#### Get all charities

```http
  GET /charities
```



#### Get charity by id

```http
  GET /charity/:id
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `string` | **Required**. Id of item to fetch |

#### Add charity 

```http
  POST /charity/create
```

#### Editor charity
```http
  PUT /charity/update/:id
```
| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `string` | **Required**. Id of item to fetch |


#### Delete charity

```http
   DELETE /charity/delete/:id
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `string` | **Required**. Id of item to fetch |

### Donor 

#### Get all donors 

```http
  GET /donors
```



#### Get donor by id

```http
  GET /donor/id/:id
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `string` | **Required**. Id of item to fetch |

#### Add donor 

```http
  POST /donor/create
```

#### Editor donor
```http
  PUT /donor/update/:id
```
| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `string` | **Required**. Id of item to fetch |


#### Delete donor

```http
   DELETE /donor/delete/:id
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `string` | **Required**. Id of item to fetch |


#### Get Donors By Subscribed Categories

```http
   GET /donors/subscribe/categories
```

#### Get Donors By Regions

```http
   GET /donors/subscribe/regions
```

### Subscription



#### Get Subscription By Email

```http
   GET /subscriptions/email/:email
```
| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `email`      | `string` | **Required**. Email of item to fetch |

#### Get Email by Categories

```http
   GET /subscriptions/emails/categories
```

#### Add Subscription

```http
  POST /subscriptions/create
```

#### Update Subscription

```http
   POST  /subscriptions/update/:email
```
| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `email`      | `string` | **Required**. Email of item to fetch |


#### Delete Subscription

```http
   DELETE  /subscriptions/update/:email
```
| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `email`      | `string` | **Required**. Email of item to fetch |