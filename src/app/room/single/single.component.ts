import { Component, OnInit } from '@angular/core';
import { CompanyService } from '../../core/company.service';
import { Photo } from 'pexels';
import { PexelsService } from '../../core/pexels.service';

@Component({
  selector: 'app-single',
  templateUrl: './single.component.html',
  styleUrls: ['./single.component.css']
})
export class SingleComponent implements OnInit {
  singleRoomInfo: any;
  photoMedia: Photo[] = [];
  photoCount: number = 0;
  currentPhotoSlide = 0;

  constructor(private companyService: CompanyService, private pexeService: PexelsService) { }

  ngOnInit(): void {
    this.getSingleRoomInfo();
  }

  getSingleRoomInfo(): void {
 
    this.companyService.getSingleRoomInfo().subscribe(
      data => {
        this.singleRoomInfo = data;
        if (this.singleRoomInfo) {
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
      console.log(this.singleRoomInfo.id);
      const collection = await this.pexeService.getCollectionMedia(this.singleRoomInfo.id);
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
