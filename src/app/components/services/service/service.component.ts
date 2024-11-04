import {Component, Input, OnInit} from '@angular/core';
import {PexelService} from '../../../services/pexel.service';
import {Photo, Video} from 'pexels';
import {DomSanitizer, SafeResourceUrl} from '@angular/platform-browser';

@Component({
  selector: 'app-service',
  templateUrl: './service.component.html',
  styleUrl: './service.component.css'
})
export class ServiceComponent implements OnInit {

  @Input() service : any;
  photoMedia: Photo[] | undefined;
  videoMediaUrls: SafeResourceUrl[] = [];

  constructor(
    private pexeService: PexelService,
    private sanitizer: DomSanitizer
  ) {}

  async ngOnInit() {
    this.pexeService.getCollectionMedia(this.service.id).then(collection => {
      if (collection) {
        this.photoMedia = collection.media.filter(collectioNmedia => collectioNmedia.type == 'Photo')
        collection.media
          .filter(media => media.type === 'Video')
          .forEach(video => {
            const videoFile = video.video_files.find(file => file.quality === 'hd') || video.video_files[0];
            if (videoFile) {
              this.videoMediaUrls.push(this.sanitizer.bypassSecurityTrustResourceUrl(videoFile.link));
            }
          });
      }
    }).catch(error => console.log(error));
  }
}
