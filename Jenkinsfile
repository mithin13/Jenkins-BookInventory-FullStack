pipeline {
    agent any

    stages {

        // ===== FRONTEND BUILD =====
        stage('Build Frontend') {
            steps {
                // Navigate into the correct frontend directory
                dir('frontend-bookinventory') {
                    echo 'Building Frontend...'
                    // Use bat for Windows commands
                    bat 'npm install'
                    bat 'npm run build'
                }
            }
        }

        // ===== FRONTEND DEPLOY =====
        stage('Deploy Frontend to Tomcat') {
            steps {
                bat '''
                echo "Deploying Frontend..."
                set TOMCAT_PATH="C:\\Program Files\\Apache Software Foundation\\Tomcat 10.1\\webapps"
                set FRONTEND_APP_NAME=frontend-bookinventory

                rem Clean up previous deployment
                if exist "%TOMCAT_PATH%\\%FRONTEND_APP_NAME%" (
                    echo "Removing existing frontend directory..."
                    rmdir /S /Q "%TOMCAT_PATH%\\%FRONTEND_APP_NAME%"
                )

                rem Create new directory and copy built files
                echo "Creating new directory for frontend..."
                mkdir "%TOMCAT_PATH%\\%FRONTEND_APP_NAME%"
                echo "Copying built frontend files..."
                xcopy /E /I /Y "frontend-bookinventory\\dist\\*" "%TOMCAT_PATH%\\%FRONTEND_APP_NAME%"
                '''
            }
        }

        // ===== BACKEND BUILD =====
        stage('Build Backend') {
            steps {
                // Navigate into the correct backend directory
                dir('backend-bookinventory') {
                    echo 'Building Backend...'
                    // Use bat for Windows Maven commands
                    bat 'mvn clean package'
                }
            }
        }

        // ===== BACKEND DEPLOY =====
        stage('Deploy Backend to Tomcat') {
            steps {
                bat '''
                echo "Deploying Backend..."
                set TOMCAT_PATH="C:\\Program Files\\Apache Software Foundation\\Tomcat 10.1\\webapps"
                set BACKEND_WAR_NAME=backend-bookinventory.war

                rem Clean up previous deployment
                if exist "%TOMCAT_PATH%\\%BACKEND_WAR_NAME%" (
                    echo "Removing existing WAR file..."
                    del /Q "%TOMCAT_PATH%\\%BACKEND_WAR_NAME%"
                )
                if exist "%TOMCAT_PATH%\\backend-bookinventory" (
                    echo "Removing existing exploded backend directory..."
                    rmdir /S /Q "%TOMCAT_PATH%\\backend-bookinventory"
                )

                rem Copy the new WAR file
                echo "Copying new WAR file to Tomcat..."
                copy "backend-bookinventory\\target\\backend-bookinventory.war" "%TOMCAT_PATH%\\"
                '''
            }
        }
    }

    post {
        success {
            echo 'Pipeline finished successfully. Deployment is complete!'
        }
        failure {
            echo 'Pipeline failed. Please check the logs.'
        }
    }
}
