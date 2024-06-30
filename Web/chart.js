const firebaseConfig = {
  apiKey: "AIzaSyCicGfXXQju4GIdFoTcOkqErsWdJ1E6vwg",
  authDomain: "smart-home-bf604.firebaseapp.com",
  databaseURL: "https://smart-home-bf604-default-rtdb.firebaseio.com",
  projectId: "smart-home-bf604",
  storageBucket: "smart-home-bf604.appspot.com",
  messagingSenderId: "60096826390",
  appId: "1:60096826390:web:4e442603c25acaba073937",
  measurementId: "G-3MTCLKCJS1"
};

firebase.initializeApp(firebaseConfig); 
firebase.analytics();
//datetime
document.getElementById('datetime').addEventListener('change', function() {
    var selectedDate = this.value; 

    var canvas = document.getElementById('information');
    
    if (selectedDate == '2023-11-28') {
        canvas.style.display = 'block'; 
    } else if (selectedDate == '2023-11-21') {
        canvas.style.display = 'none'; 
    } else {
        canvas.style.display = 'none'; 
    }
});

//Bedroom
const tempRef = firebase.database().ref("chart/bedroom/sensor/temp_history");
const humRef = firebase.database().ref("chart/bedroom/sensor/hum_history");

let data = [];
let data2 = [];

tempRef.on('value', snapshot => {
    const firebaseData = snapshot.val();

    data = Object.entries(firebaseData).map(([timestamp, degree]) => {
        return {
            hour: new Date(Number(timestamp)).getHours() + "h00",
            degree: degree
        };
    });

    updateChart(data);
});

humRef.on('value', snapshot => {
    const firebaseHumData = snapshot.val();

    data2 = Object.entries(firebaseHumData).map(([timestamp, humidity]) => {
        return {
            hour: new Date(Number(timestamp)).getHours() + "h00",
            humidity: humidity
        };
    });

    updateChart(data, data2);
});

function updateChart(tempData, humData) {
    new Chart(document.getElementById("bar-chart-bedroom"), {
        type: "bar",
        data: {
            labels: tempData.map(row => row.hour), 
            datasets: [
                {
                    label: "Độ C",
                    backgroundColor: "aqua",
                    data: tempData.map(row => row.degree)
                },
                {
                    label: "% Độ ẩm",
                    backgroundColor: "red",
                    data: humData.map(row => row.humidity)
                }
              ]},
            options: {
              plugins: {
                legend: {
                  labels: {
                    color: 'black' 
                  }
                }
              },
               scales: {
                x: {
                  grid: {
                    color: 'black' 
                  },
                  ticks: {
                    color: 'black' 
                  }
                  
                },
                y: {
                  grid: {
                    color: 'black' 
                  },
                  ticks: {
                    color: 'black' 
                  }
                }
              }
            }
    });
  }
//Kitchen
const kitchenTempRef = firebase.database().ref("chart/kitchen/sensor/temp_history");
const kitchenHumRef = firebase.database().ref("chart/kitchen/sensor/hum_history");

let kitchenData = [];
let kitchenData2 = [];

kitchenTempRef.on('value', snapshot => {
    const firebaseData = snapshot.val();

    kitchenData = Object.entries(firebaseData).map(([timestamp, degree]) => {
        return {
            hour: new Date(Number(timestamp)).getHours() + "h00",
            degree: degree
        };
    });

    updateKitchenChart(kitchenData);
});

