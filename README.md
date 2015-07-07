# ADS Prototype Approach 

| Production Deployment | https://drugiq.geocent.com | [![Deployment Status](https://ads-ci.geocent.com/buildStatus/icon?job=deploy-prod)](https://ads-ci.geocent.com/job/deploy-prod/) |
| ------------------- | ------------- | ------------- |

The concept for our application using the OpenFDA dataset is to use adverse event report data to analyze potential complex drug interactions that may not other wise be apparent.  Based on this concept, we developed a project vision document (located in /docs/scrum/sprint0) and proceeded to execute the project.

##Project Management Plan (PMP)
One of the first tasks in any project Geocent performs is to develop our [Project Management Plan (PMP)](./docs/Geocent%20Project%20Management%20Plan_Final.docx).  Our [PMP](./docs/Geocent%20Project%20Management%20Plan_Final.docx) establishes the team makeup, roles and resources, and processes necessary for successful execution of the project and assures a well-managed project.  The [PMP](./docs/Geocent%20Project%20Management%20Plan_Final.docx) includes:
* Project Information and Descriptions
* Documentation Location References and Links
* Team Organization / Roles & Responsibilities
* Key Stakeholders
* Communications Plan
* Tools and Resources Required
* Processes / Rules of the Road
  * Requirements Management
  * Configuration Management
  * Quality Management
  * Risk Management
* Schedule / Sprint Durations

The [PMP](./docs/Geocent%20Project%20Management%20Plan_Final.docx) is developed initially from a standard Geocent template and tailored to meet the needs of the specific project.  For this project we used a standard scrum based [PMP](./docs/Geocent%20Project%20Management%20Plan_Final.docx) with sprint durations set at 2 day intervals.  The [PMP](./docs/Geocent%20Project%20Management%20Plan_Final.docx) is a living document, which is updated whenever project dynamics change, and is the driving document for ensuring all aspects of a project are managed properly.  By requiring all Geocent projects to develop a [PMP](./docs/Geocent%20Project%20Management%20Plan_Final.docx) based on minimum template requirements, we ensure consistency and quality of project execution across the company.

##Multidisciplinary Team
We chose our team based on our understanding of the requirements and our initial concept development for the prototype.  Our team structure is documented in the [PMP](./docs/Geocent%20Project%20Management%20Plan_Final.docx) as well as in Attachment C.  
Our team includes:
* **Leader:** Jared Ladner – Geocent Senior Project Manager responsible for the overall quality of the project and technical architecture
* **Product Owner:** Keith Alphonso – Geocent Chief Technology Officer responsible for product vision and shaping
* **Scrum Master:** Roberta Hazelbaker, a certified Scrum Master responsible for managing the Scrum process and maintaining documentation
* **User Centered Design Expert:** Vance Lowe, a certified Usability Analyst from Human Factors International responsible for Human Centered Design
* **DevOps Engineer:** Tyler Sanders, expert in Continuous Integration (CI) and Continuous Delivery (CD) environment setup, infrastructure automation expert, and cloud expert responsible for CI/CD and DevOps support
* **Quality Manager:** Brian Priest – Senior level development, test and QA expert
* **Developers:** Josh Penton, Randy Nolen, and Aaron Whitney – Experienced developers that can support both front or back end development

##Team Communication & Collaboration
We understand that good communications is essential to project success.  For this project, the team was geographically dispersed, located in New Orleans and Baton Rouge, LA; Stennis Space Center, MS;, and Charleston, SC.  Quality communications is critical in this type of environment, and our communications mechanisms proved to be very effective during the development and testing of this prototype.

We established the following communication mechanisms:
* **GitHub** – For managing source code, issues, and configuration management 
* **Skype** – For real-time team communications via a shared Skype channel
* **ScrumDo** – For management of User Stories and the Scrum process
* **Intranet Repository** – For storage of contract/project documentation

