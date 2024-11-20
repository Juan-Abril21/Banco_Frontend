pipeline{
    agent any

    tools {nodejs "node_default"}
    environment {
        DOCKER_IMAGE = banco_frontend
    }
    stages{
        stage('Initialize') {
            steps {
                script {
                    def dockerHome = tool 'Docker'
                    env.PATH = "${dockerHome}/bin:${env.PATH}"
                }
            }
        }

        stage("Build"){
            steps{
                nodejs("node_default") {
                    sh 'npm install'
                    sh 'npm run build'
                }
            }
        }

        stage('Build Docker Image') {
            steps {
                script {
                    sh 'docker build -t joseph888/banco_frontend:latest .'
                }
            }
        }

        stage('Trivy Scan'){
            steps{
                script{
                    sh 'docker run --rm -v "/var/jenkins_home/workspace/CI Frontend:/root/.cache/" aquasec/trivy:latest -q image --severity CRITICAL --light joseph888/banco_frontend:latest'
                }
            }
        }

        stage('Push Docker Image') {
            steps {
                script {
                    withCredentials([string(credentialsId: 'DOCKERHUBPASSWORD', variable: 'DOCKERHUBPASSWORD')]) {
                        sh "docker login -u joseph888 -p $DOCKERHUBPASSWORD"
                        sh 'docker push joseph888/banco_frontend:latest'
                    }
                }
            }
        }
    }
}