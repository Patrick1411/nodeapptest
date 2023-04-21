pipeline {

    agent any

    stages {
        stage ('Checkout source code from Github') {
            steps {
                git branch: 'main', url: 'https://github.com/Patrick1411/nodeapptest.git'
            }
        }

        // stage('Check if docker-credential-helper is installed') {
        //     steps {
        //         script {
        //             try {
        //                 def dockerCredentialHelper = sh(returnStdout: true, script: "which golang-docker-credential-helper").trim()
        //                 def isDockerCredentialHelperInstalled = dockerCredentialHelper ? true : false
        //                 if (!isDockerCredentialHelperInstalled) {
        //                     throw new Exception('golang-docker-credential-helper is not installed')
        //                 } else {
        //                     echo "docker-credential-helper is already installed at ${dockerCredentialHelper}"
        //                 }
        //             } catch (err) {
        //                 echo "Error: ${err.getMessage()}"
        //                 echo 'golang-docker-credential-helper is not installed, installing now...'
        //                 sh 'apt-get update && apt-get install -y golang-docker-credential-helpers'
        //                 sh '''
        //                 echo '{
        //                     "credsStore": "osxkeychain",
        //                     "credHelpers": {
        //                     "https://index.docker.io/v1/": "osxkeychain"
        //                     }
        //                 }' > ~/.docker/config.json
        //                 '''
        //             }
        //         }
        //     }
        // }

        stage ('Build and push image to Docker Hub') {
            steps {
                withDockerRegistry(credentialsId: 'DockerHubAccount', url: 'https://index.docker.io/v1/') {
                    sh 'docker build -t rinney/nodeapp:v1.0.0 .'
                    sh 'docker push rinney/nodeapp:v1.0.0'
                }
            }
        }


        stage ('Install kubectl') {
            steps {
                script {
                    try {
                        def kubectlPath = sh(returnStdout: true, script: 'which kubectl').trim()
                        if (kubectlPath) {
                            echo "kubectl already installed at ${kubectlPath}"
                        } else {
                            throw new Exception('kubectl is not installed')
                        }
                    } catch (err) {
                        echo "Error: ${err.getMessage()}"
                        echo "kubectl is not installed, installing now..."
                        sh 'curl -LO "https://storage.googleapis.com/kubernetes-release/release/$(curl -s https://storage.googleapis.com/kubernetes-release/release/stable.txt)/bin/linux/amd64/kubectl"'
                        sh 'chmod +x ./kubectl'
                        sh 'mv ./kubectl /usr/local/bin/kubectl'
                    }
                }
            }
        }
        
        stage ('Deploying NodeApp to Kubernetes') {
            steps {
                withKubeConfig([credentialsId: 'KubeConfigFile', serverUrl: 'https://192.168.58.2:8443']) {
                    sh 'kubectl version --output=yaml'
                    sh 'kubectl apply -f deploymentservice.yml'
                }   
            }
        }
    }
}

// {
// 	"auths": {
// 		"https://index.docker.io/v1/": {
// 			"auth": "cmlubmV5OlJpbm5leV81MjAxMDNobg=="
// 		}
// 	}
// }