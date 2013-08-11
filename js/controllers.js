app.controller('DiatenceCtrl', function ($scope) {
  $scope.sentence = "Dan is a human";
  $scope.diagram = {
    sentences: [
      {
        subjects: [
          {
            text: "Dan"
          }
        ],
        predicates: [
          {
            text: "is",
            verb: "linking",
            objects: [
              {
                text: "human",
                modifiers: [
                  {
                    text: "a"
                  },
                  {
                    text: "crazy"
                  },
                  {
                    text: "sleepy"
                  }
                ]
              }
            ]
          }
        ]
      }
    ]
  }

  $scope.sentence = "Big, strong Dan, Mark and very dense Dave quickly left a tired Amy in the car.";

  $scope.diagram = {
    sentences: [
      {
        subjects: [
          {
            text: "Dan",
            modifiers: [
              {
                text: "big"
              },
              {
                text: "strong"
              }
            ]
          },
          {
            text: "Mark"
          },
          {
            text: "Dave",
            modifiers: [
              {
                text: "dense",
                modifiers: [
                  {
                    text: "very"
                  }
                ]
              }
            ]
          }
        ],
        subjects_conjunction: "and",
        predicates: [
          {
            text: "left",
            modifiers: [
              {
                text: "quickly"
              }
            ],
            objects: [
              {
                text: "Amy",
                modifiers: [
                  {
                    text: "a"
                  },
                  {
                    text: "tired"
                  }
                ],
                phrases: [
                  {
                    text: "in",
                    objects: [
                      {
                        text: "car",
                        modifiers: [
                          {
                            text: "the"
                          }
                        ]
                      }
                    ]
                  }
                ]
              }
            ]
          }
        ]
      }
    ]
  }
});