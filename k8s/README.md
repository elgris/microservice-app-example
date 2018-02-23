# Deploy with Kubernetes
Deploy the microservices with kubernetes.
This part of the project requires you to have a running kubernetes cluster, for this demo we use [Minikube](https://github.com/kubernetes/minikube) and the [kubectl](https://kubernetes.io/docs/tasks/tools/install-kubectl/).

## Building and running
In order for Kubernetes to deploy from our images, they need to be available for it in the docker engine of the running node. Using Minikube we connect to the docker engine of the running node and build the images from the docker compose file.
```shell
# Start Minikube on your local machine
$ minikube start

# Connect the docker cli to the docker engine in the minikube node
$ eval $(minikube docker-env)

# Build the images
$ docker-compose build
```

Now that the images are built and available in the docker engine of the running minikube node, we can tell kubernetes to create pods from those images.
```shell
$ kubectl create -R -f k8s/
```

You can now access the frontend service on your browser like this:
```shell
$ minikube service frontend
```

To access Zipkin UI you can use this command:
```shell
$ minikube service zipkin
```