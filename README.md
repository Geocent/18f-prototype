# ADS Prototype Response

| Purpose | Server/Site | Status |
| ------------------- | ------------- | ------------- |
| Production Deployment | https://drugiq.geocent.com | [![Deployment Status](https://ads-ci.geocent.com/buildStatus/icon?job=deploy-prod)](https://ads-ci.geocent.com/job/deploy-prod/) |
| Development Deployment | https://ads-dev.geocent.com | [![Deployment Status](https://ads-ci.geocent.com/buildStatus/icon?job=deploy-dev)](https://ads-ci.geocent.com/job/deploy-dev/) |
| CI/Jenkins | https://ads-ci.geocent.com |  |
| Scrum Mgt | https://www.scrumdo.com/projects/project/18f-ads-prototype/ |  |
| Development Build Status | https://ads-ci.geocent.com/job/build-dev/ | [![Build Status](https://ads-ci.geocent.com/buildStatus/icon?job=build-dev)](https://ads-ci.geocent.com/job/build-dev/) |
| Unit Test | https://ads-ci.geocent.com/job/build-dev/lastCompletedBuild/testReport/ | [![Build Status](https://ads-ci.geocent.com/buildStatus/icon?job=build-dev)](https://ads-ci.geocent.com/job/build-dev/) |
| Coverage Results | https://ads-ci.geocent.com/job/build-dev/cobertura/ | [![Build Status](https://ads-ci.geocent.com/buildStatus/icon?job=build-dev)](https://ads-ci.geocent.com/job/build-dev/) |
| Integration Tests | https://ads-ci.geocent.com/job/functional-dev/ | [![Build Status](https://ads-ci.geocent.com/buildStatus/icon?job=functional-dev)](https://ads-ci.geocent.com/job/functional-dev/) |
## Description:

Write a brief description, no greater than 750 words, of the approach used to create the working prototype and place this description in the README.md file located in the root directory of your repository.
Pool One Design: In addition to the Description, above, the Quoter must demonstrate that they followed the U.S. Digital Services Playbook by providing evidence in the repository. The README.md file should also make reference to the following for Pool One design:

## Archtiecture Diagarm

![DrugIQ Architecture](./docs/18f_ADS_DrugIQ_ArchitectureDiagram_v1.0.png)

## Continuous Integration Diagarm

![DrugIQ Architecture](./docs/18f_ADS_DrugIQ_CI-Diagram_v1.0.png)

### Design Standards:
* https://github.com/18F/api-standards
* https://playbook.cio.gov/#play3 | [Playbook Checklist](/docs/HCD/USG%20Playbook%20Checklist.xlsx)
* 508 Compliance
* Google Accessibility: http://www.google.com/accessibility/initiatives-research.html

