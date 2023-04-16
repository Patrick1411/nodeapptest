pipeline {

    environment {
        dockerImageName = "rinney/nodeapp"
        dockerImage = ""
    }

    agent any

    stages {
        stage ('Checkout source code from Github') {
            steps {
                git branch: 'main', url: 'https://github.com/Patrick1411/nodeapptest.git'
            }
        }

        stage ('Build image') {
            steps {
                script {
                    dockerImage = docker.build dockerImageName
                }
            }
        }

        stage ('Pushing image to Docker Hub') {
            environment {
                registryCredential = 'DockerHubAccount'
            }
            
            steps {
                script {
                    docker.withRegistry( 'https://registry.hub.docker.com', registryCredential ) {
                        dockerImage.push("latest")
                    }
                }
            }
        }

        stage ('Deploying NodeApp to Kubernetes') {
            steps {
                withKubeConfig([credentialsId: 'KubeConfigFile']) {
                    kubernetesDeploy(configs: "deploymentservice.yml")
                }
            }
        }
    }
}
//, kubeconfigId: "KubeConfigFile"