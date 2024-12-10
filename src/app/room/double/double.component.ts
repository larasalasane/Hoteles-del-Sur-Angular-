import { Component, OnInit } from '@angular/core';
import { Photo } from 'pexels';
import { CompanyService } from '../../core/company.service';
import { PexelsService } from '../../core/pexels.service';

@Component({
  selector: 'app-double',
  templateUrl: './double.component.html',
  styleUrl: './double.component.css'
})
export class DoubleComponent implements OnInit{

  doubleRoomInfo: any;
  photoMedia: Photo[] = [];
  photoCount: number = 0;
  currentPhotoSlide = 0;

  constructor(
    private companyService: CompanyService, 
    private pexeService: PexelsService ){
  }

  ngOnInit(): void {
    this.getDoubleRoomInfo();
  }

  getDoubleRoomInfo(): void {
    this.companyService.getDoubleRoomInfo().subscribe(
      data => {
        this.doubleRoomInfo = data;
        if (this.doubleRoomInfo) {
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
      console.log(this.doubleRoomInfo.id);
      const collection = await this.pexeService.getCollectionMedia(this.doubleRoomInfo.id);
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
