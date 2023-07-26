import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MovieApiServiceService } from 'src/app/service/movie-api-service.service';

@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.component.html',
  styleUrls: ['./movie-details.component.css']
})
export class MovieDetailsComponent implements OnInit {
  getMovieDetailResult: any;
  getMovieVideoResult:any;
  getMovieCastResult:any

  constructor(private service: MovieApiServiceService, private router: ActivatedRoute) { }

  ngOnInit(): void {
    let getParamId = this.router.snapshot.paramMap.get('id');
    this.getMovie(getParamId);
    this.getMovieCast(getParamId);
    this.getVideo(getParamId);

  }

  getMovie(id: any) {
    this.service.getMovieDetails(id).subscribe(result => {
      console.log(result, "getmoviedetails#")
      this.getMovieDetailResult = result;
    })
  }
  getVideo(id: any) {
    this.service.getMovieVideo(id).subscribe(result => {
      console.log(result, "getMovieVideo#");
      const trailerVideo = result.results.find((element: any) => element.type === 'Trailer');
      if (trailerVideo) {
        this.getMovieVideoResult = trailerVideo.key;
      } else {
        
        this.getMovieVideoResult = null;
      }
    });
  }
  

  getMovieCast(id: any) {
    this.service.getMovieCast(id).subscribe(result => {
      console.log(result, "moviecast#");
      this.getMovieCastResult = result.cast; 

    })
  }

}