### UI Tools and Techniques
* [Bootswatch: Yeti] (https://bootswatch.com/yeti/)
* [Paper Prototype Usability Test Metrics and Results](./docs/HCD/ADS-Usability%20Test-Metrics.xlsx)
* [Latest Desktop and Mobile Mockups](docs/HCD/ADS-ThirdDraftMockup-with%20Mobile.pdf)
* [508 Compliance Audit](./docs/HCD/508_Compliance_Audit.xlsx)

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
| [angular-nvd3] (http://krispo.github.io/angular-nvd3/#/) | An AngularJS directive for NVD3 re-usable charting library | [MIT] (https://github.com/krispo/angular-nvd3/blob/master/LICENSE) |
| [Moment.js] (http://momentjs.com/) | Cross browser date processing and formatting | [MIT] (https://github.com/moment/moment/blob/develop/LICENSE) |
| [Underscore] (http://underscorejs.org/) | JavaScript's utility _ belt for functional collection processing. | [MIT] (https://github.com/jashkenas/underscore/blob/master/LICENSE) |
| [Style-Guide-Boilerplate-Bootstrap-Edition] (https://github.com/kemie/Style-Guide-Boilerplate-Bootstrap-Edition) | Generate Style Guide | [MIT] (https://github.com/kemie/Style-Guide-Boilerplate-Bootstrap-Edition/blob/Style-Guide-Boilerplate-Bootstrap/LICENSE.txt) |
| [Jenkins] (https://jenkins-ci.org/) | Continuous Integration | [MIT] (https://github.com/jenkinsci/jenkins/blob/master/LICENSE.txt) |
| [NGINX] (http://nginx.org/) | Web Proxy | [AS-IS] (http://nginx.org/LICENSE) |



### Installation and Setup:
[View the INSTALL.md] (./INSTALL.md)


## Pool One Design:

In addition to the Description, above, the Quoter must demonstrate that they followed the U.S. Digital Services Playbook by providing evidence in the repository. The README.md file should also make reference to the following for Pool One design:

| # | Requirement | Link |
| --------------- | ------------- | ------------- |
| a. | assigned one leader and gave that person authority and responsibility and held that person accountable for the quality of the prototype submitted:  | Brian Priest is our Quality Lead  |
| b. | assembled a multidisciplinary and collaborative team that includes at a minimum three of the labor categories limited to the Design Pool Labor categories to design the prototype as quoted in Attachment C. The quoter’s proposed mix of labor categories and level of effort for its working prototype, as reflected in Attachment C, shall be evaluated to assess the quoter’s understanding and capability to supply agile delivery services.  | See Attachement C  |
| c. | understand what people need, by including people (see note #1) in the prototype design process  |  Feedback was captured during [Usability Testing] (./docs/HCD/ADS-Usability%20Test-Metrics.xlsx) and also via [GitHub issues] (https://github.com/Geocent/18f-prototype/issues)  |
| d. | used at least three “human-centered design” techniques or tools  | [UI Tool & Techniques] (./README.md#ui-tools-and-techniques) |
| e. | created or used a design style guide and/or a pattern library  | [Bootswatch: Yeti] (https://bootswatch.com/yeti/) |
| f. | used at least three modern (see Note#2) and open source frontend or client side (see note ￼￼#3) web technologies| [Technologies Used](README.md#technologies-used)|
| g. | performed usability tests with people  | [Usability Testing] (./docs/HCD/ADS-Usability%20Test-Metrics.xlsx)  |
| h. | used an interactive approach, where feedback informed subsequent work or versions of the prototype  | [Usability Testing] (./docs/HCD/ADS-Usability%20Test-Metrics.xlsx) and also via [GitHub issues] (https://github.com/Geocent/18f-prototype/issues) have lead to User Stories in Srumdo. See [Scrumdo export](./docs/scrum)  |
| i. | created a prototype that works on multiple devices and presents a responsive design  | Using Bootstrap helped but some D3 Tables were not responsive until we modified them so please view: (https://drugiq.geocent.com)  |
| j. | provided sufficient documentation to install and run their prototype on another machine  | [INSTALL.md](./INSTALL.md)  |
| k. | prototype and underlying platforms used to create and run the prototype are openly licensed and free of charge.  | [LICENSE.md](./LICENSE.md) [Technologies Used](README.md#technologies-used)  |

## Pool Two Development Pool:

In addition to the Description, above, the Quoter must demonstrate that they followed the U.S. Digital Services Playbook by providing evidence in the repository. The README.md file should also make reference to the following for Pool Two Development:

| # | Requirement | Link |
| --------------- | ------------- | ------------- |
| a. | assigned one leader, gave that person authority and responsibility and held that person accountable for the quality of the prototype submitted | Brian Priest is our Quality Lead |
| b. | assembled a multidisciplinary and collaborative team that includes at a minimum two of the labor categories limited to the Development Pool labor categories to develop the prototype as quoted in Attachment C. The quoter’s proposed mix of labor categories and level of effort for its working prototype, as reflected in Attachment C, shall be evaluated to assess the quoter’s understanding and capability to supply agile delivery services | See Attachement C |
| c. | used at least five modern and open-source technologies, regardless of architectural layer (frontend, backend etc) | [Technologies Used](README.md#technologies-used) |
| d. | deployed the prototype on an Infrastructure as a Service (IaaS) or Platform as a Service (PaaS) provider, and indicated which provider was used | AWS was used and shown in [Architecture Diagram](./README.md#archtiecture-diagarm) |
| e. | wrote unit tests for their code | Unit Tests are executed locally with 'gulp test'. CI displays [Unit Tests Results](https://ads-ci.geocent.com/job/build-dev/) |
| f. | set up or used a continuous integration system to automate the running of tests and continuously deployed their code to their IaaS or PaaS provider | [CI/Jenkins](https://ads-ci.geocent.com) |
| g. | set up or used configuration management | [GitHub](https://github.com/Geocent/18f-prototype)|
| h. | set up or used continuous monitoring | AWS CloudWatch was used |
| i. | deploy their software in a container (i.e., utilized operating-system-level virtualization) | Software and servers were deployed in Docker shown in [Architecture Diagram](./README.md#archtiecture-diagarm) and scripts found in [devops](./devops/containers)|
| j. | used an interactive approach, where feedback informed subsequent work or versions of ￼￼the prototype | [Usability Testing] (./docs/HCD/ADS-Usability%20Test-Metrics.xlsx) and also via [GitHub issues] (https://github.com/Geocent/18f-prototype/issues) have lead to User Stories in Srumdo. See [Scrumdo export](./docs/scrum) |
| k. | provided sufficient documentation to install and run their prototype on another machine | [INSTALL.md](./INSTALL.md) |
| l. | prototype and underlying platforms used to create and run the prototype are openly licensed and free of charge | [LICENSE.md](./LICENSE.md) [Technologies Used](./README.md#technologies-used) |

## Pool Three The Full Stack Pool:

In addition to the Description, above, the quoter must demonstrate that they followed the U.S. Digital Services Playbook by providing evidence in the repository. The README.md file should also make reference to the following for Pool Three Full Stack:

| # | Requirement | Link |
| --------------- | ------------- | ------------- |
| a.| met all the evidence criteria listed above in the Design Pool and Development Pool and Attachment C includes at a minimum five of the labor categories from the Full Stack Pool categories. | [Pool One Design](./README.md#pool-one-design) [Pool Two Development](./README.md#pool-two-development-pool) See Attachment C |
