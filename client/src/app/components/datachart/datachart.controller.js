'use strict';

angular.module('ads.datachart', [])
  .controller('DataChartCtrl', ['$http', '$rootScope', '$scope', 'DrugEventService', function ($http, $rootScope, $scope, DrugEventService) {

      $scope.reports = [];

      $scope.sortType = 'id';
      $scope.sortReverse = false;

      function buildQuery(medications) {
          _.reduce(medications, function(memo, medication, index) {
              return memo + 'patient.drug.openfda.brand_name:"' + medication + (index < medications.length - 1 ? '" AND "': '"');
          }, '');
      }

      $rootScope.$on( 'updatePrescriptions', function(event, medications) {
          DrugEventService.get({
              'search' : buildQuery(medications),
              'limit' : '100'
          }, function(data) {
              $scope.reports = [];

              _.each(data.results, function(report) {
                  _.each(report.patient.reaction, function(reaction){
                    $scope.reports.push({
                        symptom: reaction.reactionmeddrapt,
                        severity: '',
                        age: report.patient.patientonsetage || 'Unknown',
                        sex: report.patient.patientsex === '1' ? 'Male' : (report.patient.patientsex === '2' ? 'Female' : 'Unknown'),
                        id: report.safetyreportid
                    });
                });
              });
          });
      });

      $scope.loadRequestedReport = function(reportId) {
          console.log(reportId);
      };
  }]);