##Project Infrastructure
The next task was to establish our project infrastructure, i.e. developer, integration and production environments.  Our DevOps engineer created automation scripts for [local developer and Docker setup scripts](https://github.com/Geocent/18f-prototype/tree/integration/devops/setup) for CI, integration and production environments.  From these automations, developers were able to set up a local environment in minutes using developer tools or able to run the docker containers as integration and production environments.  As an agile development company, Geocent has invested heavily in infrastructure automation, and those investments paid off by allowing the team to be fully set up for development in a matter of hours from project start.
  
##Automated Testing, Continuous Integration & Continuous Delivery
We developed our [Continuous Integration (CI)](https://ads-ci.geocent.com/) and Continuous Delivery environment using Jenkins, Gulp, Protractor, NPM, and Bower.  The environment automates the deployment to our Amazon Web Services (AWS) [integration environment](https://ads-dev.geocent.com) as well as our AWS [production environment](https://drugiq.geocent.com).  The CI system uses Jenkins Master/Slave configurations. There are jobs for both ‘dev’ (integration) and ‘prod’. The ‘dev’ jobs will monitor GitHub branch ‘integration’, build using ‘gulp’, execute unit tests, deploy to ‘ads-dev.geocent.com’ and then execute End to End (E2E) integration tests. A pull to our master branch, which is controlled via our CM process, automatically triggers deployment into production.  We use [Docker containers](./devops/containers) to manage configurations and increase automation.  By having pre-built Docker CI components, we were able to establish this environment in a matter of hours. The NGINX configurations are also part of Docker, so we can ensure consistent configurations from integration to production. 

##User Centered Design
Following the User Centered Design strategy prescribed by Human Factors International, we formulated a design strategy with our short timeline and scope in mind. We gathered data using competitive analysis and created low fidelity comps using that analysis in conjunction with heuristics based design. We immediately started usability testing based on the paper mock-ups, which are included in our GitHub repository. We documented the test results and used the input to adjust the mock-up design.
Due to the resource and time constrains, we employed Guerilla Usability testing techniques to help gather and record as much feedback as possible during the testing process. Refer to http://www.uxbooth.com/articles/the-art-of-guerrilla-usability-testing/ for additional details about Guerilla Usability testing.
The first level of testing included developing a set of [user scenarios and associated scripts](./docs/HCD) for users to follow when walking through the paper mock-ups. Testing was conducted and quantitative and qualitative metrics were collected.  We then analyzed the data and made design updates to create the initial working prototype. 
The second level of usability testing was implemented after each Sprint using a different set of testers. We used the same test scenario as a baseline, and added additional scenarios to account for the new features in each Sprint. This testing was performed using the live prototype. We learned about the difficulties, what made sense and what didn’t, and gathered quantitative metrics to determine where we were succeeding and where we were falling short. In short, we found our users could use the app to accomplish our scenarios; but they were generally unsure about the nature and context of the data they were viewing.  We then developed better descriptive instructions and content. In addition, we added more aggregated data points around search criteria to alleviate this issue. 
Our third and final level of testing occurred during Stabilization. A new set of testers were used to have a fresh look at the app. Two of the original scenarios were used as baseline and a third was added to allow the user the ability to freelance through the application. Metrics were taken to identify if the user could complete the scenarios, what information they learned or found interesting, and what enhancements could be made. In the final Delivery Sprint, we identified several enhancements as priority and implemented them into the final product.
We used multiple tools and techniques:
* **Style Guide** – We utilized a publicly available [style guide](https://bootswatch.com/yeti/) to style our application
* **U.S. Digital Services Playbook** – We adhered to the U.S. Digital Services Playbook to the maximum extent possible given the duration and scope of the effort as documented in our [playbook checklist](./docs/HCD/USG%20Playbook%20Checklist.xlsx).
* **508 Compliance** – We performed [508 compliance reviews](./docs/HCD/508_Compliance_Audit.xlsx) on the product and addressed all major compliance issues noted.
* **Usability Testing** – We used multiple usability testing techniques including initial [paper mockup](./docs/HCD) analysis, testing of enhancements made based on initial analysis, and [usability testing with](/docs/HCD/ADS-Usability%20Test-Metrics_final.xlsx) an active prototype.
* **Mobile Testing** – We continuously tested the application for mobile usability in addition to desktop use.

##Modern Open Source Architecture
An [initial architecture](./docs/18f_ADS_DrugIQ_ArchitectureDiagram_v1.0.png) was developed based on the paper mock-ups and our understanding of the OpenFDA APIs.  Our architecture included:

### Technologies Used:
| Modern Technology  |    Purpose    |    License    |
| ------------------- | ------------- | ------------- |
| [AngularJS] (https://angularjs.org/)  | JS/UI Framework  | [MIT] (https://github.com/angular/angular.js/blob/master/LICENSE)  |
| [Docker] (https://www.docker.com/) | Production Deployment Contain for isolation  | [Apache] (https://github.com/docker/docker/blob/master/LICENSE)  |
| [Bootstrap] (http://getbootstrap.com/) | Responsive UI  | [MIT] (https://github.com/twbs/bootstrap/blob/master/LICENSE)  |
| [Gulp] (http://gulpjs.com/)  | Automated Build/Workflow  | [MIT] (https://github.com/gulpjs/gulp/blob/master/LICENSE)  |
| [Karma] (http://karma-runner.github.io/0.8/plus/AngularJS.html)  | Unit Testing  | [MIT] (https://github.com/karma-runner/karma/blob/master/LICENSE)  |
| [Protractor] (https://angular.github.io/protractor/#/)  | E2E Testing  | [MIT] (https://github.com/angular/protractor/blob/master/LICENSE)  |
| [NVM] (https://github.com/creationix/nvm)  | Node Versioning Manager for local Devleopment Environment  | [MIT] (https://github.com/creationix/nvm/blob/master/LICENSE.md)  |
| [D3 JS] (http://d3js.org/) | Used for charts and data driven documents | [AS IS] (https://github.com/mbostock/d3/blob/master/LICENSE) |
| [NVD3] (http://nvd3.org/) | Reusable charts component for D3 | [Apache] (https://github.com/novus/nvd3/blob/master/LICENSE.md) |
| [Angular-nvD3] (http://krispo.github.io/angular-nvd3/#/) | An AngularJS directive for NVD3 re-usable charting library | [MIT] (https://github.com/krispo/angular-nvd3/blob/master/LICENSE) |
| [Moment.js] (http://momentjs.com/) | Cross browser date processing and formatting | [MIT] (https://github.com/moment/moment/blob/develop/LICENSE) |
| [Underscore] (http://underscorejs.org/) | JavaScript library that provides a whole mess of useful functional programming helpers without extending any built-in objects. | [MIT] (https://github.com/jashkenas/underscore/blob/master/LICENSE) |
| [Jenkins] (https://jenkins-ci.org/) | Continuous Integration | [MIT] (https://github.com/jenkinsci/jenkins/blob/master/LICENSE.txt) |
| [NGINX] (http://nginx.org/) | Web Proxy | [AS-IS] (http://nginx.org/LICENSE) |

In order to keep the architecture as simple as possible, the decision was made, based on the initial design, that a back-end database and application server were not required, as all logic and access to the OpenFDA APIs could be performed by the client JavaScript. 

Over the course of the project we executed three (3) two-day sprints, followed by a stabilization sprint.  We utilized ScrumDo to manage our user stories and our scrum process, and GitHub for issue tracking.  We executed a total of 22 user stories and resolved 51 issued identified from usability or user acceptance testing.  Our final product presents a usable UI and receives high marks from our users.
