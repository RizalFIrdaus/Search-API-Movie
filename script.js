function search() {
    $.ajax({

        url: 'http://omdbapi.com',
        type: 'get',
        datatype: 'json',
        data: {
            'apikey': '6ad78626',
            's': $('#searchMovies').val()
        },
        success: function (data) {
            if (data.Response == 'True') {
                let movie = data.Search;
                $.each(movie, function (i, movies) {
                    if (movies.Type == 'movie' || movies.Type == 'series') {
                        $('.content').append(`
                        <div class="col-md-4 mb-4 mt-4">
                            <div class="card" style="width: 18rem;">
                                <img src="` + movies.Poster + `" class="card-img-top">
                                <div class="card-body">
                                    <h5 class="card-title">` + movies.Title + `</h5>
                                    <p class="card-subtitle mb-2 text-muted">` + movies.Year + `</p>
                                    <p class="card-subtitle mb-2 text-muted">` + movies.Type + `</p>
                                    <a href="" class="card-link detail" data-toggle="modal" data-target="#exampleModal" data-id="` + movies.imdbID + `">See detail</a>
                                </div>
                            </div>
                        </div>
                        `);
                    }
                    $('#searchMovies').val('');
                });

            } else {
                $('.content').html(`
                <div class='col'>
                    <h1 class ='text-center'>` + data.Error + `</h1>
                </div>
                `);

            }

        }
    });
}
$(document).ready(function () {
    $('#tombol').on('click', function () {
        search();
        $('.content').html('');
    });

    $('#searchMovies').on('keyup', function (e) {
        if (e.which === 13) {
            search();
            $('.content').html('');
        }
    });

    $('.content').on('click', '.detail', function () {
        $.ajax({

            url: 'http://omdbapi.com',
            type: 'get',
            datatype: 'json',
            data: {
                'apikey': '6ad78626',
                'i': $(this).data('id')
            },
            success: function (data) {

                if (data.Response === 'True') {
                    $('.modal-body').html(`  
                    <div class="row">
                        <div class="col-md-4">
                             <img src="` + data.Poster + `" alt="` + data.Title + `" class="img-thumbnail">
                        </div>
                        <div class="col-md-8">
                            <div class="card">
                                <div class="card-header font-weight-bold">` + data.Title + `</div>
                                <div class="card-body">
                                <p class="card-text">Released Date : ` + data.Released + `</p>
                                <p class="card-text">Genre : ` + data.Genre + `</p>
                                <p class="card-text">Director : ` + data.Director + `</p>
                                <p class="card-text">Actors : ` + data.Actors + `</p>
                                <p class="card-text">Country : ` + data.Country + `</p>
                                <p class="card-text">Language : ` + data.Language + `</p>
                                <p class="card-text">Run Time : ` + data.Runtime + `</p>
                                <p class="card-text">IMDB Rating : ` + data.imdbRating + `</p>
                                <p class="card-text">IMDB Votes : ` + data.imdbVotes + `</p>
                                <p class="card-text">Plot : ` + data.Plot + `</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    `);
                } else {

                }
            }

        })

    });

});