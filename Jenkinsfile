pipeline {
    agent any

    parameters {
        choice(
            name: 'ENV',
            choices: ['dev', 'stage', 'prod'],
            description: 'Target environment'
        )

        string(
            name: 'TEST_TAG',
            defaultValue: '',
            description: 'Playwright test tag filter (leave blank to run ALL test cases, or specify e.g. @login, @regression)'
        )
    }

    stages {

        // ============================================================
        // CHECKOUT CODE
        // ============================================================
        stage('Checkout Code') {
            steps {
                echo "=========================================="
                echo "Pulling code from Github..."
                echo "=========================================="

                checkout scm
            }
        }

        // ============================================================
        // INSTALL DEPENDENCIES
        // ============================================================
        stage('Install Dependencies') {
            steps {
                bat '''
                    @echo off

                    echo ==========================================
                    echo Checking Environment Runtimes
                    echo ==========================================

                    node -v
                    call npm -v

                    echo ==========================================
                    echo Checking Package Module Type
                    echo ==========================================

                    node -p "require('./package.json').type"

                    echo ==========================================
                    echo Installing NPM Dependencies
                    echo ==========================================

                    call npm ci

                    echo ==========================================
                    echo Installing Playwright Browsers (Chromium)
                    echo ==========================================

                    call npx playwright install chromium
                '''
            }
        }

        // ============================================================
        // COMPILE TYPESCRIPT
        // ============================================================
        stage('Compile TypeScript') {
            steps {
                bat '''
                    @echo off

                    echo ==========================================
                    echo Compiling TypeScript
                    echo ==========================================

                    call npx --no-install tsc --noEmit
                '''
            }
        }

        // ============================================================
        // RUN PLAYWRIGHT TESTS
        // ============================================================
        stage('Run Playwright Tests') {
            steps {

                /*
                 * Playwright failure must make Jenkins build FAILURE.
                 */
                catchError(
                    buildResult: 'FAILURE',
                    stageResult: 'FAILURE'
                ) {

                    withEnv(["ENV=${params.ENV}"]) {

                        script {

                            def filterOption = ""

                            if (params.TEST_TAG?.trim()) {

                                filterOption = "--grep \"${params.TEST_TAG.trim()}\""

                                echo "Running tests matching tag '${params.TEST_TAG.trim()}' in headless mode on ENV=${params.ENV}"

                            } else {

                                echo "Running ALL test cases in headless mode on ENV=${params.ENV}"

                            }

                            bat """
                                @echo off

                                echo ==========================================
                                echo Running Playwright Tests (Headless)
                                echo Environment : %ENV%
                                echo Tag Filter  : ${params.TEST_TAG?.trim() ? params.TEST_TAG.trim() : 'ALL TESTS'}
                                echo ==========================================

                                REM ==================================================
                                REM Copy environment configuration if needed
                                REM ==================================================

                                if not exist ".env.%ENV%" (
                                    if exist "config\\\\.env.%ENV%" (
                                        echo Copying config\\\\.env.%ENV% to root .env.%ENV%
                                        copy "config\\\\.env.%ENV%" ".env.%ENV%"
                                    ) else (
                                        echo WARNING: config\\\\.env.%ENV% not found
                                    )
                                )

                                echo ==========================================
                                echo Starting Playwright Tests
                                echo ==========================================

                                call npx playwright test ${filterOption}
                            """
                        }
                    }
                }
            }
        }
    }

    // ================================================================
    // POST ACTIONS
    // ================================================================
    post {

        always {

            script {

                // ====================================================
                // GET BUILD STATUS
                // ====================================================

                def buildStatus = currentBuild.currentResult ?: 'UNKNOWN'

                echo "=========================================="
                echo "Final Build Status: ${buildStatus}"
                echo "=========================================="


                // ====================================================
                // PUBLISH ALLURE REPORT
                // ====================================================

                echo "=========================================="
                echo "Publishing Allure Report"
                echo "=========================================="

                if (fileExists('allure-results')) {

                    allure([
                        includeProperties: false,
                        jdk: '',
                        results: [[path: 'allure-results']]
                    ])

                    echo "Allure report published successfully."

                } else {

                    echo "No allure-results directory found. Skipping Allure report."

                }


                // ====================================================
                // ARCHIVE REPORTS AND ARTIFACTS
                // ====================================================

                echo "=========================================="
                echo "Archiving Reports and Artifacts"
                echo "=========================================="

                archiveArtifacts(
                    artifacts: 'playwright-report/**, test-results/**, allure-results/**',
                    allowEmptyArchive: true
                )


                // ====================================================
                // BUILD INFORMATION
                // ====================================================

                echo "=========================================="
                echo "Preparing Build Email"
                echo "=========================================="


                // ====================================================
                // BUILD USER
                // ====================================================

                def causes = currentBuild.getBuildCauses(
                    'hudson.model.Cause$UserIdCause'
                )

                def buildUser = 'Automated / Unknown'

                if (causes && causes.size() > 0) {

                    buildUser = causes[0].userId ?: 'Unknown User'

                }


                // ====================================================
                // ENVIRONMENT
                // ====================================================

                def environmentName = params.ENV ?: 'N/A'


                // ====================================================
                // TEST TAG
                // ====================================================

                def testTag = params.TEST_TAG?.trim()
                    ? params.TEST_TAG.trim()
                    : 'ALL TESTS'


                // ====================================================
                // STATUS DISPLAY
                // ====================================================

                def emoji
                def statusTag
                def statusColor

                if (buildStatus == 'SUCCESS') {

                    emoji = '✅'
                    statusTag = '[SUCCESS]'
                    statusColor = '#28a745'

                } else if (buildStatus == 'FAILURE') {

                    emoji = '❌'
                    statusTag = '[FAILED]'
                    statusColor = '#dc3545'

                } else if (buildStatus == 'UNSTABLE') {

                    emoji = '⚠️'
                    statusTag = '[UNSTABLE]'
                    statusColor = '#f39c12'

                } else if (buildStatus == 'ABORTED') {

                    emoji = '⛔'
                    statusTag = '[ABORTED]'
                    statusColor = '#6c757d'

                } else {

                    emoji = 'ℹ️'
                    statusTag = "[${buildStatus}]"
                    statusColor = '#2E86C1'

                }


                echo "Build Status : ${buildStatus}"
                echo "Environment  : ${environmentName}"
                echo "Test Tag     : ${testTag}"
                echo "Started By   : ${buildUser}"


                // ====================================================
                // SEND EMAIL
                // ====================================================

                echo "=========================================="
                echo "Sending Build Email"
                echo "=========================================="


                try {

                    emailext(

                        to: 'soyaftashildar25@gmail.com',

                        subject: "${emoji} ${statusTag} - Playwright Automation Test - ${env.JOB_NAME} #${env.BUILD_NUMBER}",

                        body: """
                            <html>

                            <head>

                                <style>

                                    body {
                                        font-family: Arial, sans-serif;
                                        background-color: #f9f9f9;
                                        color: #333;
                                        padding: 20px;
                                    }

                                    .container {
                                        background-color: #ffffff;
                                        border-radius: 8px;
                                        padding: 20px;
                                        border: 1px solid #e0e0e0;
                                        box-shadow: 0 2px 4px rgba(0,0,0,0.1);
                                        max-width: 800px;
                                        margin: auto;
                                    }

                                    h2 {
                                        color: #2E86C1;
                                        margin-bottom: 20px;
                                    }

                                    p {
                                        font-size: 14px;
                                        line-height: 1.6;
                                    }

                                    a {
                                        color: #2E86C1;
                                        text-decoration: none;
                                    }

                                    a:hover {
                                        text-decoration: underline;
                                    }

                                    .status {
                                        font-weight: bold;
                                        color: ${statusColor};
                                    }

                                    .info-box {
                                        background-color: #e8f4f8;
                                        border-left: 4px solid #2E86C1;
                                        padding: 10px;
                                        margin-top: 15px;
                                    }

                                    .report-box {
                                        background-color: #f4f4f4;
                                        border-left: 4px solid ${statusColor};
                                        padding: 10px;
                                        margin-top: 15px;
                                    }

                                    .footer {
                                        margin-top: 25px;
                                        font-size: 12px;
                                        color: #777;
                                    }

                                </style>

                            </head>

                            <body>

                                <div class="container">

                                    <h2>
                                        Playwright Automation Test Execution
                                    </h2>

                                    <p>
                                        <strong>📁 Project:</strong>
                                        ${env.JOB_NAME}
                                    </p>

                                    <p>
                                        <strong>🔢 Build Number:</strong>
                                        #${env.BUILD_NUMBER}
                                    </p>

                                    <p>
                                        <strong>🌐 Environment:</strong>
                                        ${environmentName}
                                    </p>

                                    <p>
                                        <strong>🏷️ Test Tag:</strong>
                                        ${testTag}
                                    </p>

                                    <p>
                                        <strong>📊 Build Status:</strong>
                                        <span class="status">
                                            ${buildStatus}
                                        </span>
                                    </p>

                                    <p>
                                        <strong>👤 Started By:</strong>
                                        ${buildUser}
                                    </p>

                                    <p>
                                        <strong>🔗 Build URL:</strong>
                                        <a href="${env.BUILD_URL}">
                                            ${env.BUILD_URL}
                                        </a>
                                    </p>

                                    <div class="info-box">

                                        <p>
                                            <strong>📊 Allure Report:</strong>
                                            <a href="${env.BUILD_URL}allure/">
                                                Open Allure Report
                                            </a>
                                        </p>

                                        <p>
                                            <strong>📋 Playwright HTML Report:</strong>
                                            <a href="${env.BUILD_URL}artifact/playwright-report/index.html">
                                                Open Playwright HTML Report
                                            </a>
                                        </p>

                                    </div>

                                    <div class="report-box">

                                        <p>
                                            <strong>📦 Test Artifacts:</strong>
                                            Playwright reports, screenshots,
                                            videos, traces and test results
                                            are archived with this Jenkins build.
                                        </p>

                                    </div>

                                    <p style="margin-top:20px;">

                                        This is an automated notification from the
                                        <strong>Edso Playwright Automation CI/CD</strong>
                                        pipeline.

                                    </p>

                                    <div class="footer">

                                        Jenkins Job: ${env.JOB_NAME}
                                        <br/>
                                        Build: #${env.BUILD_NUMBER}

                                    </div>

                                </div>

                            </body>

                            </html>
                        """,

                        mimeType: 'text/html'
                    )

                    /*
                     * Don't say "sent successfully" here.
                     * emailext can complete without reporting actual
                     * SMTP delivery in this form.
                     */
                    echo "Email notification step completed for build status: ${buildStatus}"

                } catch (Exception emailError) {

                    echo "=========================================="
                    echo "WARNING: Email notification failed."
                    echo "=========================================="

                    echo "Email Error: ${emailError.getMessage()}"

                }


                // ====================================================
                // CLEAN WORKSPACE
                // ====================================================

                echo "=========================================="
                echo "Cleaning Workspace"
                echo "=========================================="

                cleanWs()

                echo "=========================================="
                echo "Pipeline Post Actions Completed"
                echo "=========================================="
            }
        }
    }
}