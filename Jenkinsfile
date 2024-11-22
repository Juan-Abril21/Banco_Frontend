pipeline{
    agent any

    tools {nodejs "node_default"}
    environment {
        DOCKER_IMAGE = 'banco_frontend'
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
        
        stage('SonarQube Analysis') {
            steps {
                script {
                    withSonarQubeEnv('sonarqube') {
                        withCredentials([string(credentialsId: 'JENKINSONARURL', variable: 'SONAR_URL'),
                                         string(credentialsId: 'JENKINSONARFRONT', variable: 'SONAR_TOKEN')]) {
                            // Guardar los secretos en variables de entorno y luego ejecutar el script
                            sh '''
                                npm install -g sonar-scanner
                                sonar-scanner \
                                -Dsonar.projectKey=frontend \
                                -Dsonar.sources=src \
                                -Dsonar.host.url=http://157.230.50.189:9100 \
                                -Dsonar.login=$SONAR_TOKEN
                            '''
                        }
                    }
                }
            }
        }

        stage('Trivy Scan'){
            steps{
                script{
                    sh 'docker run --rm -v "/var/jenkins_home/workspace/CI Frontend:/root/.cache/" aquasec/trivy:latest -q image --light joseph888/banco_frontend:latest'
                }
            }
        }
    }
}
