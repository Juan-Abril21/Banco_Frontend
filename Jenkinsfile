pipeline{
    agent any
    tools {nodejs "node_default"}
    stages{
        stage("Build"){
            steps{
                nodejs("node_default") {
                    sh 'npm install'
                    sh 'npm run build'
                }
            }
        }
        stage("Start"){
            steps{
                nodejs("node_default") {
                    sh 'npm start'
                }
                echo "App started successfully"
            }
        }
    }
}