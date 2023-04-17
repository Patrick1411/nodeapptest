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

        // stage ('Install kubectl') {
        //     steps {
        //         sh 'curl -LO "https://storage.googleapis.com/kubernetes-release/release/$(curl -s https://storage.googleapis.com/kubernetes-release/release/stable.txt)/bin/linux/amd64/kubectl" && chmod +x kubectl && mv kubectl /usr/local/bin/'
        //     }
        // }

        stage ('Deploying NodeApp to Kubernetes') {
            steps {
                withKubeConfig([credentialsId: 'KubeConfigFile']) {
                    sh 'kubectl apply -f deploymentservice.yml'
                }   
            }
        }
    }
}
//kubernetesDeploy(configs: "deploymentservice.yml", kubeconfigId: "KubeConfigFile") , serverUrl: 'https://127.0.0.1:49606'