kitchenHumRef.on('value', snapshot => {
    const firebaseHumData = snapshot.val();

    kitchenData2 = Object.entries(firebaseHumData).map(([timestamp, humidity]) => {
        return {
            hour: new Date(Number(timestamp)).getHours() + "h00",
            humidity: humidity
        };
    });

    updateKitchenChart(kitchenData, kitchenData2);
});
function updateKitchenChart(tempData, humData) {
    new Chart(document.getElementById("bar-chart-kitchen"), {
        type: "bar",
        data: {
            labels: tempData.map(row => row.hour), 
            datasets: [
                {
                    label: "Độ C",
                    backgroundColor: "aqua",
                    data: tempData.map(row => row.degree)
                },
                {
                    label: "% Độ ẩm",
                    backgroundColor: "red",
                    data: humData.map(row => row.humidity)
                }
            ]
        },
        options: {
          plugins: {
            legend: {
              labels: {
                color: 'black' 
              }
            }
          },
           scales: {
            x: {
              grid: {
                color: 'black' 
              },
              ticks: {
                color: 'black' 
              }
              
            },
            y: {
              grid: {
                color: 'black' 
              },
              ticks: {
                color: 'black' 
              }
            }
          }
        }
    });
}
//Garden
const gardenTempRef = firebase.database().ref("chart/garden/sensor/temp_history");
const gardenHumRef = firebase.database().ref("chart/garden/sensor/hum_history");

let gardenData = [];
let gardenData2 = [];

gardenTempRef.on('value', snapshot => {
    const firebaseData = snapshot.val();

    gardenData = Object.entries(firebaseData).map(([timestamp, degree]) => {
        return {
            hour: new Date(Number(timestamp)).getHours() + "h00",
            degree: degree
        };
    });

    updateGardenChart(gardenData);
});

gardenHumRef.on('value', snapshot => {
    const firebaseHumData = snapshot.val();

    gardenData2 = Object.entries(firebaseHumData).map(([timestamp, humidity]) => {
        return {
            hour: new Date(Number(timestamp)).getHours() + "h00",
            humidity: humidity
        };
    });

    updateGardenChart(gardenData, gardenData2);
});
function updateGardenChart(tempData, humData) {
    new Chart(document.getElementById("bar-chart-garden"), {
        type: "bar",
        data: {
            labels: tempData.map(row => row.hour), 
            datasets: [
                {
                    label: "Độ C",
                    backgroundColor: "aqua",
                    data: tempData.map(row => row.degree)
                },
                {
                    label: "% Độ ẩm",
                    backgroundColor: "red",
                    data: humData.map(row => row.humidity)
                }
            ]
        },
        options: {
          plugins: {
            legend: {
              labels: {
                color: 'black' 
              }
            }
          },
           scales: {
            x: {
              grid: {
                color: 'black' 
              },
              ticks: {
                color: 'black' 
              }
              
            },
            y: {
              grid: {
                color: 'black' 
              },
              ticks: {
                color: 'black' 
              }
            }
          }
        }
    });
}
//Livingroom
const livingTempRef = firebase.database().ref("chart/livingroom/sensor/temp_history");
const livingHumRef = firebase.database().ref("chart/livingroom/sensor/hum_history");

let livingData = [];
let livingData2 = [];

livingTempRef.on('value', snapshot => {
    const firebaseData = snapshot.val();

    livingData = Object.entries(firebaseData).map(([timestamp, degree]) => {
        return {
            hour: new Date(Number(timestamp)).getHours() + "h00",
            degree: degree
        };
    });

    updateLivingChart(livingData);
});

