/**
 * Created by jeffersonvivanco on 11/22/16.
 */


document.addEventListener('DOMContentLoaded', function (evt) {
    var filterBtnFunction = function (evt) {
        evt.preventDefault();
        var value = document.getElementById('director').value;

        var req = new XMLHttpRequest(),
            url = 'http://localhost:3000/api/movies?director='+value;
        req.open('GET',url,true);
        req.addEventListener('load', function () {
            if(req.status >= 200 && req.status< 400){
                var data = JSON.parse(req.responseText);
                var movieList = document.getElementById('movie-list');
                movieList.innerHTML = '';
                data.forEach(function (movie) {
                   var tr = document.createElement('tr');
                   var tdtitle =  tr.appendChild(document.createElement('td'));
                    var tddirector =  tr.appendChild(document.createElement('td'));
                    var tdyear =  tr.appendChild(document.createElement('td'));
                    tdtitle.textContent = movie.title;
                    tddirector.textContent = movie.director;
                    tdyear.textContent = movie.year;
                    movieList.appendChild(tr);
                });
            }
        });
        req.send();
    };
    var addBtnFunction = function (evt) {
      evt.preventDefault();
      var title = document.getElementById('movieTitle').value;
      var director = document.getElementById('movieDirector').value;
      var year = document.getElementById('movieYear').value;
      var req = new XMLHttpRequest();
      req.open('POST','http://localhost:3000/api/movies/create',true);
      req.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
      req.send('title='+title+'&director='+director+'&year='+year);
        req.addEventListener('load', function () {
            document.getElementById('director').value = '';
            if(req.status >= 200 && req.status< 400){

                var movieList = document.getElementById('movie-list');

                    var tr = document.createElement('tr');
                    var tdtitle =  tr.appendChild(document.createElement('td'));
                    var tddirector =  tr.appendChild(document.createElement('td'));
                    var tdyear =  tr.appendChild(document.createElement('td'));
                    tdtitle.textContent = title;
                    tddirector.textContent = director;
                    tdyear.textContent = year;
                    movieList.appendChild(tr);


            }
        });

    };
    document.getElementById('filterBtn').addEventListener('click',filterBtnFunction);
    document.getElementById('addBtn').addEventListener('click',addBtnFunction);

});
