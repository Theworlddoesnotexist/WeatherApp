
document.getElementById("app").innerHTML = `
    <h1 class="main-title">Ultimo clima en Coyhaique</h1>
    <div class="date">
      <h2 class="second-title">Sol
	<span data-current-sol>375C</span>
      </h2>
      <p class="date-day">Marzo 2</p>
    </div>
    <div class="temp">
      <h2 class="third-title">Temperature</h2>
      <p class="reading">High: -20C</p>
      <p class="reading">Low: -10C</p>
    </div>
    <div class="wind">
      <h2 class="third-title"> Wind</h2>
      <p class="reading"> 75kph</p>
      <div class="wind-direction">
	<p class="sr-only"></p>
	<div class="wind-arrow"></div>
      </div>
    </div>
    <div class="info">
    </div>
`;
app = document.getElementById("app");

const apiKey = 'f118a5b6dd763ad9ec7c87bb8b72aade';

const cities = {coyhaique: ['-45.571224','-72.068268'],santiago: ['-33.416889','-70.606705']};
console.log(cities.coyhaique[0])

const getWeather = async (lat,lon) => {
  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&lang=sp&appid=${apiKey}`;
  const res = await fetch(url);
  const wheaterJson = await res.json();
  //functi
  createCard(wheaterJson);
};

function createCard(info){
  console.log(info);
  let weather = info.weather[0];

  app.innerHTML = `
      <h1 class="main-title">Ultimo clima en ${info.name}</h1>
      <div class="date">
	<h2 class="second-title">${weather.description}
	  <span data-current-sol>${ftc(info.main['temp'])}C</span>
	</h2>
	<p class="date-day">${date()}</p>
      </div>
      <div class="temp">
	<h2 class="third-title">Temperature</h2>
	<p class="reading">High: ${ftc(info.main['temp_max'])}C</p>
	<p class="reading">Low: ${ftc(info.main['temp_min'])}C</p>
      </div>
      <div class="wind">
	<h2 class="third-title"> Wind</h2>
	<p class="reading"> ${info.wind['speed']}kph</p>
	<div class="wind-direction">
	  <p class="sr-only"></p>
	</div>
      </div>
      <div class="info">
	<p></p>
      </div>
  `;
}

function ftc(farenheit){
  return Math.round(farenheit-273.15)
}

function date(){
  var dt = new Date();
  const month = dt.toLocaleString('default', { month: 'long' });
  day = `${dt.getDate()} ${month}`
  console.log(month);
  return day
}

console.log(date())
//Buscar los distintos tiposd de clima y ponerle un background y color diferente.


getWeather(cities.santiago[0],cities.santiago[1]);

//un Buscador que devuelva latitud y long
//
//Una api que devuelva una peque;a descripcion de la ciudad en https