livingHumRef.on('value', snapshot => {
    const firebaseHumData = snapshot.val();

    livingData2 = Object.entries(firebaseHumData).map(([timestamp, humidity]) => {
        return {
            hour: new Date(Number(timestamp)).getHours() + "h00",
            humidity: humidity
        };
    });

    updateLivingChart(livingData, livingData2);
});
function updateLivingChart(tempData, humData) {
    new Chart(document.getElementById("bar-chart-livingroom"), {
        type: "bar",
        data: {
            labels: tempData.map(row => row.hour), 
            datasets: [
                {
                    label: "Độ C",
                    backgroundColor: "aqua",
                    data: tempData.map(row => row.degree)
                },
                {
                    label: "% Độ ẩm",
                    backgroundColor: "red",
                    data: humData.map(row => row.humidity)
                }
            ]
        },
        options: {
          plugins: {
            legend: {
              labels: {
                color: 'black' 
              }
            }
          },
           scales: {
            x: {
              grid: {
                color: 'black' 
              },
              ticks: {
                color: 'black' 
              }
              
            },
            y: {
              grid: {
                color: 'black' 
              },
              ticks: {
                color: 'black' 
              }
            }
          }
        }
    });
}
//control
document.addEventListener('DOMContentLoaded', function() {
  let rooms = document.querySelectorAll(".room");

  function removeActiveClass() {
      rooms.forEach(function(room) {
          room.classList.remove("active");
      });
  }

  rooms.forEach(function(room) {
      room.addEventListener("click", function(event) {
          event.preventDefault(); 
          removeActiveClass();
          this.classList.add("active");
      });
  });

  function hideAllCanvasAndNames() {
    document.querySelectorAll('.index_chart canvas').forEach(canvas => {
        canvas.style.display = 'none';
    });
    document.querySelectorAll('.index_chart p').forEach(name => {
        name.style.display = 'none';
    });
}

  function showCanvasAndName(roomType) {
    hideAllCanvasAndNames();
    document.querySelectorAll(`#bar-chart-${roomType}, #bar-chart-${roomType}-1, #bar-chart-${roomType}-2`).forEach(canvas => {
        canvas.style.display = 'block';
        document.getElementById(`name-${roomType}`).style.display = 'block';
        document.getElementById(`name-${roomType}-1`).style.display = 'block';
        document.getElementById(`name-${roomType}-2`).style.display = 'block';
    });
}

  document.querySelector('.bedroom').addEventListener('click', function(event) {
      event.preventDefault();  
      showCanvasAndName('bedroom');
  });

  document.querySelector('.kitchen').addEventListener('click', function(event) {
      event.preventDefault();  
      showCanvasAndName('kitchen');
  });

  document.querySelector('.livingroom').addEventListener('click', function(event) {
      event.preventDefault();  
      showCanvasAndName('livingroom');
  });

  document.querySelector('.garden').addEventListener('click', function(event) {
      event.preventDefault();  
      showCanvasAndName('garden');
  });
});

//Bedroom1
const bedDustRef = firebase.database().ref("chart/bedroom/sensor/dust_history");

let DataDust1 = [];

bedDustRef.on('value', snapshot => {
    const firebaseData = snapshot.val();

    DataDust1 = Object.entries(firebaseData).map(([timestamp, degree]) => {
        return {
            hour: new Date(Number(timestamp)).getHours() + "h00",
            degree: degree
        };
    });

    updateBedChart1(DataDust1);
});

function updateBedChart1(tempData) {
    new Chart(document.getElementById("bar-chart-bedroom-1"), {
        type: "bar",
        data: {
            labels: tempData.map(row => row.hour),
            datasets: [
                {
                    label: "µg/m³ ",
                    backgroundColor: "grey",
                    data: tempData.map(row => row.degree)
                }
            ]
        },
        options: {
          plugins: {
            legend: {
              labels: {
                color: 'black' 
              }
            }
          },
           scales: {
            x: {
              grid: {
                color: 'black' 
              },
              ticks: {
                color: 'black' 
              }
              
            },
            y: {
              grid: {
                color: 'black' 
              },
              ticks: {
                color: 'black' 
              }
            }
          }
        }
    });
}
//Living1
const livingDustRef = firebase.database().ref("chart/livingroom/sensor/dust_history");

let DataDust2 = [];

livingDustRef.on('value', snapshot => {
    const firebaseData = snapshot.val();

    DataDust2 = Object.entries(firebaseData).map(([timestamp, degree]) => {
        return {
            hour: new Date(Number(timestamp)).getHours() + "h00",
            degree: degree
        };
    });

    updateLivingChart1(DataDust2);
});

