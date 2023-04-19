pipeline {
    agent any
    environment {
        dockerImageName = "rinney/nodeapp"
        dockerImage = ""
    }

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

        stage ('Install kubectl') {
            steps {
                script {
                    def kubectlPath = sh(returnStdout: true, script: 'which kubectl').trim()
                    if (kubectlPath) {
                        echo "kubectl already installed at ${kubectlPath}"
                    } else {
                        sh 'curl -LO "https://storage.googleapis.com/kubernetes-release/release/$(curl -s https://storage.googleapis.com/kubernetes-release/release/stable.txt)/bin/linux/amd64/kubectl"'
                        sh 'chmod +x ./kubectl'
                        sh 'mv ./kubectl /usr/local/bin/kubectl'
                    }
                    sh 'kubectl version --output=yaml'
                }
            }
        }

        stage ('Deploying NodeApp to Kubernetes') {
            steps {
                withKubeConfig([credentialsId: 'KubeConfigFile', serverUrl: 'https://192.168.58.2:8443']) {
                    sh 'kubectl apply -f deploymentservice.yml'
                }   
            }
        }
    }
}