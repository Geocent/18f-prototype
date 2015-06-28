'use strict';

angular.module('ads.datachart', ['ui.bootstrap'])
  .controller('DataChartCtrl', ['$http', '$modal', '$rootScope', '$scope', 'DrugEventService', function ($http, $modal, $rootScope, $scope, DrugEventService) {

      $scope.symptoms = [];
      $scope.symptomType = undefined;
      $scope.reports = [];

      $scope.query = {prescriptions: []};

      $scope.sortType = 'id';
      $scope.sortReverse = false;

      $scope.totalReports = 0;
      $scope.selectedReportPage = 1;
      $scope.reportPageSize = 100;

      $scope.isLoading = false;

      var PATIENT_AGE_UNITS = {
        '800': 'Decade',
        '801': 'Year',
        '802': 'Month',
        '803': 'Week',
        '804': 'Day',
        '805': 'Hour'
      };

      var REACTION_OUTCOME = {
        '1': 'Recovered/resolved',
        '2': 'Recovering/resolving',
        '3': 'Not recovered/not resolved',
        '4': 'Recovered/resolved with sequelae',
        '5': 'Fatal',
        '6': 'Unknown'
      };

      var DRUG_CHARACTERIZATION = {
        '1': 'Suspect drug',
        '2': 'Concomitant drug',
        '3': 'Interacting drug'
      };

      function buildQuery(queryData, symptom) {
          var query =  _.reduce(queryData.prescriptions, function(memo, medication, index) {
              return memo + 'patient.drug.medicinalproduct:"' + medication + (index < queryData.prescriptions.length - 1 ? '" AND ': '"');
          }, queryData.serious ? 'serious:1 AND ' : '');

          if(symptom) {
              query = query + ' AND patient.reaction.reactionmeddrapt:"' + symptom + '"';
          }

          return query;
      }

      $rootScope.$on('updateSearchParameters', function(event, queryData) {
          $scope.query = queryData;

          $scope.totalReports = 0;
          $scope.selectedReportPage = 1;

          $scope.symptoms = [];
          $scope.selectedSymptom = undefined;
          $scope.reports = [];

          if(!_.isEmpty(queryData.prescriptions)) {
              DrugEventService.get({
                  'search' : buildQuery(queryData),
                  'count' : 'patient.reaction.reactionmeddrapt.exact',
                  'limit' : 1000
              }, function(data) {
                  $scope.symptoms = _.map(data.results, function(value) {
                      return value.term;
                  });
              });
          }
      });

      $scope.updateReportTable = function(resetPage) {
          $scope.reports = [];

          if(resetPage) {
              $scope.selectedReportPage = 1;
          }

          $scope.isLoading = true;

          $rootScope.$broadcast('symptomChanged', {
            'name': $scope.selectedSymptom,
            'adverseEvents': $scope.query
          });


          DrugEventService.get({
              'search' : buildQuery($scope.query, $scope.selectedSymptom),
              'limit' : $scope.reportPageSize,
              'skip' : ($scope.selectedReportPage - 1) * $scope.reportPageSize
          }, function(data) {
              $scope.isLoading = false;
              $scope.totalReports = data.meta.results.total;
              _.each(data.results, function(report) {
                  _.each(report.patient.reaction, function(reaction){

                    var age = report.patient.patientonsetage ? (report.patient.patientonsetage + ' ' + PATIENT_AGE_UNITS[report.patient.patientonsetageunit] + (parseFloat(report.patient.patientonsetage) > 1 ? 's' : '')) : 'Unknown';
                    var sex = report.patient.patientsex === '1' ? 'Male' : (report.patient.patientsex === '2' ? 'Female' : 'Unknown');

                    if(reaction.reactionmeddrapt.toLowerCase() === $scope.selectedSymptom.toLowerCase()) {
                        $scope.reports.push({
                            symptom: reaction.reactionmeddrapt,
                            severity: report.serious === '1' ? 'Serious' : 'Minor',
                            age: age,
                            sex: sex,
                            id: report.safetyreportid,
                            reportData: {
                              event: {
                                date: moment(report.transmissiondate, 'YYYYMMDD').format('MMMM D, YYYY'),
                                serious: {
                                  congenitalAnomaly: report.seriousnesscongenitalanomali === '1',
                                  death: report.seriousnessdeath === '1',
                                  disability: report.seriousnessdisabling === '1',
                                  hospitalization: report.seriousnesshospitalization === '1',
                                  lifeThreatening: report.seriousnesslifethreatening === '1',
                                  other: report.seriousnessother === '1'
                                }
                              },
                              patient: {
                                age: age,
                                sex: sex,
                                weight: report.patient.patientweight ? report.patient.patientweight + ' kg' : 'Unknown'
                              },
                              drugs : _.map(report.patient.drug, function(value){
                                return {
                                  name: value.medicinalproduct || 'Unknown',
                                  characterization: value.drugcharacterization ? DRUG_CHARACTERIZATION[value.drugcharacterization] : 'Unknown',
                                  indication: value.drugindication || 'Unknown',
                                  form: value.drugdosageform || 'Unknown'
                                };
                              }),
                              reactions: _.map(report.patient.reaction, function(value){
                                return {
                                  reaction: value.reactionmeddrapt || 'Unknown',
                                  outcome: value.reactionoutcome ? REACTION_OUTCOME[value.reactionoutcome] : 'Unknown'
                                };
                              })
                            }
                        });
                    }
                });
              });
          });
      };

      $scope.loadRequestedReport = function(report) {
        var reportIndex = $scope.reports.indexOf(report);
        var reportData = $scope.reports[reportIndex].reportData;
        $modal.open({
          templateUrl: 'modalReportContent.html',
          controller: 'ReportModalCtrl',
          resolve: {
            report: function() {
              return reportData;
            }
          }
        });
      };

      $scope.reducePrescriptions = function(prescriptions) {
          var list = _.reduce(prescriptions, function(memo, value, index) {
              if(index === prescriptions.length - 1) {
                  return memo + (prescriptions.length === 2 ? ' and ' : ', and ') + value;
              }
              else {
                  return memo + ', ' + value;
              }
          });

          return list + (prescriptions.length > 1 ? ' together.' : '.');
      };
  }]);

angular.module('ads.datachart')
  .controller('ReportModalCtrl', ['$scope', '$modalInstance', 'report', function ($scope, $modalInstance, report) {

    $scope.report = report;

    $scope.close = function () {
      $modalInstance.close();
    };
  }]);