function updateLivingChart1(tempData) {
    new Chart(document.getElementById("bar-chart-livingroom-1"), {
        type: "bar",
        data: {
            labels: tempData.map(row => row.hour),
            datasets: [
                {
                    label: "µg/m³ ",
                    backgroundColor: "grey",
                    data: tempData.map(row => row.degree)
                }
            ]
        },
        options: {
          plugins: {
            legend: {
              labels: {
                color: 'black' 
              }
            }
          },
           scales: {
            x: {
              grid: {
                color: 'black' 
              },
              ticks: {
                color: 'black' 
              }
              
            },
            y: {
              grid: {
                color: 'black' 
              },
              ticks: {
                color: 'black' 
              }
            }
          }
        }
    });
}
//Kitchen1
const kitchenGasRef = firebase.database().ref("chart/kitchen/sensor/gas_history");

let DataGas = [];

kitchenGasRef.on('value', snapshot => {
    const firebaseData = snapshot.val();

    DataGas = Object.entries(firebaseData).map(([timestamp, degree]) => {
        return {
            hour: new Date(Number(timestamp)).getHours() + "h00",
            degree: degree
        };
    });

    updateKitchenChart1(DataGas);
});

function updateKitchenChart1(tempData) {
    new Chart(document.getElementById("bar-chart-kitchen-1"), {
        type: "bar",
        data: {
            labels: tempData.map(row => row.hour),
            datasets: [
                {
                    label: "ppm ",
                    backgroundColor: "orange",
                    data: tempData.map(row => row.degree)
                }
            ]
        },
        options: {
          plugins: {
            legend: {
              labels: {
                color: 'black' 
              }
            }
          },
           scales: {
            x: {
              grid: {
                color: 'black' 
              },
              ticks: {
                color: 'black' 
              }
              
            },
            y: {
              grid: {
                color: 'black' 
              },
              ticks: {
                color: 'black' 
              }
            }
          }
        }
    });
}
//Garden1
const gardenRainRef = firebase.database().ref("chart/garden/sensor/rain_history");

let DataRain = [];

gardenRainRef.on('value', snapshot => {
    const firebaseData = snapshot.val();

    DataRain = Object.entries(firebaseData).map(([timestamp, degree]) => {
        return {
            hour: new Date(Number(timestamp)).getHours() + "h00",
            degree: degree
        };
    });

    updateGardenChart1(DataRain);
});

function updateGardenChart1(tempData) {
    new Chart(document.getElementById("bar-chart-garden-1"), {
        type: "bar",
        data: {
            labels: tempData.map(row => row.hour),
            datasets: [
                {
                    label: "%",
                    backgroundColor: "blue",
                    data: tempData.map(row => row.degree)
                }
            ]
        },
        options: {
          plugins: {
            legend: {
              labels: {
                color: 'black' 
              }
            }
          },
           scales: {
            x: {
              grid: {
                color: 'black' 
              },
              ticks: {
                color: 'black' 
              }
              
            },
            y: {
              grid: {
                color: 'black' 
              },
              ticks: {
                color: 'black' 
              }
            }
          }
        }
    });
}
//Bedroom2
const bedLightRef = firebase.database().ref("chart/bedroom/sensor/light_history");

let DataLight1 = [];

bedLightRef.on('value', snapshot => {
    const firebaseData = snapshot.val();

    DataLight1 = Object.entries(firebaseData).map(([timestamp, degree]) => {
        return {
            hour: new Date(Number(timestamp)).getHours() + "h00",
            degree: degree
        };
    });

    updateBedChart2(DataLight1);
});

