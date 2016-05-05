/**
 * Created by Henrikh on 1/20/16.
 */

app.controller('SloanAppController', ['$scope', function ($scope) {
  $scope.hideSidemenuBackButton = true;
  var top_menu_items;
  top_menu_items = $scope.menu_items = [
    {
      is_first_level: true,
      name: "First_time_setup",
      label: "first_time_setup",
      id: 181,
      screens: [
        {
          id: 293,
          is_first_level: false,
          name: "First_time_setup-en",
          label: "first_time_setup"
        },
        {
          id: 295,
          is_first_level: false,
          name: "First_time_setup-en",
          label: "first_time _setup"
        }
      ]
    },
    {
      is_first_level: true,
      name: "Landing_page",
      label: "landing_page",
      id: 182,
      screens: [
        {
          id: 294,
          is_first_level: false,
          name: "Ft_set_up_org_selection-en",
          label: "select org screen"
        }
      ]
    },
    {
      is_first_level: true,
      name: "Authentication",
      label: "login",
      id: 183,
      screens: []
    },
    {
      is_first_level: true,
      name: "MailChimp Activity",
      label: "MailChimp",
      id: 184,
      screens: []
    }
  ];

  var getByParentId = function (id) {
    for (var i in top_menu_items) {
      if (top_menu_items.hasOwnProperty(i)) {
        if (top_menu_items[i].id == id) {
          return top_menu_items[i].screens;
        }
      }
    }
  };

  $scope.showSubcategories = function (category) {
    $scope.menu_items = getByParentId(category.id);
    $scope.hideSidemenuBackButton = false;
  };

  $scope.showTopLevelCategories = function () {
    $scope.menu_items = top_menu_items;
    $scope.hideSidemenuBackButton = true;
  };
}]);
