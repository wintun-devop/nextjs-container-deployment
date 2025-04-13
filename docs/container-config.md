## Create .dockerignore file
```
mkdir .dockerignore
```
### Build with alphine image
```
docker build -t nextjs-container .
```
### Run Container with alphine image
```
docker run -p 3000:3000 nextjs-container
```
### Run Container silancely in background with alphine image
```
docker run -d -p 3000:3000 nextjs-container
```