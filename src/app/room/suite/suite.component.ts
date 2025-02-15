import { Component, OnInit } from '@angular/core';
import { Photo } from 'pexels';
import { CompanyService } from '../../core/company.service';
import { PexelsService } from '../../core/pexels.service';

@Component({
  selector: 'app-suite',
  templateUrl: './suite.component.html',
  styleUrl: './suite.component.css'
})
export class SuiteComponent implements OnInit{

  suiteRoomInfo: any;
  photoMedia: Photo[] = [];
  photoCount: number = 0;
  currentPhotoSlide = 0;

  constructor(
    private companyService: CompanyService, 
    private pexeService: PexelsService ){
  }

  ngOnInit(): void {
    this.getSuiteRoomInfo();
  }

  getSuiteRoomInfo(): void {
    this.companyService.getSuiteRoomInfo().subscribe(
      data => {
        this.suiteRoomInfo = data;
        if (this.suiteRoomInfo) {
          this.getServiceMedia();
        }
      },
      error => {
        console.error('Error fetching single room info', error);
      }
    );
  }

  async getServiceMedia(): Promise<void> {
    try {
      console.log(this.suiteRoomInfo.id);
      const collection = await this.pexeService.getCollectionMedia(this.suiteRoomInfo.id);
      if (collection) {
        this.photoMedia = collection.media.filter(media => media.type === 'Photo');
        this.photoCount = this.photoMedia.length;
      }
    } catch (error) {
      console.error('Error fetching media', error);
    }
  }

  prevPhoto() {
    if (this.currentPhotoSlide > 0) {
      this.currentPhotoSlide--;
    } else {
      this.currentPhotoSlide = this.photoCount - 1;
    }
  }

  nextPhoto() {
    if (this.currentPhotoSlide === this.photoCount - 1) {
      this.currentPhotoSlide = 0;
    } else {
      this.currentPhotoSlide++;
    }
  }

}
