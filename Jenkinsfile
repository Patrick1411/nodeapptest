pipeline {
    //Declare environment variables for pipeline:
    environment {
        dockerImageName = "rinney/nodeapp"
        dockerImage = ""
    }

    agent any

    stages {
        // stage ('Checkout source code from Github') {
        //     steps {
        //         git branch: 'main', url: 'https://github.com/Patrick1411/nodeapptest.git'
        //     }
        // }

        // stage ('Build image') {
        //     steps {
        //         script {
        //             dockerImage = docker.build dockerImageName
        //         }
        //     }
        // }

        stage('Check if docker-credential-helper is installed') {
            steps {
                script {
                    def dockerCredentialHelper = sh(returnStdout: true, script: "which docker-credential-helper").trim()
                    echo "docker-credential-helper is existed: ${dockerCredentialHelper}"
                    if (!dockerCredentialHelper) {
                        echo "docker-credential-helper is not installed, docker-credential-helper is prepared to be installed."
                        // execute the stage to install docker-credential-helper
                        sh 'apt-get update && apt-get install -y docker-credential-helper'
                        sh '''
                        mkdir ~/.docker
                        echo '{
                            "credsStore": "osxkeychain",
                            "credHelpers": {
                            "https://index.docker.io/v1/": "osxkeychain"
                            }
                        }' > ~/.docker/config.json
                        '''
                    } else {
                        echo "docker-credential-helper is already installed at ${dockerCredentialHelper}"
                    }
                }
            }
        }

        // stage ('Install docker-credential-helper') {
        //     steps {
        //         sh 'apt-get update && apt-get install -y docker-credential-helper'
        //     }
        // }

        // stage('Configure Docker credentials') {
        //     steps {
        //         sh '''
        //         mkdir ~/.docker
        //         echo '{
        //             "credsStore": "osxkeychain",
        //             "credHelpers": {
        //             "https://index.docker.io/v1/": "osxkeychain"
        //             }
        //         }' > ~/.docker/config.json
        //         '''
        //     }
        // }

        stage ('Pushing image to Docker Hub') {
            environment {
                registryCredential = 'DockerHubAccount'
            }
            
            steps {
                script {
                    docker.withRegistry( 'https://index.docker.io/v1/', registryCredential ) {
                        //dockerImage.push("latest")
                    }
                }
            }
        }

        // stage ('Install kubectl') {
        //     steps {
        //         script {
        //             def kubectlPath = sh(returnStdout: true, script: 'which kubectl').trim()
        //             if (kubectlPath) {
        //                 echo "kubectl already installed at ${kubectlPath}"
        //             } else {
        //                 sh 'curl -LO "https://storage.googleapis.com/kubernetes-release/release/$(curl -s https://storage.googleapis.com/kubernetes-release/release/stable.txt)/bin/linux/amd64/kubectl"'
        //                 sh 'chmod +x ./kubectl'
        //                 sh 'mv ./kubectl /usr/local/bin/kubectl'
        //             }
        //         }
        //     }
        // }
        
        // stage ('Deploying NodeApp to Kubernetes') {
        //     steps {
        //         withKubeConfig([credentialsId: 'KubeConfigFile', serverUrl: 'https://192.168.58.2:8443']) {
        //             sh 'kubectl version --output=yaml'
        //             sh 'kubectl apply -f deploymentservice.yml'
        //         }   
        //     }
        // }
    }
}