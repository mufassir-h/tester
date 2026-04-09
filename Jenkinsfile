pipeline {
    agent any

    environment {
        DOCKERHUB_USERNAME = 'mufassirrafi'
        IMAGE_NAME = "myapp"
        IMAGE_TAG = "${env.BUILD_ID}"
        DOCKER_CREDENTIAL_ID = 'dockerhub-creds'
    }

    stages {

        stage('Checkout Code') {
            steps {
                git branch: 'main', url: 'https://github.com/mufassir-h/myapp.git'
                echo "Repository cloned successfully."
            }
        }

        stage('Build Docker Image') {
            steps {
                script {
                    docker.build("${DOCKERHUB_USERNAME}/${IMAGE_NAME}:${IMAGE_TAG}")
                    echo "Docker image built: ${DOCKERHUB_USERNAME}/${IMAGE_NAME}:${IMAGE_TAG}"
                }
            }
        }

        stage('Push Docker Image to Docker Hub') {
            steps {
                script {
                    docker.withRegistry("https://registry.hub.docker.com", DOCKER_CREDENTIAL_ID) {
                        docker.image("${DOCKERHUB_USERNAME}/${IMAGE_NAME}:${IMAGE_TAG}").push()
                    }
                    echo "Docker image pushed to Docker Hub."
                }
            }
        }

        stage('Deploy Docker Container') {
            steps {
                script {
                    sh """
                    IMAGE=${DOCKERHUB_USERNAME}/${IMAGE_NAME}:${IMAGE_TAG}

                    echo "Pulling latest image"
                    docker pull \$IMAGE

                    PORT=3000

                    while ss -tuln | grep -q ":\$PORT"; do
                        echo "Port \$PORT already used, trying next port"
                        PORT=\$((PORT+1))
                    done

                    echo "Deploying container on port \$PORT"

                    docker run -d -p \$PORT:3000 --name myapp-\$PORT \$IMAGE

                    echo "Application deployed at port \$PORT"
                    """
                }
            }
        }

    }

    post {
        always {
            echo "Pipeline finished."
        }
        success {
            echo "Pipeline completed successfully!"
        }
        failure {
            echo "Pipeline failed! Check logs for errors."
        }
    }
}