function updateBedChart2(tempData) {
    new Chart(document.getElementById("bar-chart-bedroom-2"), {
        type: "bar",
        data: {
            labels: tempData.map(row => row.hour),
            datasets: [
                {
                    label: "lux",
                    backgroundColor: "yellow",
                    data: tempData.map(row => row.degree)
                }
            ]
        },
        options: {
          plugins: {
            legend: {
              labels: {
                color: 'black' 
              }
            }
          },
           scales: {
            x: {
              grid: {
                color: 'black' 
              },
              ticks: {
                color: 'black' 
              }
              
            },
            y: {
              grid: {
                color: 'black' 
              },
              ticks: {
                color: 'black' 
              }
            }
          }
        }
    });
}
//Living2
const livingLightRef = firebase.database().ref("chart/livingroom/sensor/light_history");

let DataLight2 = [];

livingLightRef.on('value', snapshot => {
    const firebaseData = snapshot.val();

    DataLight2 = Object.entries(firebaseData).map(([timestamp, degree]) => {
        return {
            hour: new Date(Number(timestamp)).getHours() + "h00",
            degree: degree
        };
    });

    updateLivingChart2(DataLight2);
});

function updateLivingChart2(tempData) {
    new Chart(document.getElementById("bar-chart-livingroom-2"), {
        type: "bar",
        data: {
            labels: tempData.map(row => row.hour),
            datasets: [
                {
                    label: "lux",
                    backgroundColor: "yellow",
                    data: tempData.map(row => row.degree)
                }
            ]
        },
        options: {
          plugins: {
            legend: {
              labels: {
                color: 'black' 
              }
            }
          },
           scales: {
            x: {
              grid: {
                color: 'black' 
              },
              ticks: {
                color: 'black' 
              }
              
            },
            y: {
              grid: {
                color: 'black' 
              },
              ticks: {
                color: 'black' 
              }
            }
          }
        }
    });
}
//Kitchen2
const kitchenLightRef = firebase.database().ref("chart/kitchen/sensor/light_history");

let DataLight3 = [];

kitchenLightRef.on('value', snapshot => {
    const firebaseData = snapshot.val();

    DataLight3 = Object.entries(firebaseData).map(([timestamp, degree]) => {
        return {
            hour: new Date(Number(timestamp)).getHours() + "h00",
            degree: degree
        };
    });

    updateKitchenChart2(DataLight3);
});

function updateKitchenChart2(tempData) {
    new Chart(document.getElementById("bar-chart-kitchen-2"), {
        type: "bar",
        data: {
            labels: tempData.map(row => row.hour),
            datasets: [
                {
                    label: "lux",
                    backgroundColor: "yellow",
                    data: tempData.map(row => row.degree)
                }
            ]
        },
        options: {
          plugins: {
            legend: {
              labels: {
                color: 'black' 
              }
            }
          },
           scales: {
            x: {
              grid: {
                color: 'black' 
              },
              ticks: {
                color: 'black' 
              }
              
            },
            y: {
              grid: {
                color: 'black' 
              },
              ticks: {
                color: 'black' 
              }
            }
          }
        }
    });
}
//Garden2
const gardenLightRef = firebase.database().ref("chart/garden/sensor/light_history");

let DataLight4 = [];

gardenLightRef.on('value', snapshot => {
    const firebaseData = snapshot.val();

    DataLight4 = Object.entries(firebaseData).map(([timestamp, degree]) => {
        return {
            hour: new Date(Number(timestamp)).getHours() + "h00",
            degree: degree
        };
    });

    updateGardenChart2(DataLight4);
});

function updateGardenChart2(tempData) {
    new Chart(document.getElementById("bar-chart-garden-2"), {
        type: "bar",
        data: {
            labels: tempData.map(row => row.hour),
            datasets: [
                {
                    label: "lux",
                    backgroundColor: "yellow",
                    data: tempData.map(row => row.degree)
                }
            ]
        },
        options: {
          plugins: {
            legend: {
              labels: {
                color: 'black' 
              }
            }
          },
           scales: {
            x: {
              grid: {
                color: 'black' 
              },
              ticks: {
                color: 'black' 
              }
              
            },
            y: {
              grid: {
                color: 'black' 
              },
              ticks: {
                color: 'black' 
              }
            }
          }
        }
    });
}
