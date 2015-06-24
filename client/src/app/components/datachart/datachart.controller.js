'use strict';

angular.module('ads.datachart', ['ui.bootstrap'])
  .controller('DataChartCtrl', ['$http', '$modal', '$rootScope', '$scope', 'DrugEventService', function ($http, $modal, $rootScope, $scope, DrugEventService) {

      $scope.symptoms = [];
      $scope.symptomType = undefined;
      $scope.reports = [];

      $scope.query = {};

      $scope.sortType = 'id';
      $scope.sortReverse = false;

      function buildQuery(queryData, symptom) {
          var query =  _.reduce(queryData.prescriptions, function(memo, medication, index) {
              return memo + 'patient.drug.openfda.brand_name:"' + medication + (index < queryData.prescriptions.length - 1 ? '" AND ': '"');
          }, queryData.serious ? 'serious:1 AND ' : '');

          if(symptom) {
              query = query + ' AND patient.reaction.reactionmeddrapt:"' + symptom + '"';
          }

          return query;
      }

      $rootScope.$on('updateSearchParameters', function(event, queryData) {
          $scope.query = queryData;

          DrugEventService.get({
              'search' : buildQuery(queryData),
              'count' : 'patient.reaction.reactionmeddrapt.exact',
              'limit' : '20'
          }, function(data) {
              $scope.symptoms = [];
              $scope.selectedSymptom = undefined;
              $scope.reports = [];

              $scope.symptoms = _.map(data.results, function(value) {
                  return value.term;
              });
          });
      });

      $scope.updateReportTable = function() {
          $scope.reports = [];
          DrugEventService.get({
              'search' : buildQuery($scope.query, $scope.selectedSymptom),
              'limit' : '100'
          }, function(data) {
              _.each(data.results, function(report) {
                  _.each(report.patient.reaction, function(reaction){

                    if(reaction.reactionmeddrapt === $scope.selectedSymptom) {
                        $scope.reports.push({
                            symptom: reaction.reactionmeddrapt,
                            severity: report.serious === '1' ? 'Serious' : 'Minor',
                            age: report.patient.patientonsetage || 'Unknown',
                            sex: report.patient.patientsex === '1' ? 'Male' : (report.patient.patientsex === '2' ? 'Female' : 'Unknown'),
                            id: report.safetyreportid
                        });
                    }
                });
              });
          });
      };

      $scope.loadRequestedReport = function(reportId) {
          DrugEventService.get({
              'search' : 'safetyreportid:' + reportId,
          }, function(data) {
                $modal.open({
                  templateUrl: 'modalReportContent.html',
                  controller: 'ReportModalCtrl',
                  resolve: {
                    report: function() { return data.results[0]; }
                  }
              });
          });
      };
  }]);

angular.module('ads.datachart')
  .controller('ReportModalCtrl', ['$scope', '$modalInstance', 'report', function ($scope, $modalInstance, report) {

    $scope.report = report;

    $scope.close = function () {
      $modalInstance.close();
    };
  }]);
