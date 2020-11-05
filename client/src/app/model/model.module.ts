import { NgModule } from '@angular/core';
import { MovieRepository } from './movie.repository';
import { StaticDataSource } from './static.datasource';

@NgModule({
    providers: [MovieRepository, StaticDataSource]
})
export class ModelModule {}