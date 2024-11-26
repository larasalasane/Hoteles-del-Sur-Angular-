import {Component, OnInit} from '@angular/core';
import {EventBusService} from '../../core/event-bus.service';
import {PexelsService} from '../../core/pexels.service';
import {CompanyService} from '../../core/company.service';
import {UserService} from '../../core/user.service';
import {Role, User} from '../../models/user.model';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.css']
})
export class LandingPageComponent implements OnInit {
  photoMedia: any[] = [];
  photoCount: number = 0;
  companyInfo: any = {};
  user: User | null = null;

  constructor(
    private pexelService: PexelsService,
    private eventBus: EventBusService,
    private companyService: CompanyService,
    private userService: UserService) {}

  showReservationForm: boolean = false;

  ngOnInit() {
    this.companyService.getCompanyInfo().subscribe((data) => {
      this.companyInfo = data[0];
    });
    this.getServiceMedia();
    this.eventBus.toggleForm$.subscribe(() => {
      this.showReservationForm = !this.showReservationForm;
    });
    this.user = this.userService.getUserData()
  }


  async getServiceMedia(): Promise<void> {
    try {
      const collection = await this.pexelService.getCollectionMedia('imbkzhu');
      if (collection) {
        this.photoMedia = collection.media.filter(media => media.type === 'Photo');
        this.photoCount = this.photoMedia.length;
      }
    } catch (error) {
      console.error('Error fetching media:', error);
    }
  }

  protected readonly Role = Role;
}
