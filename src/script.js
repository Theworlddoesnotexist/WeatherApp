
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
      </div>
    </div>
    <div class="info">
    </div>
`;
app = document.getElementById("app");

const apiKey = 'f118a5b6dd763ad9ec7c87bb8b72aade';

const cities = {coyhaique: ['-45.571224','-72.068268','https://dynamic-media-cdn.tripadvisor.com/media/photo-o/1b/ea/e9/b8/caption.jpg?w=300&h=300&s=1'],
  santiago: ['-33.416889','-70.606705','https://en.wikiarquitectura.com/wp-content/uploads/2017/01/Costanera_center_6.jpg'],
  iquique:['-20.21326','-70.15027','https://vulcanopro.s3.amazonaws.com/images/lar_ldy7cyWrE71rwO8wHNqvG9hE7DAQVUdzCkmArHPe.jpeg'],
  valdivia:['-39.819588','-73.245209','https://storage.googleapis.com/chile-travel-newsite-static-content/2021/07/Encantos_Valdivia-y-Corral_mercado-fluvialjpg-1024x683.jpg']};

const getWeather = async (lat,lon) => {
  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&lang=sp&appid=${apiKey}`;
  const res = await fetch(url);
  const wheaterJson = await res.json();
  //functi
  createCard(wheaterJson);
  setStyle(wheaterJson.weather[0]);
};

function setStyle(info){
  const root = document.querySelector(':root');
  const screen = document.getElementsByTagName("body")[0];
  const bgImage = document.getElementById('image');
  let weather = info.description;
  let mainWeather = info.main;
  console.log(mainWeather)
  console.log(weather)

  if(mainWeather == 'Clouds'){
    screen.style = "background-image:url('https://www.ngenespanol.com/wp-content/uploads/2018/08/La-primera-imagen-de-la-historia.jpg')"
    root.style.setProperty('--clr-accent','#eccfa1');
    bgImage.src="https://www.amcharts.com/wp-content/themes/amcharts4/css/img/icons/weather/animated/cloudy-day-2.svg";
  }
  if(mainWeather == 'Rain'){
    screen.style = "background-image:url('https://images.unsplash.com/photo-1507027682794-35e6c12ad5b4?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80')"
    root.style.setProperty('--clr-accent','#72b9f7');
    bgImage.src="https://www.amcharts.com/wp-content/themes/amcharts4/css/img/icons/weather/animated/cloudy-day-2.svg";
  }

  if (weather == 'muy nuboso'){
    screen.style = "background-image:url('https://images.unsplash.com/photo-1535312720515-ea9a756100ef?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1074&q=80')"
    root.style.setProperty('--clr-accent','#f0b596');
    bgImage.src="https://www.amcharts.com/wp-content/themes/amcharts4/css/img/icons/weather/animated/cloudy.svg";
  }
  if(weather == 'niebla'){
    screen.style = "background-image:url('https://images.unsplash.com/photo-1536393350242-a66a98748b5c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=686&q=80')"
    root.style.setProperty('--clr-accent','#898A9E');
    bgImage.src="https://www.amcharts.com/wp-content/themes/amcharts4/css/img/icons/weather/animated/cloudy-night-1.svg";
  }
  if (weather == 'nubes dispersas'){
    screen.style = "background-image:url('https://images.unsplash.com/photo-1644414889311-614c8c7224fb?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1074&q=80')"
    root.style.setProperty('--clr-accent','#a1c5ec');
    bgImage.src="https://www.amcharts.com/wp-content/themes/amcharts4/css/img/icons/weather/animated/cloudy-day-1.svg";
  }
  if(weather == 'cielo claro'){
    screen.style = 'background-image:url("https://media.istockphoto.com/photos/landscape-of-the-clear-sky-picture-id826120724?k=20&m=826120724&s=170667a&w=0&h=yF7j7pAQF0eGt75VFWpJkZX6aKkk82Dnw45kr4zTg8E=")';
    root.style.setProperty('--clr-accent','#6fbcff');
    bgImage.src="https://www.amcharts.com/wp-content/themes/amcharts4/css/img/icons/weather/animated/cloudy-day-1.svg";
  }
}

function createCard(info){
  console.log(info);
  let weather = info.weather[0];
  console.log(weather.main);

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
	  <img id='image'></img>
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
//Buscar los distintos tiposd de clima y ponerle un background y color diferente.


//getWeather(cities.santiago[0],cities.santiago[1]);
//getWeather(cities.coyhaique[0],cities.coyhaique[1]);
//getWeather(cities.iquique[0],cities.iquique[1]);
getWeather(cities.valdivia[0],cities.valdivia[1]);


document.querySelector(".nav").innerHTML= `<div class=cities></div>`

//Cities menu

for(const city in cities){
  let div = document.createElement("div");
  div.className = 'city';
  let cityArr = cities[city]; 
  let lat = cityArr[0];
  let lon = cityArr[1];
  imgInner = `<img src='${cityArr[2]}'></img>`
   div.innerHTML = imgInner;
   div.addEventListener("click",function(){
     document.querySelector(".nav .active").classList.remove("active");
     div.classList.add("active");
     //fetchCategoryNews(categories[i]);
     getWeather(lat,lon);
    });
    if(city == 'valdivia'){
      div.classList.add("active");
   }
     document.querySelector(".cities").appendChild(div);
}


//un Buscador que devuelva latitud y long
//
//Una api que devuelva una peque;a descripcion de la ciudad en https
