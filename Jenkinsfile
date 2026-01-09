pipeline{
    agent any
    environment{
        DOCKER_IMAGE = "greet-node"
        DOCKER_TAG = "${BUILD_NUMBER}"
        ECR = " 718394780433.dkr.ecr.us-east-1.amazonaws.com"
        AWS_DEFAULT_REGION = 'us-east-1'
        OUTPUT_FORMAT = "json"
    }
    stages{
        stage('Checkout'){
            steps{
                checkout scm
            }
        }
        stage('Install'){
            steps{
                sh 'node -v'
                sh 'npm ci'
                sh 'npm test' 
            }
        }
        stage('Approval'){
            steps{
                echo "Waiting for approval..."
                input message: "Wanna approve?", ok: "Merge"
            }
        }
        stage('AWS Auth and Docker image build and push'){
            steps{
              withCredentials([
                string(credentialsId: 'ACCESS_KEY_ID', variable: 'AWS_ACCESS_KEY_ID'),
                string(credentialsId: 'AWS_SECRET_ACCESS_KEY', variable: 'AWS_SECRET_ACCESS_KEY')]){
                    
                        sh "set +x"
                        sh "aws ecr get-login-password --region $AWS_DEFAULT_REGION | docker login --username AWS --password-stdin $ECR"
                        sh "docker build -t $DOCKER_IMAGE ."
                        sh "docker tag $DOCKER_IMAGE $ECR/$DOCKER_IMAGE:$DOCKER_TAG"
                        sh "docker push $ECR/$DOCKER_IMAGE:$DOCKER_TAG"
                
                }
            }
        }
        post{
            success{
                script{
                    if(env.BRANCH_NAME == 'main' ){
                        build job: 'Continuous Deployment (K8S)', parameters: [
                            string(name: 'IMAGE_TAG', value: DOCKER_TAG),
                            string(name: 'IMAGE_REPO', value: "${ECR}/${DOCKER_IMAGE}")
                        ], wait: false
                    }
                  }
                }
            }
        }
    }
