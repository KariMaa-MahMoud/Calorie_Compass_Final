// Declare a variable to store the chart instance
let myPieChart;

// Function to update the pie chart with new data
function updatePieChart(carb, proteins, fats) {
  if (myPieChart) {
    myPieChart.data.datasets[0].data = [carb, proteins, fats];
    myPieChart.update(); // Update the chart with new data
  } else {
    var ctx = document.getElementById("nutritionPieChart").getContext("2d");
    myPieChart = new Chart(ctx, {
      type: "pie",
      data: {
        labels: ["Total Carb", "Total Proteins", "Total Fats"],
        datasets: [
          {
            data: [carb, proteins, fats],
            backgroundColor: ["#FFF3CD", "#D1E7DD", "#F8D7DA"],
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
      },
    });
  }
}

// API Fetching
document.querySelector("form").addEventListener("submit", function (event) {
  event.preventDefault();
  const query = document.querySelector('input[name="query"]').value;
  document.querySelector(".loading-indicator").style.display = "block";
  axios
    .get(`https://api.calorieninjas.com/v1/nutrition?query=${query}`, {
      headers: {
        "X-Api-Key": "L3CXnXFXDdyk1eD+K2XfaQ==gzk5Thrkwk67Gkcv",
      },
    })
    .then(function (response) {
      document.querySelector(".loading-indicator").style.display = "none";
      const data = response.data.items[0];
      document.querySelector(".food-name").textContent = data.name;
      document.querySelector(".calorie-amount").textContent = Math.round(
        data.calories
      );
      const nutritionReportRows = document.querySelectorAll(
        ".nutrition-report tbody tr"
      );

      nutritionReportRows[0].children[1].textContent =
        data.carbohydrates_total_g;
      nutritionReportRows[0].children[2].textContent = Math.round(
        (data.carbohydrates_total_g / data.calories) * 100
      ).toFixed(1);

      nutritionReportRows[1].children[1].textContent = data.protein_g;
      nutritionReportRows[1].children[2].textContent = Math.round(
        (data.protein_g / data.calories) * 100
      ).toFixed(1);

      nutritionReportRows[2].children[1].textContent = data.fat_total_g;
      nutritionReportRows[2].children[2].textContent = Math.round(
        (data.fat_total_g / data.calories) * 100
      ).toFixed(1);

      // Update the pie chart with new data
      updatePieChart(
        Math.round((data.carbohydrates_total_g / data.calories) * 100),
        Math.round((data.protein_g / data.calories) * 100),
        Math.round((data.fat_total_g / data.calories) * 100)
      );
    })
    .catch(function (error) {
      document.querySelector(".loading-indicator").style.display = "none";
      console.log(error);
    });
});
