var app = angular.module('examApp', []);

app.controller('ExamController', ['StudentFactory', function (StudentFactory) {
        var self = this;
        self.studentsInfo = StudentFactory.studentsInfo;
    }]);

app.factory('StudentFactory', function () {
    var studentsInfo = {};

    studentsInfo.allCourses = [
        {courseId: 1000, courseName: "Basic Programming"},
        {courseId: 1001, courseName: "Advanced Programming"},
        {courseId: 1003, courseName: "DataBase Intro"}
    ];

    studentsInfo.students = [
        {studentId: 100, name: "Peter Hansen", grades: [{grade: "10"}, {grade: "12"}, {}]},
        {studentId: 101, name: "Jan Olsen", grades: [{grade: "7"}, {grade: "10"}, {}]},
        {studentId: 102, name: "Gitte Poulsen", grades: [{grade: "7"}, {grade: "7"}, {}]},
        {studentId: 103, name: "John McDonald", grades: [{grade: "10"}, {}, {grade: "7"}]}
    ];

    return {studentsInfo};
});



app.filter('avgFilt', function () {
    return function (input) {
        var avg = 0;
        var gradeAmount = 0;
        for (var i = 0; i < input.length; i++) {
            var val = parseInt(input[i].grade);
            if (!isNaN(val)) {
                avg = avg + val;
                gradeAmount = gradeAmount + 1;
            }
        }
        var num = avg / gradeAmount;

        return num;
    };
});

app.directive('studentGrades', function () {
    return {
        templateUrl: 'partials/studenttable.html'
    };
});

app.controller('ExamControllerRestExample', ['$http', function ($http) {
        var self = this;
        $http.get('http://localhost:8084/AngularControlFiltDirFact/api/students').then(function (res) {
            self.studentsInfo = res.data;
        });
    }]);