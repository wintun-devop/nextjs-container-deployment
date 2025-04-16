## Create .dockerignore file
```
mkdir .dockerignore
```
### Build Docker Image
```
docker build -t nextjs-container .
```
### Build Docker Image with Specific Version Tag
```
docker build -t <image-name>:<version-tag> .
```
```
docker build -t nextjs-container:1.1 .
```
### Run Container with alphine image
```
docker run -p 3000:3000 nextjs-container
```
### Run Container silancely in background with alphine image
```
docker run -d -p 3000:3000 nextjs-container
```
### Run Container silancely in background with alphine image on custom network
```
docker run -d --network mynet-1 -p 3000:3000 nextjs-container
```
### delete image
```
docker rmi -f <image-id-or-name>
```